import { useContext } from "react";
import { modalContext } from "../context/authFormProvider"

export function useModal() {
  const context = useContext(modalContext)

  if (!context) {
     throw new Error('Контекст не определен')
  }

  return context
}