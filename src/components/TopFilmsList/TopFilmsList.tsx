import { FC } from "react";
import { movieInfoArrayType, movieInfoType } from "../../types/Films/filmsType";
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";

type TopFilmsListProps = {
  films: movieInfoArrayType;
};

export const TopFilmsList: FC<TopFilmsListProps> = ({ films }) => {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="top-films__title">Топ 10 фильмов</h2>
      <ul className="list-reset top-films__list">
        {films.map((film: movieInfoType, index: number) => (
          <li
            onClick={() => navigate(`/movie/${film.id}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/movie/${film.id}`);
              }
            }}
            className="top-films__item"
            key={film.id}
            tabIndex={0}
          >
            <span className="top-films__number">{index + 1}</span>
            <LazyLoad
              offset={100}
              placeholder={
                <img
                  className="movie__poster"
                  src="./def-title.jpg"
                  alt={film.title}
                />
              }
            >
              <img
                className="top-films__poster"
                src={film.posterUrl || "./def-title.jpg"}
                alt={film.title}
              />
            </LazyLoad>
          </li>
        ))}
      </ul>
    </>
  );
};
