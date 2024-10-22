import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import "./index.css";
import {Provider} from "react-redux"
import { store,persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import App from "./app/App";
ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App/>
      </PersistGate>
      </Provider>
    </BrowserRouter>
);
