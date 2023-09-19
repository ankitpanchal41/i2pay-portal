import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./app";
import { store } from "./app/redux/store";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <Router>
        <Suspense fallback={null}>
            <Provider store={store}>
                <App />
            </Provider>
        </Suspense>
    </Router>,
    document.getElementById("root"),
);
