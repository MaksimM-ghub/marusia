import { configureStore } from "@reduxjs/toolkit"; 
import userReducer  from './userSlice/userSlice'
import favoritesReducer  from './favoritesSlice/favoritesSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;