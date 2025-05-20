import "./UserLogin.scss";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api/api";
import { AuthForm } from "../AuthForm/AuthForm";
import { useModal } from "../../hooks/useContext";
import { fetchMeTypes } from "../../types/User/User";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserField } from "../../store/userSlice//userSlice";
import { LoaderBtn } from "../LoaderBtn/LoaderBtn";
import { svg } from "../SvgComponents/SvgComponents";

type UserLoginProp = {
  isMobile: boolean;
};

export const UserLogin: FC<UserLoginProp> = ({ isMobile }) => {
  const { setIsModal } = useModal();
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsModal(true);
  };

  const meQuery = useQuery<fetchMeTypes>({
    queryFn: () => api.fetchMe(),
    queryKey: ["userMe"],
    retry: 0,
  });

  switch (meQuery.status) {
    case "error":
      return (
        <>
          <button className="header__login btn-reset" onClick={handleClick}>
            {isMobile ? svg.profile : "Войти"}
          </button>
          <AuthForm />
        </>
      );
    case "success":
      dispatch(setUserField({ field: "name", value: meQuery.data.name }));
      dispatch(setUserField({ field: "surname", value: meQuery.data.surname }));
      dispatch(setUserField({ field: "email", value: meQuery.data.email }));
      return (
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav__link active link-reset" : "nav__link link-reset"
          }
          to={"/profile/favorites"}
        >
          {isMobile ? svg.profile : meQuery.data.name}
        </NavLink>
      );
    case "pending":
      return (
        <>
          <LoaderBtn />
        </>
      );
  }
};
