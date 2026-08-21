import axios from "axios";
import { API_URL } from "../config/api";

const PRODUCT_API = `${API_URL}/api/products`;
console.log("API_URL:", API_URL);
console.log("PRODUCT_API:", PRODUCT_API);

export const getProducts = async () => {
  console.log("PRODUCT_API:", PRODUCT_API);

  const response = await axios.get(PRODUCT_API);

  console.log("ACTUAL REQUEST URL:", response.config.url);
  console.log("PRODUCT COUNT FROM API:", response.data.length);
  console.log("PRODUCT DATA:", response.data);

  console.log("PRODUCT API COUNT:", response.data.length);
  console.log("PRODUCT API DATA:", response.data);

  return response;
};

export const createProduct = (data) => {
  const user = JSON.parse(localStorage.getItem("crmUser"));

  return axios.post(
    PRODUCT_API,
    data,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
};

export const updateProduct = (id, product) => {
  const user = JSON.parse(localStorage.getItem("crmUser"));

  return axios.put(
    `${PRODUCT_API}/${id}`,
    product,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
};

export const deleteProduct = (id) => {
  const user = JSON.parse(localStorage.getItem("crmUser"));

  return axios.delete(
    `${PRODUCT_API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
};