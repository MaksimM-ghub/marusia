import "./FilterMovieModal.scss";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { api } from "../../services/api/api";
import { Loader } from "../Loader/Loader";
import { FilterMovieList } from "../FilterMovieList/FilterMovieList";
import { FilterMovieListSwiper } from "../FilterMovieListSwiper/FilterMovieListSwiper";
import { movieInfoArrayType } from "../../types/Films/filmsType";
import { useMediaQuery } from "@mui/material";

type FilterMovieModalProps = {
  title: string;
};

export const FilterMovieModal: FC<FilterMovieModalProps> = ({ title }) => {

  const isMobile = useMediaQuery("(max-width: 920px)")

  const [count] = useState<number>(5);
  const { data, status } = useQuery<movieInfoArrayType>({
    queryFn: () => api.getMovies({ title, count }),
    queryKey: ["filterMovie", title],
    enabled: !!title,
  });

  switch (status) {
    case "pending":
      return (
        <div className="filter-movie__wrapper">
          <Loader/>
        </div>
      );
    case "error":
      return (
        <div className="filter-movie__wrapper">
          <p className="filter-movie__error">Возникла ошибка, проверьте соединение</p>
        </div>
      );
    case "success":
      return (
        <div className="filter-movie__wrapper">
          {isMobile ? (<FilterMovieListSwiper movies={data} />) : (<FilterMovieList movies={data} />)}
        </div>
      );
  }
};
