import { useState } from "react";
import { useUser } from "../../Providers/UserProvider";
import { ProductSchemas } from "../../Pages/Schemas/Schemas";
import "./ProductForm.css";

export function ProductForm({
  category,
  mode = "create",
  initialData = {},
  onClose,
  onSave,
}) {
  const { user } = useUser();
  const isAdmin = user?.type === "admin";

  const hiddenKeys = ["id"];

  const keyLabels = {
    product: "Nombre",
    stock: "Stock",
    watts_consumption: "Consumo en Watts",
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

  const booleanFields = ["modular"];

  const [formData, setFormData] = useState(() => {
    const schema = ProductSchemas[category];
    if (schema) {
      const shape = schema._def.shape();
      const initialForm = {};
      Object.keys(shape).forEach((key) => {
        if (!hiddenKeys.includes(key)) {
          if (numberFields.includes(key)) {
            initialForm[key] = initialData[key]?.toString() || "";
          } else if (booleanFields.includes(key)) {
            initialForm[key] = initialData[key] ? "true" : "false";
          } else {
            initialForm[key] = initialData[key] || "";
          }
        }
      });
      return initialForm;
    }
    return {};
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validateWithZod = () => {
    const dataToValidate = { ...formData };

    numberFields.forEach((key) => {
      if (dataToValidate[key] !== undefined && dataToValidate[key] !== "") {
        const num = Number(dataToValidate[key].replace(/,/g, "."));
        dataToValidate[key] = isNaN(num) ? dataToValidate[key] : num;
      } else {
        dataToValidate[key] = undefined;
      }
    });

    booleanFields.forEach((key) => {
      if (dataToValidate[key] !== undefined) {
        dataToValidate[key] = dataToValidate[key] === "true";
      }
    });

    const schema = ProductSchemas[category];
    if (!schema) {
      return { valid: true, data: dataToValidate };
    }

    const result = schema.safeParse(dataToValidate);
    if (!result.success) {
      const errors = {};
      result.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setFieldErrors(errors);
      return { valid: false };
    }
    setFieldErrors({});
    return { valid: true, data: dataToValidate };
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const { valid, data } = validateWithZod();

    if (!valid) {
      setSaving(false);
      return;
    }

    const result = await onSave(data);
    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } else {
      setError(result.error);
    }
    setSaving(false);
  };

  const renderEnumField = (key, value) => {
    const enumOptions = {
      platform: ["AMD", "Intel"],
      socket: ["AM4", "LGA1200", "LGA1700", "AM5"],
      ram_type: ["DDR3", "DDR4", "DDR5"],
      type: ["DDR3", "DDR4", "DDR5"],
      technology: ["HDD", "SSD", "M2"],
      certification: ["80 Plus Bronze", "80 Plus Gold", "80 Plus Platinum"],
    };

    const options = enumOptions[key] || [];

    return (
      <select
        value={value || ""}
        onChange={(e) => handleInputChange(key, e.target.value)}
        className={fieldErrors[key] ? "input-error" : ""}
        disabled={!isAdmin}
      >
        <option className="option" value="">
          Seleccionar...
        </option>
        {options.map((option) => (
          <option className="option" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="product-form-overlay">
      <div className="product-form-modal">
        {showSuccess && (
          <div className="success-message">✅ Producto creado exitosamente</div>
        )}

        <div className="form-header">
          <h2>{mode === "create" ? "Crear Producto" : "Editar Producto"}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {!isAdmin && (
          <div className="error" style={{ marginBottom: 16 }}>
            Solo los administradores pueden crear o editar productos.
          </div>
        )}

        {error && <div className="error">{error}</div>}

        <div className="form-content">
          {Object.entries(formData).map(([key, value]) => (
            <div className="form-field" key={key}>
              <label className="field-label">
                {keyLabels[key] || key.replace(/_/g, " ")}
              </label>
              <div className="field-input">
                {booleanFields.includes(key) ? (
                  <select
                    value={value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className={fieldErrors[key] ? "input-error" : ""}
                    disabled={!isAdmin}
                  >
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                  </select>
                ) : enumFields.includes(key) ? (
                  renderEnumField(key, value)
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className={fieldErrors[key] ? "input-error" : ""}
                    disabled={!isAdmin}
                  />
                )}
                {fieldErrors[key] && (
                  <span className="field-error">{fieldErrors[key]}</span>
                )}
              </div>
            </div>
          ))}

          <div className="form-actions">
            <button className="libbutton" onClick={onClose}>
              Cancelar
            </button>
            <button
              className="libbutton"
              onClick={handleSave}
              disabled={saving || !isAdmin}
              title={
                !isAdmin
                  ? "Solo los administradores pueden crear o editar productos"
                  : ""
              }
            >
              {saving
                ? "Guardando..."
                : mode === "create"
                ? "Crear"
                : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
