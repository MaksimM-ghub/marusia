import "./AuthForm.scss";
import { useEffect, useState } from "react";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { LoginForm } from "../LoginForm/LoginForm";
import { svg } from "../SvgComponents/SvgComponents";
import { useModal } from "../../hooks/useContext";
import { SuccessRegister } from "../SuccessRegister/SuccessRegister";
import { CSSTransition } from "react-transition-group";

export const AuthForm = () => {
  const [authType, setAuthType] = useState<string>("auth");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { isModal, setIsModal } = useModal();

  const handleAuthTypeToggle = () => {
    setAuthType((prev) => (prev === "auth" ? "register" : "auth"));
  };

  const handleClose = () => {
    setIsModal(false);
  };

  useEffect(() => {
    if (isModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isModal]);

  return (
    <CSSTransition in={isModal} timeout={300} classNames="fade" unmountOnExit>
      <div className="auth-form__modal-dark">
        <CSSTransition
          in={isModal}
          timeout={300}
          classNames="form"
          unmountOnExit
        >
          <div className="auth-form__modal">
            <button className="auth-form__btn btn-reset" onClick={handleClose}>
              {svg.close}
            </button>
            <span className="app-logo auth-form__title">{svg.marusiaIcon}</span>
            {isSuccess ? (
              <SuccessRegister
                setAuthType={setAuthType}
                setIsSuccess={setIsSuccess}
              />
            ) : authType === "auth" ? (
              <LoginForm setIsModal={setIsModal} />
            ) : (
              <RegisterForm setIsSuccess={setIsSuccess} />
            )}
            <button
              className="auth-form__button-switch btn-reset"
              onClick={handleAuthTypeToggle}
            >
              {isSuccess
                ? null
                : authType === "register"
                  ? "У меня есть пароль"
                  : "Регистрация"}
            </button>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};
