import axios from "axios";
import { API_URL } from "../config/api";

const PRODUCT_API = `${API_URL}/api/products`;

export const getProducts = () => axios.get(PRODUCT_API);

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