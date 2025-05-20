import "./GenresList.scss"
import { FC } from "react";
import { translateGenre } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

type GenresListProps = {
  genres: string[] | undefined;
};

export const GenresList: FC<GenresListProps> = ({ genres }) => {
  const navigate = useNavigate();

  return (
    <ul className="list-reset genres__list">
      {genres?.map((genre, index) => {
        const { title, src } = translateGenre(genre);
        return (
          <li
            onClick={() => navigate(`/movie?genre=${genre}`)}
            key={`${genre}-${index}`}
            className="genres__item"
            tabIndex={0}
          >
            <img className="genres__poster" src={src} alt={`Обложка жанра ${title}`} />
            <span className="genres__name">{title}</span>
          </li>
        );
      })}
    </ul>
  );
};
