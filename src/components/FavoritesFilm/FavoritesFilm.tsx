import "../FavoritesList/FavoritesList.scss";
import { useQuery } from "@tanstack/react-query";
import { FavoritesList } from "../FavoritesList/FavoritesList";
import { queryClient } from "../../services/api/queryClient";
import { api } from "../../services/api/api";
import { Loader } from "../Loader/Loader";
import { useMediaQuery } from "@mui/material";
import { FavoritesListSwiper } from "../FavoritesListSwiper/FavoritesListSwiper";

export const FavoritesFilm = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { data, status } = useQuery({
    queryFn: () => api.getFavorites(),
    queryKey: ["favorites"],
  }, queryClient);

  switch (status) {
    case "pending":
      return <Loader />;
    case "error":
      return <div className="favorites__not-films">Не удалось загрузить данные</div>;
    case "success":
      if (!data || data.length === 0) {
        return (
          <div className="favorites">
            <p className="favorites__not-films">Фильмы не добавлены в избранное</p>
          </div>
        );
      }
      return (
        <div className="favorites">
          {isMobile ? (
            <FavoritesListSwiper films={data} />
          ) : (
            <FavoritesList films={data} />
          )}
        </div>
      );
    default:
      return null;
  }
};
