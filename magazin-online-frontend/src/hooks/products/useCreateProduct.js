import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../api/productsApi";

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
