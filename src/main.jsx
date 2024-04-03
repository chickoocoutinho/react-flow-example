import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FlowContextProvider } from "./context/FlowContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<FlowContextProvider>
			<App />
		</FlowContextProvider>
	</React.StrictMode>
);
