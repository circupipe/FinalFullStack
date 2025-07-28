import { useState, useEffect, createContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const ProContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function ProProvider({ children }) {
  const [prod, setProd] = useState([]);
  const { category, id } = useParams();
  const navigate = useNavigate();

  const keyLabels = {
    product: "Nombre",
    watts_consumption: "Consumo en Watts",
    cores: "Núcleos",
    frequency: "Frecuencia en GHz",
    platform: "Plataforma",
    socket: "Socket",
    ram_slots: "Slots de RAM",
    ram_type: "Tipo de RAM",
    integrated: "Integrada",
    speed_mhz: "Velocidad en MHz",
    capacity_gb: "Capacidad en GB",
    price: "Precio",
    type: "Tipo",
    technology: "Tecnología",
    colors: "Colores",
    watts: "Watts",
    modular: "Modular",
    certification: "Certificación",
    stock: "Stock",
    image: "URL de Imagen",
  };

  const numberFields = [
    "watts_consumption",
    "stock",
    "price",
    "frequency",
    "capacity_gb",
    "speed_mhz",
    "ram_slots",
    "watts",
  ];

  const enumFields = [
    "platform",
    "socket",
    "ram_type",
    "type",
    "technology",
    "certification",
  ];

  useEffect(() => {
    const SearchProd = async () => {
      try {
        const response = await api.get(`/producto/${category}/${id}`);
        setProd(response.data.data);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };

    if (id && Number(id) > 0) {
      SearchProd();
    }
  }, [id, category]);

  const deleteButton = async (setAlert) => {
    try {
      await api.delete(`/producto/${category}/${id}`);
      setAlert(false);
      navigate(`/producto/${category}/`);
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const updateProduct = async (updatedData) => {
    try {
      const response = await api.put(
        `/producto/${category}/${id}`,
        updatedData
      );
      setProd([response.data.data]);
      return { success: true, product: response.data.data };
    } catch (error) {
      console.error("Error al actualizar:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Error al actualizar",
      };
    }
  };

  return (
    <ProContext.Provider
      value={{
        prod,
        category,
        id,
        deleteButton,
        updateProduct,
        keyLabels,
        numberFields,
        enumFields,
      }}
    >
      {children}
    </ProContext.Provider>
  );
}
