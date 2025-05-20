import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import { movieInfoType } from "../../types/Films/filmsType";


export interface FavoritesState {
  favorites: movieInfoType[];
}

const loadFavoritesFromLocalStorage = (): movieInfoType[] => {
  const savedFavorites = localStorage.getItem('favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const initialState: FavoritesState = {
  favorites: loadFavoritesFromLocalStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addedFilm: (state, action: PayloadAction<movieInfoType>) => {
      const film = action.payload;
      if (!state.favorites.some((item: movieInfoType) => item.id === film.id)) {
        state.favorites.push(film);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFilm: (state, action: PayloadAction<number>) => {
      const filmId = action.payload;
      state.favorites = state.favorites.filter((item: movieInfoType) => item.id !== filmId);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    }
  }
});

export const { addedFilm, removeFilm } = favoritesSlice.actions;
export default favoritesSlice.reducer;
