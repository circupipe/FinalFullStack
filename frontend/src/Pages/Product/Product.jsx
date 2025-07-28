import { useUser } from "../../Providers/UserProvider";
import { useContext, useState, useEffect } from "react";
import { ProContext } from "../../Providers/ProProvider";
import { ProductSchemas } from "../Schemas/Schemas";
import "./Product.css";
import { useNoti } from "../../Providers/NotiContext";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export function Product() {
  const [alert, setAlert] = useState(false);
  const {
    prod,
    category,
    deleteButton,
    updateProduct,
    keyLabels,
    numberFields,
    enumFields,
  } = useContext(ProContext);
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [editValues, setEditValues] = useState({});
  const { showMessage } = useNoti();
  const booleanFields = ["modular"];

  useEffect(() => {
    if (prod && prod[0]) setFormData(prod[0]);
  }, [prod]);

  useEffect(() => {
    if (isEditing) {
      const initial = {};
      Object.entries(formData).forEach(([key, value]) => {
        if (
          numberFields.includes(key) &&
          value !== undefined &&
          value !== null
        ) {
          initial[key] = value.toString();
        } else if (booleanFields.includes(key)) {
          initial[key] = value ? "true" : "false";
        } else {
          initial[key] = value ?? "";
        }
      });
      setEditValues(initial);
    }
  }, [isEditing, formData]);

  const handleInputChange = (key, value) => {
    setEditValues((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validateWithZod = () => {
    const dataToValidate = { ...editValues };

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
      console.warn(`No se encontró schema para la categoría: ${category}`);
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
      showMessage("Por favor, corrige los errores de validación.");
      return;
    }

    const result = await updateProduct(data);
    if (result.success) {
      if (result.product) {
        setFormData(result.product);
      }
      setIsEditing(false);
      showMessage("Producto actualizado exitosamente.");
    } else {
      setError(result.error);
      showMessage(`Error al actualizar el producto: ${result.error}`);
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFieldErrors({});
    setError("");
    showMessage("Edición cancelada.");
  };

  const renderEnumField = (key, value) => {
    const enumOptions = {
      platform: ["AMD", "Intel"],
      socket: ["AM4", "LGA1200", "LGA1700", "AM5"],
      ram_type: ["DDR3", "DDR4", "DDR5"],
      type: ["DDR3", "DDR4", "DDR5"],
      certification: ["80 Plus Bronze", "80 Plus Gold", "80 Plus Platinum"],
    };

    if (key === "technology") {
      return (
        <select
          value={value || ""}
          onChange={(e) => handleInputChange(key, e.target.value)}
          className={fieldErrors[key] ? "input-error" : ""}
        >
          <option value="">Seleccionar...</option>
          <option value="HDD">HDD</option>
          <option value="SSD">SSD</option>
          <option value="M2">M2</option>
        </select>
      );
    }

    const options = enumOptions[key] || [];

    return (
      <select
        value={value || ""}
        onChange={(e) => handleInputChange(key, e.target.value)}
        className={fieldErrors[key] ? "input-error" : ""}
      >
        <option value="">Seleccionar...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  if (!prod || prod.length === 0) {
    return <p>Cargando producto...</p>;
  }

  return (
    <div className="product-card">
      {alert && (
        <div className="overlayback">
          <div className="alertbox">
            <p>¿Está seguro de borrar el producto?</p>
            {user?.type === "admin" && (
              <div className="alertbutton">
                <button
                  className="libbutton"
                  onClick={() => {
                    deleteButton(setAlert);
                    showMessage("Producto borrado.");
                  }}
                >
                  Aceptar
                </button>
                <button className="libbutton" onClick={() => setAlert(false)}>
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {user?.type === "admin" && (
        <div className="adminbuttons">
          <button className="libbutton" onClick={() => setAlert(true)}>
            Borrar
          </button>
          {!isEditing ? (
            <button className="libbutton" onClick={() => setIsEditing(true)}>
              Editar
            </button>
          ) : (
            <>
              <button
                className="libbutton"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Guardando..." : "Guardar"}
              </button>
              <button className="libbutton" onClick={handleCancel}>
                Cancelar
              </button>
            </>
          )}
        </div>
      )}

      {error && <div className="error">{error}</div>}

      <h2 className="product-title">
        {isEditing ? (
          <div className="edit-field">
            <input
              value={editValues.product || ""}
              onChange={(e) => handleInputChange("product", e.target.value)}
              className={fieldErrors.product ? "input-error" : ""}
            />
            {fieldErrors.product && (
              <span className="field-error">{fieldErrors.product}</span>
            )}
          </div>
        ) : (
          formData.product
        )}
      </h2>

      <div className="product-content">
        {isEditing && (
          <div className="product-image edit-field">
            <label>URL de Imagen:</label>
            <input
              type="text"
              value={editValues.image || ""}
              onChange={(e) => handleInputChange("image", e.target.value)}
              placeholder="Introduce la URL de la imagen"
              className={fieldErrors.image ? "input-error" : ""}
            />
            {fieldErrors.image && (
              <span className="field-error">{fieldErrors.image}</span>
            )}
            {(editValues.image || formData.image) && (
              <img
                src={
                  editValues.image ||
                  (formData.image.startsWith("http")
                    ? formData.image
                    : `/uploads/${formData.image}`)
                }
                alt="Vista previa"
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
            )}
          </div>
        )}

        {!isEditing && formData.image && (
          <div className="product-image">
            <img
              src={
                formData.image.startsWith("http")
                  ? formData.image
                  : `/uploads/${formData.image}`
              }
              alt={formData.product}
            />
          </div>
        )}

        <div className="product-details">
          {(isEditing ? Object.entries(editValues) : Object.entries(formData))
            .filter(([key]) => {
              return (
                key !== "product" &&
                key !== "id" &&
                key !== "image" &&
                !(key === "stock" && !isEditing)
              );
            })
            .map(([key, value]) => (
              <div className="detail-item" key={key}>
                <span className="detail-label">
                  {keyLabels[key] || key.replace(/_/g, " ")}
                </span>
                {isEditing ? (
                  <div className="edit-field">
                    {booleanFields.includes(key) ? (
                      <select
                        value={value ? "true" : "false"}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className={fieldErrors[key] ? "input-error" : ""}
                      >
                        <option value="false">No</option>
                        <option value="true">Sí</option>
                      </select>
                    ) : enumFields.includes(key) ? (
                      renderEnumField(key, value)
                    ) : (
                      <input
                        type="text"
                        value={value ?? ""}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className={fieldErrors[key] ? "input-error" : ""}
                      />
                    )}
                    {fieldErrors[key] && (
                      <span className="field-error">{fieldErrors[key]}</span>
                    )}
                  </div>
                ) : (
                  <span className="detail-value">
                    {booleanFields.includes(key)
                      ? value
                        ? "Sí"
                        : "No"
                      : value?.toString()}
                  </span>
                )}
              </div>
            ))}
        </div>
      </div>
      <div>
        <button className="libbutton" onClick={() => window.history.back()}>
          <MdKeyboardDoubleArrowLeft />
          Volver
        </button>
      </div>
    </div>
  );
}
