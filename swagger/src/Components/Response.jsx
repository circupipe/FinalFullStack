import { useContext } from "react";
import { OptContext } from "./Options";

export function Response() {
	const { res, url, isDeleted } = useContext(OptContext);

	return (
		<div className="results">
			{res?.length > 0 ? (
				isDeleted === false ? (
					<>
						<p>{url}</p>
						<pre>{res}</pre>
					</>
				) : (
					<p>Selecciona todos los parametros.</p>
				)
			) : (
				<p>
					Selecciona el metodo con sus parametros, luego pulsa en "Probar" para
					ver los resultados aqui.
				</p>
			)}
		</div>
	);
}
