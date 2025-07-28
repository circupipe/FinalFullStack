import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Providers/UserProvider";
import "./LoginForm.css";

export function LoginForm({ onClose }) {
  const { login } = useUser();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(form.username, form.password);

    if (!res.success) {
      setError(
        Array.isArray(res.error) ? res.error.join(", ") : "Error de login"
      );
    } else {
      onClose?.();
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div className="login-form">
      {onClose && (
        <button
          type="button"
          className="close-button"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </button>
      )}

      <h1 className="login-title">Iniciar Sesión</h1>

      <form className="login-form-content" onSubmit={handleSubmit}>
        <div className="login-field">
          <label className="login-label" htmlFor="username">
            Usuario
          </label>
          <input
            className="login-input"
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Ingresa tu usuario"
          />
        </div>

        <div className="login-field">
          <label className="login-label" htmlFor="password">
            Contraseña
          </label>
          <input
            className="login-input"
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Ingresa tu contraseña"
          />
        </div>

        {error && (
          <div className="login-error">
            <p>{error}</p>
          </div>
        )}

        <button className="libbutton" type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <Link className="libbutton" onClick={onClose} to="/register">
        Registrarse
      </Link>
    </div>
  );
}
