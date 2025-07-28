import { Endpoints } from "./Components/Endpoints";
import { Options } from "./Components/Options";
import { Response } from "./Components/Response";
import "./App.css";

function App() {
	return (
		<div className="app">
			<Endpoints>
				<Options>
					<Response />
				</Options>
			</Endpoints>
		</div>
	);
}

export default App;
