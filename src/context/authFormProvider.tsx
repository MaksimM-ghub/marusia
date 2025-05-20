import { createContext, useState, FC, ReactNode } from 'react';

interface ModalContextType {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface modalContextProp {
  children: ReactNode
}

export const modalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: FC<modalContextProp> = ({children}) => {
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <modalContext.Provider value={{isModal, setIsModal}}>
      {children}
    </modalContext.Provider>
  )
}

