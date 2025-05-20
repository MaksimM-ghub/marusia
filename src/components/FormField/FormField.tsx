import './FormField.scss'
import { FC } from "react";
import { formFieldTypes } from "../../types/formTypes/formTypes";

export const FormField: FC<formFieldTypes> = ({
  children,
  errorMessage,
}) => {
  return (
    <label className={errorMessage ? "form-field error" : "form-field"}>
      {children}
      {errorMessage && (
        <span className="form-field__error-text">{errorMessage}</span>
      )}
    </label>
  );
};
