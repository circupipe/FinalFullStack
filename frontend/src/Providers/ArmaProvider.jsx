import axios from "axios";
import { useState, createContext } from "react";

export const ArmaContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function ArmaProvider({ children }) {
  const [hard, setHard] = useState(null);
  const [error, setError] = useState(null);

  const SearchCat = async (category) => {
    setError(null);
    try {
      const response = await api.get(`/producto/${category}`);
      if (response.data?.data?.length > 0) {
        setHard(response.data.data);
      } else {
        setHard([]);
        setError(`No hay productos disponibles para ${category}`);
      }
    } catch (err) {
      setHard([]);
      setError(`Error al buscar ${category}: ${err.message}`);
      console.error(err.message);
    }
  };

  return (
    <ArmaContext.Provider value={{ SearchCat, hard, error }}>
      {children}
    </ArmaContext.Provider>
  );
}
