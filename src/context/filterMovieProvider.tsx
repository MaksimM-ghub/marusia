import { createContext, useState, FC, ReactNode } from 'react';

interface filterMovieContextType {
    isFilterModal: boolean;
    filterMovie: string;
    setIsFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
    setFilterMovie: React.Dispatch<React.SetStateAction<string>>;
}

export interface filterMovieProviderProp {
  children: ReactNode
}

export const filterMovieContext = createContext<filterMovieContextType | undefined>(undefined)

export const FilterMovieProvider: FC<filterMovieProviderProp> = ({children}) => {
    const [isFilterModal, setIsFilterModal] = useState<boolean>(false);
    const [filterMovie, setFilterMovie] = useState<string>("");
    
    return (
        <filterMovieContext.Provider value={{isFilterModal, setIsFilterModal, filterMovie, setFilterMovie}}>
            {children}
        </filterMovieContext.Provider>
    )
}