import { useState } from "react";
import { useUser } from "../../Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

export function RegisterForm() {
  const { register } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const res = await register(form);

    if (!res.success) {
      setError(
        Array.isArray(res.error) ? res.error.join(", ") : "Error al registrar"
      );
    } else {
      setSuccess(true);
      setForm({
        username: "",
        email: "",
        password: "",
        firstname: "",
        lastname: "",
      });
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div className="register">
      <div className="register-form">
        <h1 className="register-title">Registro</h1>

        <form className="register-form-content" onSubmit={handleSubmit}>
          {["username", "email", "password", "firstname", "lastname"].map(
            (field) => (
              <div key={field} className="register-field">
                <label className="register-label" htmlFor={field}>
                  {field === "username"
                    ? "Usuario"
                    : field === "email"
                    ? "Correo"
                    : field === "password"
                    ? "Contraseña"
                    : field === "firstname"
                    ? "Nombre"
                    : "Apellido"}
                </label>
                <input
                  className="register-input"
                  type={
                    field === "password"
                      ? "password"
                      : field === "email"
                      ? "email"
                      : "text"
                  }
                  id={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder={`Ingresa tu ${
                    field === "username"
                      ? "usuario"
                      : field === "email"
                      ? "correo"
                      : field === "password"
                      ? "contraseña"
                      : field === "firstname"
                      ? "nombre"
                      : "apellido"
                  }`}
                />
              </div>
            )
          )}

          {error && (
            <div className="register-error">
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="register-success">
              <p>¡Usuario creado exitosamente!</p>
            </div>
          )}

          <button className="libbutton" type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
}