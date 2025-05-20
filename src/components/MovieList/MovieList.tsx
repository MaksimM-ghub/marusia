import "./MovieList.scss";
import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../../services/api/api";
import { useQuery } from "@tanstack/react-query";
import { movieInfoArrayType } from "../../types/Films/filmsType";
import { translateGenre } from "../../utils/utils";
import { Loader } from "../Loader/Loader";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LazyLoad from "react-lazyload";

const MOVIES_PER_PAGE = 10;

const MovieList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const genre = params.get("genre") || "";
  const { title } = translateGenre(genre);

  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<movieInfoArrayType>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["movies", genre, page],
    queryFn: () => api.getMovies({ count: MOVIES_PER_PAGE, page, genre }),
  });

  useEffect(() => {
    setPage(1);
    setMovies([]);
    setHasMore(true);
  }, [genre]);

  useEffect(() => {
    if (!data) return;

    setMovies((prev) => {
      const combinedMovies = [...prev, ...data];

      const sortedMovies = combinedMovies.sort(
        (a, b) => (b.tmdbRating || 0) - (a.tmdbRating || 0)
      );

      return sortedMovies;
    });

    setHasMore(data.length === MOVIES_PER_PAGE);
  }, [data]);

  const loadMore = useCallback(() => {
    if (hasMore && !isFetching && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, isFetching, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  return (
    <div className="movie">
      <Link to="/genre" className="movie__link link-reset">
        {title}
      </Link>

      <TransitionGroup component="ul" className="list-reset movie__list">
        {movies.map((item) => (
          <CSSTransition key={item.id} timeout={300} classNames="fade">
            <li
              onClick={() => navigate(`/movie/${item.id}`)}
              className="movie__item"
            >
              <LazyLoad
                offset={200}
                placeholder={
                  <img
                    className="movie__poster"
                    src="./def-title.jpg"
                    alt={item.title}
                  />
                }
              >
                <img
                  className="movie__poster"
                  src={item.posterUrl || "./def-title.jpg"}
                  alt={item.title}
                />
              </LazyLoad>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>

      {isLoading && (
        <div className="movie__loader">
          <Loader />
        </div>
      )}
      {hasMore && !isLoading && (
        <button onClick={loadMore} className="btn-reset btn-primary movie__btn">
          Показать еще
        </button>
      )}
    </div>
  );
};

export default MovieList
