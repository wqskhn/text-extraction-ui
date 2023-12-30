import "./styles.scss";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter } from "react-router-dom";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "bootstrap/dist/js/bootstrap";

ReactDOM.render(
	<HashRouter>
		<App />
	</HashRouter>,
	document.getElementById("root")
);
