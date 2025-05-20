import "normalize.css";
import "./styles/main.scss";
import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LogoHeader } from "./components/LogoHeader/LogoHeader";
import { Navigation } from "./components/Navigation/Navigation";
import { ModalProvider } from "./context/authFormProvider";
import { SocialList } from "./components/SocialList/SocialList";
import { FilterMovieProvider } from "./context/filterMovieProvider";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Loader } from "./components/Loader/Loader";

const LazyMainPage = lazy(() => import("./pages/MainPage/MainPage"));
const LazyGenrePage = lazy(() => import("./pages/GenrePage/GenrePage"));
const LazyMovieList = lazy(() => import("./components/MovieList/MovieList"));
const LazyMyProfile = lazy(() => import("./pages/МуProfile/MyProfile"));
const LazyFilmPage = lazy(() => import("./pages/FilmPage/FilmPage"));

function App() {
  const location = useLocation();

  return (
    <>
      <ModalProvider>
        <header className="header">
          <div className="container">
            <div className="header__container">
              <LogoHeader />
              <FilterMovieProvider>
                <Navigation />
              </FilterMovieProvider>
            </div>
          </div>
        </header>
        <main>
          <section>
            <div className="container">
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={300}
                  classNames="fade"
                >
                  <Suspense fallback={<Loader />}>
                    <Routes location={location}>
                      <Route path="/" element={<LazyMainPage />} />
                      <Route path="/genre" element={<LazyGenrePage />} />
                      <Route path="/movie" element={<LazyMovieList />} />
                      <Route path="/profile/*" element={<LazyMyProfile />} />
                      <Route
                        path="/movie/:movieId"
                        element={<LazyFilmPage />}
                      />
                    </Routes>
                  </Suspense>
                </CSSTransition>
              </TransitionGroup>
            </div>
          </section>
        </main>
        <footer className="footer">
          <div className="container">
            <SocialList />
          </div>
        </footer>
      </ModalProvider>
    </>
  );
}

export default App;
