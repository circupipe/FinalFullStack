import { useContext, useEffect, useState } from "react";
import { ArmaContext } from "../../Providers/ArmaProvider";
import { useUser } from "../../Providers/UserProvider";
import { useNoti } from "../../Providers/NotiContext";
import { MiniCard } from "../../components/MiniCard/MiniCard";
import { ImRadioUnchecked } from "react-icons/im";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import "./ArmaTuPc.css";

const categoryLabels = {
  cpu: "Procesador",
  motherboard: "Motherboard",
  ram: "RAM",
  graphics_card: "Placa de video",
  disk: "Disco",
  power_supply: "Fuente",
  case_pc: "Gabinete",
};

const categoriesOrder = [
  "cpu",
  "motherboard",
  "ram",
  "graphics_card",
  "disk",
  "power_supply",
  "case_pc",
];

export function ArmaTuPc() {
  const { SearchCat, hard, error } = useContext(ArmaContext);
  const { user } = useUser();
  const { showMessage } = useNoti();

  const [stepIndex, setStepIndex] = useState(0);
  const [platform, setPlatform] = useState();
  const [socket, setSocket] = useState();
  const [ramType, setRamType] = useState();
  const [price, setPrice] = useState(0);
  const [watts, setWatts] = useState(0);
  const [end, setEnd] = useState(false);

  const [selectedItems, setSelectedItems] = useState({
    cpu: null,
    motherboard: null,
    ram: null,
    graphics_card: null,
    disk: null,
    power_supply: null,
    case_pc: null,
  });

  const category = categoriesOrder[stepIndex];

  const handleClick = (item) => {
    setSelectedItems((prev) => ({ ...prev, [category]: item }));
    setPrice((prev) => prev + Number(item.price));
    setWatts((prev) => prev + Number(item.watts_consumption || 0));

    if (category === "cpu") {
      setPlatform(item.platform);
      setSocket(item.socket);
    } else if (category === "motherboard") {
      setRamType(item.ram_type);
    } else if (category === "case_pc") {
      setEnd(true);
    }

    setStepIndex((prev) => prev + 1);
  };

  const savePC = () => {
    const storageKey = user?.id
      ? `pcBuilder-${user.id}`
      : "pcBuilder-guest";

    const dataToSave = {
      selectedItems,
      stepIndex,
      price,
      watts,
      platform,
      socket,
      ramType,
      end,
    };
    localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    showMessage("Tu PC fue guardada exitosamente.");
  };

  const deletePC = () => {
    const storageKey = user?.id
      ? `pcBuilder-${user.id}`
      : "pcBuilder-guest";

    localStorage.removeItem(storageKey);
    showMessage("Tu armado guardado fue eliminado.");
  };

  const resetAll = () => {
    setSelectedItems({
      cpu: null,
      motherboard: null,
      ram: null,
      graphics_card: null,
      disk: null,
      power_supply: null,
      case_pc: null,
    });
    setStepIndex(0);
    setPrice(0);
    setWatts(0);
    setEnd(false);
    setPlatform(undefined);
    setSocket(undefined);
    setRamType(undefined);

    const storageKey = user?.id
      ? `pcBuilder-${user.id}`
      : "pcBuilder-guest";

    localStorage.removeItem(storageKey);
  };

  const goBack = () => {
    if (stepIndex === 0) {
      resetAll();
      return;
    }

    const prevCategory = categoriesOrder[stepIndex - 1];
    const prevItem = selectedItems[prevCategory];

    setPrice((prev) => prev - (prevItem?.price || 0));
    setWatts((prev) => prev - (prevItem?.watts_consumption || 0));
    setSelectedItems((prev) => ({ ...prev, [prevCategory]: null }));

    if (prevCategory === "cpu") {
      setPlatform(undefined);
      setSocket(undefined);
    } else if (prevCategory === "motherboard") {
      setRamType(undefined);
    } else if (prevCategory === "case_pc") {
      setEnd(false);
    }

    setStepIndex((prev) => prev - 1);
    showMessage(`Borraste ${categoryLabels[category]}`);
  };

  useEffect(() => {
    const storageKey = user?.id
      ? `pcBuilder-${user.id}`
      : "pcBuilder-guest";

    const saved = localStorage.getItem(storageKey);

    if (saved) {
      const parsed = JSON.parse(saved);
      setSelectedItems(parsed.selectedItems || {});
      setStepIndex(parsed.stepIndex || 0);
      setPrice(parsed.price || 0);
      setWatts(parsed.watts || 0);
      setPlatform(parsed.platform);
      setSocket(parsed.socket);
      setRamType(parsed.ramType);
      setEnd(parsed.end || false);
    }
  }, [user]);

  useEffect(() => {
    if (category) {
      SearchCat(category);
    }
  }, [category]);

  if (error) return <p>Error: {error}</p>;
  if (!hard) return <p>Cargando productos...</p>;
  if (hard.length === 0)
    return <p>No hay productos disponibles para {categoryLabels[category]}.</p>;

  const filteredItems = hard.filter((item) => {
    if (category === "motherboard") {
      return item.platform === platform && item.socket === socket;
    }
    if (category === "ram") {
      return item.type === ramType;
    }
    if (category === "power_supply") {
      return item.watts >= watts * 1.25;
    }
    return true;
  });

  return (
    <div className="builder">
      {!end && (
        <aside className="builder-sidebar">
          {categoriesOrder.map((cat, idx) => {
            const item = selectedItems[cat];
            return (
              <div
                key={cat}
                className={`component-slot ${
                  stepIndex === idx ? "active" : ""
                }`}
              >
                <div className="slot-icon">
                  {item ? <FaCheckCircle /> : <ImRadioUnchecked />}
                </div>
                <div className="slot-content">
                  <p className="slot-title">{categoryLabels[cat]}</p>
                  <p className="slot-desc">
                    {item ? item.product : "Sin seleccionar"}
                  </p>
                </div>
              </div>
            );
          })}
        </aside>
      )}

      <main className={`builder-main ${end ? "full-width" : ""}`}>
        {stepIndex > 0 && !end && (
          <button className="libbutton " onClick={goBack}>
            <MdKeyboardDoubleArrowLeft /> Volver
          </button>
        )}

        {!end ? (
          <>
            <h2 className="step-title">
              Seleccioná tu {categoryLabels[category]}
            </h2>
            <div className="product-list">
              {filteredItems.length === 0 ? (
                <p>No hay productos compatibles disponibles.</p>
              ) : (
                filteredItems.map((item) => (
                  <MiniCard
                    key={item.id}
                    item={item}
                    onClick={() => handleClick(item)}
                  />
                ))
              )}
            </div>
          </>
        ) : (
          <div className=" pc-box">
            <h2 className="pc-text">Tu PC armada</h2>
            <div className="pc">
              <div>
                {categoriesOrder.map((cat) => {
                  const item = selectedItems[cat];
                  return (
                    item && (
                      <div key={cat} className="pc-part">
                        <div className="pc-image">
                          <img src={item.image} alt={item.product} />
                        </div>

                        <div>
                          <p className="pc-label">{categoryLabels[cat]}</p>
                          <p className="pc-product">{item.product}</p>
                          <p className="pc-price">${item.price}</p>
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
              <div className="resumen-box">
                <div className="resumen-data">
                  <div className="text-value">
                    <p className="data-text">Plataforma:</p>
                    <p className="data-value">{platform}</p>
                  </div>
                  <div className="text-value">
                    <p className="data-text">Socket:</p>
                    <p className="data-value">{socket}</p>
                  </div>
                  <div className="text-value">
                    <p className="data-text">Memoria Ram:</p>
                    <p className="data-value">
                      {selectedItems.graphics_card?.capacity_gb} GB{" "}
                      {selectedItems.ram?.type}
                    </p>
                  </div>
                  <div className="text-value">
                    <p className="data-text">GPU Ram:</p>
                    <p className="data-value">
                      {selectedItems.graphics_card?.capacity_gb} GB{" "}
                      {selectedItems.graphics_card?.ram_type}
                    </p>
                  </div>
                  <div className="text-value">
                    <p className="data-text">Disco:</p>
                    <p className="data-value">
                      {selectedItems.disk?.technology}{" "}
                      {selectedItems.disk?.capacity_gb} GB
                    </p>
                  </div>
                  <div className="text-value">
                    <p className="data-text">Fuente:</p>
                    <p className="data-value">
                      {selectedItems.power_supply?.watts}W
                    </p>
                  </div>
                  <div className="text-value"></div>
                  <div className="flex-center-center column">
                    <p className="text-price">Precio Final: </p>
                    <p className="number-price">${price}</p>
                  </div>
                </div>

                <div className="resumen-buttons">
                  <button className="libbutton" onClick={resetAll}>
                    Rearmar
                  </button>
                  {(user?.type === "user" || user?.type === "admin" || !user) && (
                    <>
                      {localStorage.getItem(
                        user?.id
                          ? `pcBuilder-${user.id}`
                          : "pcBuilder-guest"
                      ) ? (
                        <button className="libbutton" onClick={deletePC}>
                          Borrar PC
                        </button>
                      ) : (
                        <button className="libbutton" onClick={savePC}>
                          Guardar PC
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
