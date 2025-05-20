export function formatTime(runtime: number): string {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  const hoursStr = hours > 0 ? `${hours} ч` : "";
  const minutesStr = minutes > 0 ? `${minutes} мин` : "";

  return [hoursStr, minutesStr].filter(Boolean).join(" ");
}

export function getBackgroundColorByRating(rating: number): string {
  if (rating < 5 && rating > 0) return "red";
  if (rating >= 5 && rating <= 7) return "orange";
  if (rating > 7) return "green";
  return "gray";
}

type Genre =
  | "history"
  | "horror"
  | "scifi"
  | "stand-up"
  | "fantasy"
  | "drama"
  | "mystery"
  | "family"
  | "comedy"
  | "romance"
  | "music"
  | "crime"
  | "tv-movie"
  | "documentary"
  | "action"
  | "thriller"
  | "western"
  | "animation"
  | "war"
  | "adventure";

type genreInfo = { title: string; src: string };

export function translateGenre(genre: string): genreInfo {
  const genreTranslations: Record<Genre, genreInfo> = {
    history: { title: "История", src: "./public/history.jpg" },
    horror: { title: "Ужасы", src: "./public/horror.jpg" },
    scifi: { title: "Научная фантастика", src: "./public/scifi.jpg" },
    "stand-up": { title: "Стендап", src: "./public/standup.jpg" },
    fantasy: { title: "Фэнтези", src: "./public/fantasy.jpg" },
    drama: { title: "Драма", src: "./public/drama.jpg" },
    mystery: { title: "Мистика", src: "./public/mystery.jpg" },
    family: { title: "Семейный", src: "./public/family.jpg" },
    comedy: { title: "Комедия", src: "./public/comedy.jpg" },
    romance: { title: "Романтика", src: "./public/romance.jpg" },
    music: { title: "Музыка", src: "./public/music.jpg" },
    crime: { title: "Криминал", src: "./public/crime.jpg" },
    "tv-movie": { title: "Телефильм", src: "./public/tvmovie.jpg" },
    documentary: { title: "Документальный", src: "./public/documentary.jpg" },
    action: { title: "Боевик", src: "./public/action.jpg" },
    thriller: { title: "Триллер", src: "./public/thriller.jpg" },
    western: { title: "Вестерн", src: "./public/western.jpg" },
    animation: { title: "Мультфильм", src: "./public/animation.jpg" },
    war: { title: "Военный", src: "./public/war.jpg" },
    adventure: { title: "Приключения", src: "./public/adventure.jpg" },
  };

  const translation = genreTranslations[genre as Genre];

  return translation;
}

export function languageTranslation(language: string): string {
  switch (language) {
    case "en":
      return "Английский";
    case "ru":
      return "Русский";
      case "co":
        return "Корейский";
      default:
        return "Нет информации"
  }
}

export function translateMoney(money: number | string | null): string {
  if (money === null || money === "") {
      return "Нет информации";
  }

  const numericMoney = typeof money === "string" ? parseFloat(money) : money;

  if (isNaN(numericMoney)) {
      return "Нет информации";
  }

  return `${numericMoney.toLocaleString("ru-RU")} руб`;
}
