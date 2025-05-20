import "./RegisterForm.scss";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../FormField/FormField";
import { Button } from "../Button/Button";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api/api";
import { queryClient } from "../../services/api/queryClient";
import { useForm } from "react-hook-form";
import { FC } from "react";

type RegisterFormProps = {
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const registerSchema = z
  .object({
    name: z.string().nonempty("Поле обязательное для заполнения"),
    surname: z.string().nonempty("Поле обязательное для заполнения"),
    email: z
      .string()
      .email({ message: "Неверный формат почты" })
      .nonempty("Поле обязательное для заполнения"),
    password: z
      .string()
      .min(6, { message: "Пароль должен быть не менее 6 символов" })
      .nonempty("Поле обязательное для заполнения"),
    confirmPassword: z.string().nonempty("Поле обязательное для заполнения"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type RegisterFormType = z.infer<typeof registerSchema>;
type RegisterUserType = Omit<RegisterFormType, "confirmPassword">;

export const RegisterForm: FC<RegisterFormProps> = ({setIsSuccess}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutate = useMutation(
    {
      mutationFn: (registerData: RegisterUserType) =>
        api.registerUser(registerData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userMe"] });
        reset();
        setIsSuccess(true)
      },
    },
    queryClient
  );

  // Обработчик отправки формы
  const onSubmit = (data: RegisterFormType) => {
    const { confirmPassword, ...registerData } = data;
    registerMutate.mutate(registerData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form register-form">
      <span className="register-form__title">Регистрация</span>

      <FormField errorMessage={errors.email?.message}>
        <div className="auth-form__input-container">
        <span className="auth-form__icon auth-form__icon--email">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"
            />
          </svg>
        </span>
        <input
          {...register("email")}
          type="email"
          placeholder="sample@domain.ru"
          className="auth-form__input input-reset"
        />
        </div>
      </FormField>

      <FormField errorMessage={errors.name?.message}>
        <div className="auth-form__input-container">
        <span className="auth-form__icon auth-form__icon--name">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 22.75C4 18.3317 7.58172 14.75 12 14.75C16.4183 14.75 20 18.3317 20 22.75H18C18 19.4363 15.3137 16.75 12 16.75C8.68629 16.75 6 19.4363 6 22.75H4ZM12 13.75C8.685 13.75 6 11.065 6 7.75C6 4.435 8.685 1.75 12 1.75C15.315 1.75 18 4.435 18 7.75C18 11.065 15.315 13.75 12 13.75ZM12 11.75C14.21 11.75 16 9.96 16 7.75C16 5.54 14.21 3.75 12 3.75C9.79 3.75 8 5.54 8 7.75C8 9.96 9.79 11.75 12 11.75Z" />
          </svg>
        </span>
        <input
          {...register("name")}
          type="text"
          placeholder="Имя"
          className="auth-form__input input-reset"
        />
        </div>
      </FormField>

      <FormField errorMessage={errors.surname?.message}>
        <div className="auth-form__input-container">
        <span className="auth-form__icon auth-form__icon--password--name">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 22.75C4 18.3317 7.58172 14.75 12 14.75C16.4183 14.75 20 18.3317 20 22.75H18C18 19.4363 15.3137 16.75 12 16.75C8.68629 16.75 6 19.4363 6 22.75H4ZM12 13.75C8.685 13.75 6 11.065 6 7.75C6 4.435 8.685 1.75 12 1.75C15.315 1.75 18 4.435 18 7.75C18 11.065 15.315 13.75 12 13.75ZM12 11.75C14.21 11.75 16 9.96 16 7.75C16 5.54 14.21 3.75 12 3.75C9.79 3.75 8 5.54 8 7.75C8 9.96 9.79 11.75 12 11.75Z" />
          </svg>
        </span>
        <input
          {...register("surname")}
          type="text"
          placeholder="Фамилия"
          className="auth-form__input input-reset"
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
          className="auth-form__input input-reset"
        />
        </div>
      </FormField>

      <FormField errorMessage={errors.confirmPassword?.message}>
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
          {...register("confirmPassword")}
          type="password"
          placeholder="Подтвердите пароль"
          className="auth-form__input input-reset"
        />
        </div>
      </FormField>

      <Button
        isLoading={registerMutate.isPending}
        className="auth-form__button btn-primary"
      >
        Создать аккаунт
      </Button>
    </form>
  );
};
