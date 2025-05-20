import './MyProfile.scss';
import { NavLink, Routes, Route } from "react-router-dom";
import { FavoritesFilm } from "../../components/FavoritesFilm/FavoritesFilm";
import { SettingProfile } from "../../components/SettingProfile/SettingProfile";
import { useMediaQuery } from '@mui/material';

const MyProfile = () => {

  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="profile__wrapper">
      <h1 className="profile__title">Мой аккаунт</h1>
      <div className="profile__section">
        <NavLink
          to="favorites" 
          className={({ isActive }) =>
            isActive
              ? "link-reset profile__section-link active"
              : "link-reset profile__section-link"
          }
        >
          {isMobile ? "Избранное" : "Избранные фильмы"}
        </NavLink>

        <NavLink
          to="settings"
          className={({ isActive }) =>
            isActive
              ? "link-reset profile__section-link active"
              : "link-reset profile__section-link"
          }
        >
          {isMobile ? "Настройки" : "Настройки аккаунта"}
        </NavLink>
      </div>

      <Routes>
        <Route path="favorites" element={<FavoritesFilm />} />
        <Route path="settings" element={<SettingProfile />} />
      </Routes>
    </div>
  );
};

export default MyProfile;