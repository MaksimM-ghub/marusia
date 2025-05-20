import "swiper/css";
import "./topFilms.scss";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api/api";
import { movieInfoArrayType } from "../../types/Films/filmsType";
import { Loader } from "../Loader/Loader";
import { useMediaQuery } from "@mui/material";
import { TopFilmsList } from "../TopFilmsList/TopFilmsList";
import { TopFilmsListSwiper } from "../TopFilmsListSwiper/TopFilmsListSwiper";

export const TopFilms = () => {
  const isMobile = useMediaQuery("(max-width: 420px)");

  const topFilmsQuery = useQuery<movieInfoArrayType>({
    queryFn: () => api.getTopFilms(),
    queryKey: ["topFilms"],
    retry: 0,
  });

  const films = topFilmsQuery.data;

  switch (topFilmsQuery.status) {
    case "pending":
      return <Loader />;

    case "error":
      return <div className="top-films">Ошибка при загрузке фильмов</div>;

    case "success":
      if (films && films.length > 0) {
        return (
          <div className="top-films">
            {isMobile ? (
              <TopFilmsListSwiper films={films} />
            ) : (
              <TopFilmsList films={films} />
            )}
          </div>
        );
      } else {
        return <div className="top-films">Фильмы не найдены</div>;
      }
    default:
      return null;
  }
};
