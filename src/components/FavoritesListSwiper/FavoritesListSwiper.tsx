import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../services/api/queryClient";
import { movieInfoArrayType } from "../../types/Films/filmsType";
import { api } from "../../services/api/api";
import { svg } from "../SvgComponents/SvgComponents";
import { Swiper, SwiperSlide } from "swiper/react";

interface FavoritesListProp {
  films: movieInfoArrayType;
}

export const FavoritesListSwiper: FC<FavoritesListProp> = ({ films }) => {
  const [hoveredFilmId, setHoveredFilmId] = useState<number | null>(null);
  const navigate = useNavigate();

  const deleteFilm = useMutation({
    mutationFn: (movieId: string) => api.deleteFavorites(movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
  const handleClick = (id: number) => {
    deleteFilm.mutate(id.toString());
  };

  return (
    <Swiper
      breakpoints={{
        380: {
          slidesPerView: 1.5,
          spaceBetween: 40,
        },
        576: {
          slidesPerView: 2.5,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 3.5,
          spaceBetween: 40,
        },
      }}
      grabCursor={true}
    >
      {films.map((film) => (
        <SwiperSlide key={film.id}>
          <div
            onClick={() => navigate(`/movie/${film.id}`)}
            onMouseEnter={() => setHoveredFilmId(film.id)}
            onMouseLeave={() => setHoveredFilmId(null)}
            className="favorites__item"
          >
            <span
              onClick={(event) => {
                event.stopPropagation();
                handleClick(film.id);
              }}
              className={
                hoveredFilmId === film.id
                  ? "favorites__btn-remove active"
                  : "favorites__btn-remove"
              }
            >
              {svg.close}
            </span>

            <img
              className="favorites__poster"
              src={film.posterUrl || "./def-title.jpg"}
              alt={film.title}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
