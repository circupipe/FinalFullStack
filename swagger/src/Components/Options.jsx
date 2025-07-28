import { createContext, useContext, useState } from "react";
import { EndContext } from "./Endpoints";
import axios from "axios";

export const OptContext = createContext();

export function Options({ children }) {
	const {
		selectedEndpoint,
		selectedType,
		selectedMethod,
		selectedDesc,
		selectedTitle,
		isDeleted,
		setIsDeleted,
	} = useContext(EndContext);

	const [category, setCategory] = useState("cpu");
	const [id, setId] = useState(1);
	const [query, setQuery] = useState("");
	const [res, setRes] = useState();
	const [url, setUrl] = useState(null);

	const categories = [
		{ key: "cpu", label: "Cpu" },
		{ key: "motherboard", label: "Mother" },
		{ key: "ram", label: "Ram" },
		{ key: "graphics_card", label: "Gpu" },
		{ key: "disk", label: "Disco" },
		{ key: "power_supply", label: "Fuente" },
		{ key: "case_pc", label: "Gabinete" },
	];

	async function GetProducts() {
		try {
			let response;

			switch (selectedType) {
				case "Productos":
					response = await axios.get(`${selectedEndpoint}/${category}`);
					setRes(JSON.stringify(response.data, null, 2));
					setUrl(`${selectedEndpoint}/${category}`);
					setIsDeleted(false);
					break;
				case "ID":
					response = await axios.get(`${selectedEndpoint}/${category}/${id}`);
					setRes(JSON.stringify(response.data, null, 2));
					setUrl(`${selectedEndpoint}/${category}/${id}`);
					setIsDeleted(false);
					break;
				case "Todos":
					response = await axios.get(`${selectedEndpoint}`);
					setRes(JSON.stringify(response.data, null, 2));
					setUrl(`${selectedEndpoint}`);
					setIsDeleted(false);
					break;
				case "Search":
					response = await axios.get(`${selectedEndpoint}/${query}`);
					setRes(JSON.stringify(response.data, null, 2));
					setUrl(`${selectedEndpoint}/${query}`);
					setIsDeleted(false);
					break;
				default:
					break;
			}
		} catch (error) {
			console.error("Error al obtener productos", error);
			setRes(
				JSON.stringify(
					{ error: error.message, details: error.response?.data },
					null,
					2
				)
			);
		}
	}

	return (
		<>
			<div className="options">
				<div className="probar-box">
					<button className="probar" onClick={GetProducts}>
						Probar
					</button>
				</div>
				<h3>{selectedTitle || "Selecciona tu Endpoint"}</h3>
				<p className="desc">{selectedDesc}</p>
				<div>
					{(selectedType === "Productos" || selectedType === "ID") && (
						<>
							<p className="input-label">Selecciona el tipo de producto</p>
							<div className="cat-button-box">
								{categories.map(({ key, label }) => (
									<button
										className={`cat-button ${category === key ? "activo" : ""}`}
										key={key}
										onClick={() => (setCategory(key), setIsDeleted(true))}
									>
										{label}
									</button>
								))}
								{selectedType === "ID" && (
									<div className="input-box">
										<label htmlFor="user-id" className="input-label">
											ID de Producto:
										</label>
										<input
											id="user-id"
											type="number"
											value={id}
											onChange={(e) => setId(e.target.value)}
											className="input-field"
										/>
									</div>
								)}
							</div>
						</>
					)}
					{selectedType === "Search" && (
						<div className="input-box">
							<label htmlFor="search-query" className="input-label">
								Ingresa los terminos de búsqueda:
							</label>
							<input
								id="search-query"
								type="text"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								className="input-field"
							/>
						</div>
					)}
				</div>
			</div>
			<OptContext.Provider value={{ res, url, isDeleted }}>
				{children}
			</OptContext.Provider>
		</>
	);
}
