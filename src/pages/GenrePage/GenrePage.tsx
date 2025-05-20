import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api/api";
import { genresType } from "../../types/Films/filmsType";
import { queryClient } from "../../services/api/queryClient";
import { GenresList } from "../../components/GenresList/GenresList";
import { Loader } from "../../components/Loader/Loader";

const GenrePage = () => {
  const genreQuery = useQuery<genresType>(
    {
      queryFn: () => api.getGenres(),
      queryKey: ["genres"],
      retry: 0,
    },
    queryClient
  );

  switch (genreQuery.status) {
    case "error":
      return <div>Не удалось загрузить данные</div>;
    case "success":
      return (
        <div className="genres">
          <GenresList genres={genreQuery.data} />
        </div>
      );
    case "pending":
      return (
        <div className="genres">
          <Loader />
        </div>
      );
  }
};

export default GenrePage;
