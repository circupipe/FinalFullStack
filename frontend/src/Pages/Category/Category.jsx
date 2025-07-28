import { useContext, useState } from "react";
import { CatContext } from "../../Providers/CatProvider";
import { useUser } from "../../Providers/UserProvider";
import { ProductForm } from "../../Components/ProductForm/ProductForm";
import { useNoti } from "../../Providers/NotiContext";
import { MiniCard } from "../../components/MiniCard/MiniCard";
import "./Category.css";

export function Category() {
  const { cat, category, error, createProduct } = useContext(CatContext);
  const { user } = useUser();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { showMessage } = useNoti();

  const categoryLabels = {
    cpu: "Procesador",
    motherboard: "Motherboard",
    ram: "Memoria RAM",
    graphics_card: "Placa de video",
    disk: "Disco",
    power_supply: "Fuente",
    case_pc: "Gabinete",
  };

  const displayCategoryName = categoryLabels[category] || category;

  if (error) return <div>Error: {error}</div>;
  if (!cat || !cat.data) return <div>Cargando...</div>;

  const handleCreateProduct = async (productData) => {
    const result = await createProduct(productData);
    if (result.success) {
      setShowCreateForm(false);
      showMessage("Producto creado exitosamente.");
    } else {
      showMessage(`Error al crear el producto: ${result.error}`);
    }
    return result;
  };

  return (
    <>
      <div className="category-header">
        <h1 className="category-title">{displayCategoryName} Disponibles </h1>

        {user?.type === "admin" && (
          <button className="libbutton" onClick={() => setShowCreateForm(true)}>
            Agregar Producto
          </button>
        )}
      </div>

      {showCreateForm && (
        <ProductForm
          category={category}
          mode="create"
          onClose={() => {
            setShowCreateForm(false);
            showMessage("Creación de producto cancelada.");
          }}
          onSave={handleCreateProduct}
        />
      )}

      <article className="products-grid">
        {cat.data.map((item) => (
          <MiniCard
            key={item.id}
            item={item}
            link={`/producto/${category}/${item.id}`}
          />
        ))}
      </article>
    </>
  );
}
