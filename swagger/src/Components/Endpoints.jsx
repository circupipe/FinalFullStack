import { createContext, useState } from "react";
import endpointData from "../endpoint.json";
import "../app.css";

export const EndContext = createContext();

export function Endpoints({ children }) {
	const [selectedEndpoint, setSelectedEndpoint] = useState();
	const [selectedType, setSelectedType] = useState();
	const [selectedMethod, setSelectedMethod] = useState();
	const [selectedDesc, setSelectedDesc] = useState();
	const [selectedTitle, setSelectedTitle] = useState();
	const [activeButton, setActiveButton] = useState(null);
	const [isDeleted, setIsDeleted] = useState(null);

	return (
		<>
			<div className="endpoints">
				{endpointData.map((item) => (
					<a
						key={item.title}
						onClick={() => {
							setSelectedEndpoint(item.endpoint);
							setSelectedType(item.type);
							setSelectedMethod(item.method);
							setSelectedDesc(item.desc);
							setSelectedTitle(item.title);
							setActiveButton(item.title);
							setIsDeleted(true);
						}}
						className={`method ${activeButton === item.title ? "activo" : ""}`}
						href="#"
					>
						<p className="name">{item.title}</p>
						<p className={`${item.method.toLowerCase()}`}>{item.method}</p>
					</a>
				))}
			</div>
			<EndContext.Provider
				value={{
					selectedEndpoint,
					selectedType,
					selectedMethod,
					selectedDesc,
					selectedTitle,
					isDeleted,
					setIsDeleted,
				}}
			>
				{children}
			</EndContext.Provider>
		</>
	);
}
