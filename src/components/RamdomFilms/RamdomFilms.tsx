import { api } from "../../services/api/api";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../services/api/queryClient";
import { FilmInformation } from "../FilmInformation/FilmInformation";
import { movieInfoType } from "../../types/Films/filmsType";
import { Loader } from "../Loader/Loader";

export const RandomFilms = () => {
  const filmsQuery = useQuery<movieInfoType>(
    {
      queryFn: () => api.ramdomFilm(),
      queryKey: ["randomFilm"],
      retry: 0,
    },
    queryClient
  );

  if (filmsQuery.error) {
    console.error(filmsQuery.error);
  }

  switch (filmsQuery.status) {
    case "pending":
      return;
      <Loader />;
    case "success":
      return (
        <FilmInformation
          film={filmsQuery.data}
          showButton={true}
          isFullWidth={true}
          refetchFilm={filmsQuery.refetch}
        />
      );
    case "error":
      return (
        <div className="film-info">
          <p>Не удалось загрузить данные</p>
        </div>
      );
  }
};
