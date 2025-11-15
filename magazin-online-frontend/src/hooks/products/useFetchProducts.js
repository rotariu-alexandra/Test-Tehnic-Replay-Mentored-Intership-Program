import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../api/productsApi";

export const useFetchProducts = (filters) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
  });
};
