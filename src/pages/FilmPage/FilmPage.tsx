import { useParams } from "react-router-dom";
import { FilmInformation } from "../../components/FilmInformation/FilmInformation";
import { api } from "../../services/api/api";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../services/api/queryClient";
import { movieInfoType } from "../../types/Films/filmsType";
import { Loader } from "../../components/Loader/Loader";
import { AboutFilm } from "../../components/AboutFilm/AboutFilm";

const FilmPage = () => {
  const { movieId } = useParams();

  const filmQuery = useQuery<movieInfoType>(
    {
      queryKey: ["movieId", movieId],
      queryFn: () => api.getFilmId(movieId as string),
      retry: 0,
      enabled: !!movieId,
    },
    queryClient
  );

  if (!movieId) {
    return <div>Фильм не найден</div>;
  }

  switch (filmQuery.status) {
    case "error":
      return <div>Ошибка загрузки фильма</div>;
    case "success":
      return (
        <>
          <FilmInformation film={filmQuery.data} />
          <AboutFilm film={filmQuery.data} />
        </>
      );
    case "pending":
      return <Loader />;
    default:
      return null;
  }
};

export default FilmPage;

