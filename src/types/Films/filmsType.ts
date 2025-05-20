import { z } from "zod"; 

// Схема, описывающая данные для одного фильма
export const movieInfoSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  originalTitle: z.string(),
  language: z.string(),
  releaseYear: z.number().int().nullable(),
  releaseDate: z.string().nullable(),
  genres: z.array(z.string()), 
  plot: z.string().nullable(), 
  runtime: z.number().int(),
  budget: z.string().nullable(),
  revenue: z.string().nullable(),
  homepage: z.string().nullable(),
  status: z.string(),
  posterUrl: z.string().nullable(),
  backdropUrl: z.string().nullable(),
  trailerUrl: z.string().nullable(),
  trailerYoutubeId: z.string().optional(),
  tmdbRating: z.number(),
  searchL: z.string(),
  keywords: z.array(z.string()), 
  countriesOfOrigin: z.array(z.string()),
  languages: z.array(z.string()),
  cast: z.array(z.string()),
  director: z.string().nullable(),
  production: z.string().nullable(),
  awardsSummary: z.string().nullable(),
});

// Тип данных для одного фильма
export type movieInfoType = z.infer<typeof movieInfoSchema>;

// Схема для массива фильмов
export const movieArraySchema = z.array(movieInfoSchema);

// Тип данных для массива фильмов
export type movieInfoArrayType = z.infer<typeof movieArraySchema>;

export const genresSchema = z.array(z.string())
export type genresType = z.infer<typeof genresSchema>
