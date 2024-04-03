import { useState } from "react";
import Flow from "./components/Flow/Flow";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Flow />
		</>
	);
}

export default App;
