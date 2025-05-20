import { useContext } from "react";
import { filterMovieContext } from "../context/filterMovieProvider";

export function useFilterMovie() {
    const context = useContext(filterMovieContext)

    if (!context) {
        throw new Error('Контекст отсутствует')
    }

    return context
}