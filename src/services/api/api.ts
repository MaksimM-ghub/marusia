import {
  fetchMeTypes,
  UserSchema,
  loginType,
  registerUserType,
} from "../../types/User/User";
import { validationResponse } from "./validateResponse";
import {
  movieInfoSchema,
  movieInfoType,
  movieArraySchema,
  movieInfoArrayType,
  genresSchema,
  genresType,
} from "../../types/Films/filmsType";
import { movieType } from "../../types/apiType/api";

class Api {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  //Авторизация пользователя
  login(user: loginType): Promise<void> {
    return fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    })
      .then(validationResponse)
      .then(() => undefined);
  }

  logOut(): Promise<void> {
    return fetch(`${this.baseUrl}/auth/logout`, {
      method: "GET",
      credentials: "include",
    }).then((response) => response.json());
  }

  // Регистрация пользователя
  registerUser(user: registerUserType): Promise<void> {
    return fetch(`${this.baseUrl}/user`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(validationResponse)
      .then(() => undefined);
  }

  // Получение пользователя
  fetchMe(): Promise<fetchMeTypes> {
    return fetch(`${this.baseUrl}/profile`, {
      method: "GET",
      credentials: "include",
    })
      .then(validationResponse)
      .then((response) => response.json())
      .then((data) => UserSchema.parse(data));
  }

  //Получение списка фильмов добавленных в избранное
  getFavorites(): Promise<movieInfoArrayType> {
    return fetch(`${this.baseUrl}/favorites`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => movieArraySchema.parse(data));
  }
  // Добавление фильма в список избранного
  postFavorites(id: string): Promise<void> {
    return fetch(`${this.baseUrl}/favorites`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id }),
      credentials: 'include',
    })
      .then(validationResponse)
      .then(() => undefined);
  }
  
  // Удаление фильма из избранного
  deleteFavorites(movieId: string): Promise<void> {
    return fetch(`${this.baseUrl}/favorites/${movieId}`, {
      method: "DELETE",
      credentials: 'include',
    })
      .then(validationResponse)
      .then(() => undefined);
  }

  //Получение фильма по заданным фильтрам
  getMovies({count, page, title, genre}: movieType): Promise<movieInfoArrayType> {
    const params = new URLSearchParams()

    if (count) params.append("count", count.toString());
    if (page) params.append("page", page.toString());
    if (title) params.append("title", title);
    if (genre) params.append("genre", genre);

    return fetch(`${this.baseUrl}/movie?${params.toString()}`)
      .then(validationResponse)
      .then(response => response.json())
      .then(data => movieArraySchema.parse(data))
  }

  //Получение топ 10 фильмов
  getTopFilms(): Promise<movieInfoArrayType> {
    return fetch(`${this.baseUrl}/movie/top10`)
      .then((response) => response.json())
      .then((data) => movieArraySchema.parse(data));
  }

  //Получение жанров
  getGenres(): Promise<genresType> {
    return fetch(`${this.baseUrl}/movie/genres`)
      .then((response) => response.json())
      .then((data) => genresSchema.parse(data));
  }

  //Получение фильма по id
  getFilmId(movieId: string): Promise<movieInfoType> {
    return fetch(`${this.baseUrl}/movie/${movieId}`)
      .then((response) => response.json())
      .then((data) => movieInfoSchema.parse(data));
  }

  // Получение рандомного фильма (информации о фильме)
  ramdomFilm(): Promise<movieInfoType> {
    return fetch(`${this.baseUrl}/movie/random`)
      .then((response) => response.json())
      .then((data) => movieInfoSchema.parse(data));
  }
}

export const api = new Api("https://cinemaguide.skillbox.cc");
