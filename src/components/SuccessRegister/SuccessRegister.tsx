import { FC } from "react";
import { Button } from "../Button/Button"

type SuccessRegisterProps = {
  setAuthType: React.Dispatch<React.SetStateAction<string>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SuccessRegister: FC<SuccessRegisterProps> = ({setAuthType, setIsSuccess}) => {

  const handleClick = () => {
    setAuthType('auth')
    setIsSuccess(false)
  }

  return (
    <div className="auth-form__success-reg">
      <span className="auth-form__title-reg">Регистрация завершена</span>
      <p className="auth-form__text-reg">
        Используйте вашу электронную почту для входа
      </p>
      <Button onClick={handleClick} className="btn-primary auth-form__button">
        Войти
      </Button>
    </div>
  )
}