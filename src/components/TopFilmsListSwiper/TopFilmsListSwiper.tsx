import { FC } from "react";
import { movieInfoArrayType, movieInfoType } from "../../types/Films/filmsType";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

type TopFilmsListProps = {
  films: movieInfoArrayType;
};

export const TopFilmsListSwiper: FC<TopFilmsListProps> = ({ films }) => {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="top-films__title">Топ 10 фильмов</h2>
      <Swiper spaceBetween={40} slidesPerView={1.5} grabCursor={true}>
        {films.map((film: movieInfoType, index: number) => (
          <SwiperSlide key={film.id}>
            <div
              onClick={() => navigate(`/movie/${film.id}`)}
              className="top-films__item"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/movie/${film.id}`);
                }
              }}
            >
              <div className="top-films__item-content">
                <span className="top-films__number">{index + 1}</span>
                <img
                  className="top-films__poster"
                  src={film.posterUrl || "/def-title.jpg"}
                  alt={film.title}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
