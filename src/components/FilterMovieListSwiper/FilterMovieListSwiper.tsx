import { FC } from "react";
import { movieInfoArrayType, movieInfoType } from "../../types/Films/filmsType";
import {
  getBackgroundColorByRating,
  translateGenre,
  formatTime,
} from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useFilterMovie } from "../../hooks/useFilterMovie";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type FilterMovieListProp = {
  movies: movieInfoArrayType;
};

export const FilterMovieListSwiper: FC<FilterMovieListProp> = ({ movies }) => {
  const navigate = useNavigate();
  const { setFilterMovie, setIsFilterModal } = useFilterMovie();

  if (!movies || movies.length === 0) {
    return (
      <p className="filter-movie__error">По Вашему запросу фильмы не найдены</p>
    );
  }

  const handleClick = (item: movieInfoType) => {
    navigate(`/movie/${item.id}`);
    setFilterMovie("");
    setIsFilterModal(false);
  };

  return (
    <Swiper
      breakpoints={{
        380: {
          slidesPerView: 1.5,
          spaceBetween: 16,
        },
        576: {
          slidesPerView: 2.5,
          spaceBetween: 60,
        },
        768: {
          slidesPerView: 3.5,
          spaceBetween: 40,
        },
      }}
      grabCursor={true}
    >
      {movies.map((item) => {
        const backgroundColor = getBackgroundColorByRating(
          item.tmdbRating || 0
        );
        return (
          <SwiperSlide
            key={item.id}
            onClick={() => handleClick(item)}
            className="filter-movie__item"
          >
            <div className="filter-movie__poster">
              {item.posterUrl && (
                <img
                  className="filter-movie__img"
                  src={item.posterUrl}
                  alt={item.title}
                />
              )}
            </div>
            <div className="filter-movie__right">
              <div className="filter-movie__info">
                {item.tmdbRating !== undefined && (
                  <span
                    style={{ backgroundColor }}
                    className="filter-movie__rating"
                  >
                    {item.tmdbRating.toFixed(1)}
                  </span>
                )}

                {item.releaseYear && (
                  <span className="filter-movie__year">{item.releaseYear}</span>
                )}

                {item.genres?.map((genre, index) => {
                  const { title } = translateGenre(genre);
                  return (
                    <span
                      key={`${item.id}-${index}`}
                      className="filter-movie__genre"
                    >
                      {title}
                    </span>
                  );
                })}

                {item.runtime && (
                  <span className="filter-movie__time">
                    {formatTime(item.runtime)}
                  </span>
                )}
              </div>
              <h2 className="filter-movie__title">{item.title}</h2>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
