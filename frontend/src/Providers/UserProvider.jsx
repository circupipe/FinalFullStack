import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/users/me");
        setUser(response.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post("/users/login", { username, password });
      const data = response.data;

      if (data.code === 200) {
        const userResponse = await api.get("/users/me");
        setUser(userResponse.data.user);
        return { success: true, user: userResponse.data.user };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || ["Error de conexión"],
      };
    }
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
    } catch (_) {}
    setUser(null);
  };

  const register = async (userData) => {
    try {
      const response = await api.post("/users", userData);
      const data = response.data;

      if (data.code === 201) {
        return { success: true, user: data.data };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || ["Error de conexión"],
      };
    }
  };

  const updateUser = async (updatedData) => {
    if (!user) return { success: false, error: ["Usuario no autenticado"] };

    try {
      const response = await api.patch(`/users/${user.id}`, updatedData);
      const updatedUser = response.data.data;
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || ["Error al actualizar usuario"],
      };
    }
  };

  return (
    <UserContext.Provider
      value={{ user, loadingUser, login, logout, register, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
