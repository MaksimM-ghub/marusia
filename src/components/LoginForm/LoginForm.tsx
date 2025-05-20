import "./LoginForm.scss";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../FormField/FormField";
import { Button } from "../Button/Button";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api/api";
import { queryClient } from "../../services/api/queryClient";
import { useForm } from "react-hook-form";
import { FC } from "react";

type LoginFormProps = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Неверный формат почты" })
    .nonempty("Поле обязательное для заполнения"),
  password: z.string().nonempty("Поле обязательное для заполнения"),
});

type loginType = z.infer<typeof loginSchema>;

export const LoginForm: FC<LoginFormProps> = ({ setIsModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation(
    {
      mutationFn: (data: loginType) => api.login(data),
      retry: 0,
      onSuccess() {
        reset();
        queryClient.invalidateQueries({ queryKey: ["userMe"] });
        setIsModal(false);
      },
    },
    queryClient
  );

  const onSubmit = (data: loginType) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form login-form">
      <FormField errorMessage={errors.email?.message}>
        <div className="auth-form__input-container">
          <span className="auth-form__icon auth-form__icon--email">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" />
            </svg>
          </span>
          <input
            {...register("email")}
            type="email"
            placeholder="Электронная почта"
            className="auth-form__input"
          />
        </div>
      </FormField>

      <FormField errorMessage={errors.password?.message}>
        <div className="auth-form__input-container">
          <span className="auth-form__icon auth-form__icon--password">
            <svg
              width="22"
              height="12"
              viewBox="0 0 22 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.917 7C11.441 9.8377 8.973 12 6 12C2.68629 12 0 9.3137 0 6C0 2.68629 2.68629 0 6 0C8.973 0 11.441 2.16229 11.917 5H22V7H20V11H18V7H16V11H14V7H11.917ZM6 10C8.20914 10 10 8.2091 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.2091 3.79086 10 6 10Z" />
            </svg>
          </span>
          <input
            {...register("password")}
            type="password"
            placeholder="Пароль"
            className="auth-form__input"
          />
        </div>
      </FormField>
      <Button
        isLoading={loginMutation.isPending}
        className="auth-form__button btn-primary"
      >
        Войти
      </Button>
    </form>
  );
};
