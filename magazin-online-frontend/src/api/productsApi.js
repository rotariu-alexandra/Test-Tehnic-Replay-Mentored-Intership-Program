import axiosClient from "./axiosClient";

export const fetchProducts = async (filters = {}) => {
  const params = {};
  if (filters.name) params.name = filters.name;
  if (filters.minPrice) params.minPrice = filters.minPrice;
  if (filters.maxPrice) params.maxPrice = filters.maxPrice;

  const { data } = await axiosClient.get("/products", { params });
  return data;
};

export const createProduct = async (product) => {
  const { data } = await axiosClient.post("/products", product);
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await axiosClient.put(`/products/${id}`, product);
  return data;
};

export const deleteProduct = async (id) => {
  await axiosClient.delete(`/products/${id}`);
};

export const fetchProductById = async (id) => {
  const { data } = await axiosClient.get(`/products/${id}`);
  return data;
};
