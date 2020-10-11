import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { store } from "./store";

import App from "./pages/App";
import theme from "./components/theme";
import { ThemeProvider } from "@material-ui/core";

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>,

	document.getElementById("root")
);
