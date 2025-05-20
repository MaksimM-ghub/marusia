import './TrailerModal.scss'
import { FC } from "react";
import { movieInfoType } from "../../types/Films/filmsType";
import { svg } from "../SvgComponents/SvgComponents";

interface TrailerModalProps {
  film: movieInfoType;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TrailerModal: FC<TrailerModalProps> = ({ film, setIsModal }) => {
  
    const toggleModal = () => {
        setIsModal(false)
    }
  
    return (
    <>
      <div className="trailer__modal-dark">
        <div className="trailer__modal">
          <button onClick={toggleModal} className="trailer__close-btn">
            {svg.close}
          </button>
          <iframe
            className="trailer__player"
            width="100%"
            height="100%"
            src={film.trailerUrl || ""}
            title={film.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
};
