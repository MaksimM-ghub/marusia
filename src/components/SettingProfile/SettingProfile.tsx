import "./SettingProfile.scss";
import { Button } from "../Button/Button";
import { queryClient } from "../../services/api/queryClient";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface user {
  name: string,
  surname: string,
  email: string
}

interface stateUser {
  user: user
}

export const SettingProfile = () => {
  const navigate = useNavigate()
  const logoutMutation = useMutation(
    {
      mutationFn: () => api.logOut(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userMe"] });
        navigate('/')
      },
      onError: (error: Error) => {
        console.error("Ошибка при выходе из аккаунта:", error);
      },
    },
    queryClient
  );

  const user = useSelector((state: stateUser) => state.user)

  const avatar = user.name.charAt(0).toUpperCase() + user.surname.charAt(0).toUpperCase()


  return (
    <div className="settings__wrapper">
      <div className="settings__data">
        <span className="settings__avatar">{avatar}</span>
        <div className="settings__data-wrapper">
          <span className="settings__info">Имя Фамилия</span>
          <span className="settings__current-info">{`${user.name} ${user.surname}`}</span>
        </div>
      </div>

      <div className="settings__data">
        <span className="settings__avatar">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"
              fill="white"
            />
          </svg>
        </span>
        <div className="settings__data-wrapper">
          <span className="settings__info">Электронная почта</span>
          <span className="settings__current-info">{user.email}</span>
        </div>
      </div>

      <Button
        isLoading={logoutMutation.isPending}
        className="settings__button btn-primary"
        onClick={() => logoutMutation.mutate()}
      >
        Выйти из аккаунта
      </Button>
    </div>
  );
};
