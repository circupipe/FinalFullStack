import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Searcher.css";
import { IoSearch } from "react-icons/io5";

const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function Searcher({ onProductSelect }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {

        const res = await api.get(
          `/producto/search/${encodeURIComponent(query)}`
        );
        setResults(res.data.data || []);
        setShowDropdown(true);
      } catch (err) {
        console.error("Error al buscar:", err);
        setResults([]);
        setShowDropdown(false);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleProductClick = (product) => {
    if (onProductSelect) {
      onProductSelect(product);
    }

    setQuery("");
    setResults([]);
    setShowDropdown(false);

    navigate(`/producto/${product.tipo_producto}/${product.id}`);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowDropdown(false), 150);
  };

  return (
    <div className="searcher-container">
      <div className="searcher-input-group">
        <IoSearch className="searcher-icon" />
        <input
          type="text"
          id="buscador"
          name="buscador"
          value={query}
          onChange={handleChange}
          onBlur={handleInputBlur}
          onFocus={() => query && results.length > 0 && setShowDropdown(true)}
          placeholder="Escribí para buscar..."
          className="searcher-input"
        />
      </div>

      {showDropdown && (
        <div className="searcher-dropdown">
          {loading && <div className="searcher-loading">Buscando...</div>}

          {!loading && results.length === 0 && query && (
            <div className="searcher-no-results">
              No se encontraron productos
            </div>
          )}

          {!loading &&
            results.map((product) => (
              <div
                key={`${product.tipo_producto}-${product.id}`}
                onClick={() => handleProductClick(product)}
                className="searcher-result-item"
              >
                <img className="image-product" src={product.image} alt="" />
                <div className="searcher-product-name">{product.product}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
