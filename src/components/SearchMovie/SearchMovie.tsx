import { FilterMovieModal } from "../FilterMovieModal/FilterMovieModal";
import "./SearchMovie.scss";
import { ChangeEvent, useEffect, FC, useState } from "react";
import { useFilterMovie } from "../../hooks/useFilterMovie";
import { CSSTransition } from "react-transition-group";

type SearchMovieProp = {
  showInput?: boolean;
  setShowInput?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchMovie: FC<SearchMovieProp> = ({
  showInput,
  setShowInput,
}) => {
  const { filterMovie, setFilterMovie, isFilterModal, setIsFilterModal } =
    useFilterMovie();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterMovie(event.target.value);
    if (event.target.value) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setIsFilterModal(!!filterMovie);
  }, [filterMovie, setIsFilterModal]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showInput &&
        setShowInput &&
        !(event.target as HTMLElement).closest(".header__input-wrapper")
      ) {
        setShowInput(false);
        setFilterMovie("");
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInput, setShowInput, setFilterMovie]);

  return (
    <>
      <div className="header__input-wrapper">
        <span className="header__input-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" />
          </svg>
        </span>
        <input
          onChange={handleInput}
          className="header__input"
          value={filterMovie}
          placeholder="Поиск"
          type="text"
        />
        {showInput && setShowInput && (
          <span
            onClick={() => {
              setShowInput(false);
              setFilterMovie("");
              setIsOpen(false);
            }}
            className={`header__input-close ${isOpen ? "open" : ""}`}
          ></span>
        )}
        <CSSTransition
          in={isFilterModal}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <FilterMovieModal title={filterMovie} />
        </CSSTransition>
      </div>
    </>
  );
};
