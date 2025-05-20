import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../services/api/queryClient";
import { movieInfoArrayType } from "../../types/Films/filmsType";
import { api } from "../../services/api/api";
import { svg } from "../SvgComponents/SvgComponents";

interface FavoritesListProp {
  films: movieInfoArrayType;
}

export const FavoritesList: FC<FavoritesListProp> = ({ films }) => {
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
    <ul className="list-reset favorites__list">
      {films.map((film) => (
        <li
          key={film.id}
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
        </li>
      ))}
    </ul>
  );
};

