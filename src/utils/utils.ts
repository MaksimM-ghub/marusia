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
    history: { title: "История", src: "./history.jpg" },
    horror: { title: "Ужасы", src: "./horror.jpg" },
    scifi: { title: "Научная фантастика", src: "./scifi.jpg" },
    "stand-up": { title: "Стендап", src: "./standup.jpg" },
    fantasy: { title: "Фэнтези", src: "./fantasy.jpg" },
    drama: { title: "Драма", src: "./drama.jpg" },
    mystery: { title: "Мистика", src: "./mystery.jpg" },
    family: { title: "Семейный", src: "./family.jpg" },
    comedy: { title: "Комедия", src: "./comedy.jpg" },
    romance: { title: "Романтика", src: "./romance.jpg" },
    music: { title: "Музыка", src: "./music.jpg" },
    crime: { title: "Криминал", src: "./crime.jpg" },
    "tv-movie": { title: "Телефильм", src: "./tvmovie.jpg" },
    documentary: { title: "Документальный", src: "./documentary.jpg" },
    action: { title: "Боевик", src: "./action.jpg" },
    thriller: { title: "Триллер", src: "./thriller.jpg" },
    western: { title: "Вестерн", src: "./western.jpg" },
    animation: { title: "Мультфильм", src: "./animation.jpg" },
    war: { title: "Военный", src: "./war.jpg" },
    adventure: { title: "Приключения", src: "./adventure.jpg" },
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
