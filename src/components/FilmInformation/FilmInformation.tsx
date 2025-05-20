import "./FilmInformation.scss";

import { FC, useState } from "react";
import { movieInfoType } from "../../types/Films/filmsType";
import {
  formatTime,
  getBackgroundColorByRating,
  translateGenre,
} from "../../utils/utils";
import { TrailerModal } from "../TrailerModal/TrailerModal";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import { useModal } from "../../hooks/useContext";
import { AuthForm } from "../AuthForm/AuthForm";
import { useMediaQuery } from "@mui/material";

interface FilmInformationProps {
  film: movieInfoType;
  showButton?: boolean;
  isFullWidth?: boolean;
  refetchFilm?: () => void;
}

export const FilmInformation: FC<FilmInformationProps> = ({
  film,
  showButton = false,
  isFullWidth = false,
  refetchFilm,
}) => {
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [openTrailer, setOpenTrailer] = useState<boolean>(false);
  const { isModal, setIsModal } = useModal();
  const isMobile = useMediaQuery("(max-width: 576px)");

  const fullWidth = isMobile && isFullWidth;

  const navigate = useNavigate();
  const backgroundColor = getBackgroundColorByRating(film.tmdbRating || 0);
  const { toggleFavorite, isAdded, loading } = useFavorites(film, setIsModal);

  const handleRandomButtonClick = () => {
    if (refetchFilm) {
      setIsRotating(true);
      refetchFilm();
      setTimeout(() => setIsRotating(false), 1000);
    }
  };

  return (
    <div className="film-info">
      <div className="film-info__left">
        <div className="film-info__top">
          {film.tmdbRating !== undefined && (
            <span style={{ backgroundColor }} className="film-info__rating">
              {film.tmdbRating.toFixed(1)}
            </span>
          )}

          {film.releaseYear && (
            <span className="film-info__year">{film.releaseYear}</span>
          )}

          {film.genres?.map((item, index) => {
            const { title } = translateGenre(item);
            return (
              <span key={`${film.id}-${index}`} className="film-info__genre">
                {title}
              </span>
            );
          })}

          {film.runtime && (
            <span className="film-info__time">{formatTime(film.runtime)}</span>
          )}
        </div>

        <h1 className="film-info__title">{film.originalTitle}</h1>

        <p className="film-info__desc">{film.plot}</p>
        <div className="film-info__button-block">
          <button
            onClick={() => setOpenTrailer(true)}
            className={fullWidth ? "btn-reset btn-primary film-info__btn-trailer full-width" : "btn-reset btn-primary film-info__btn-trailer"}
          >
            Трейлер
          </button>
          {showButton && (
            <button
              onClick={() => navigate(`/movie/${film.id}`)}
              className="btn-reset btn-secondary film-info__info-btn"
            >
              О фильме
            </button>
          )}
          <button
            onClick={toggleFavorite}
            className="btn-reset btn-secondary film-info__favorites"
            disabled={loading}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={loading ? "heart-loading" : ""}
            >
              <path
                d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"
                fill={isAdded ? "#B4A9FF" : "white"}
              />
            </svg>
          </button>
          {isModal && <AuthForm />}

          {showButton && refetchFilm && (
            <button
              onClick={handleRandomButtonClick}
              className="btn-reset btn-secondary film-info__random"
            >
              <svg
                className={isRotating ? "rotate" : ""}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4C14.7486 4 17.1749 5.38626 18.6156 7.5H16V9.5H22V3.5H20V5.99936C18.1762 3.57166 15.2724 2 12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4ZM20 12C20 16.4183 16.4183 20 12 20C9.25144 20 6.82508 18.6137 5.38443 16.5H8V14.5H2V20.5H4V18.0006C5.82381 20.4283 8.72764 22 12 22C17.5228 22 22 17.5228 22 12H20Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {film.backdropUrl && (
        <div className="film-info__right">
          <img
            className="film-info__cover"
            src={film.backdropUrl}
            alt={film.title}
          />
        </div>
      )}

      {openTrailer && <TrailerModal film={film} setIsModal={setOpenTrailer} />}
    </div>
  );
};
