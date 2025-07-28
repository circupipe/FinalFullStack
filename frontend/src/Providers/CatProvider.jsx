import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const CatContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function CatProvider({ children }) {
  const [cat, setCat] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    const SearchCat = async () => {
      try {
        const response = await api.get(`/producto/${category}`);
        setCat(response.data);
        setStatus(response.status);
      } catch (err) {
        setError(err.message);
      }
    };

    SearchCat();
  }, [category]);

  const createProduct = async (newProduct) => {
    try {
      const response = await api.post(`/producto/${category}`, newProduct);
      if (response.data.data) {
        setCat((prev) => ({
          ...prev,
          data: [...(prev?.data || []), response.data.data],
        }));
      }
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Error al crear producto",
      };
    }
  };

  return (
    <CatContext.Provider
      value={{ cat, status, error, category, createProduct }}
    >
      {children}
    </CatContext.Provider>
  );
}
