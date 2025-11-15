import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../api/productsApi";

export const useFetchProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
};
