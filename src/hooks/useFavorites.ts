import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../services/api/api";
import { movieInfoType } from "../types/Films/filmsType";
import { queryClient } from "../services/api/queryClient";
import { fetchMeTypes } from "../types/User/User";

export function useFavorites(film: movieInfoType, setIsModal: Dispatch<SetStateAction<boolean>>) {
  const [isAdded, setIsAdded] = useState<boolean>(false);

    const {isSuccess} = useQuery<fetchMeTypes>({
      queryFn: () => api.fetchMe(),
      queryKey: ["userMe"],
      retry: 0,
    });

  const { data: favorites = [], refetch} = useQuery({
    queryFn: () => api.getFavorites(),
    queryKey: ["favorites"],
    enabled: isSuccess,
    retry: 0,
  }, queryClient);

  useEffect(() => {
    if (!film.id && isSuccess) return;
    setIsAdded(favorites.some((item: movieInfoType) => item.id === film.id));
  }, [film.id, favorites, isSuccess]);

  const addMutation = useMutation({
    mutationFn: (id: string) => api.postFavorites(id),
    onSuccess: () => {
      refetch();
    },
    onError() {
      setIsModal(true)
    }
  }, queryClient);

  const removeMutation = useMutation({
    mutationFn: (id: string) => api.deleteFavorites(id),
    onSuccess: () => {
      refetch();
    },
  }, queryClient);

  function toggleFavorite() {
    if (isAdded) {
      removeMutation.mutate(film.id.toString());
    } else {
      addMutation.mutate(film.id.toString());
    }
  }

  return {
    isAdded,
    toggleFavorite,
    loading: addMutation.isPending || removeMutation.isPending,
  };
}
