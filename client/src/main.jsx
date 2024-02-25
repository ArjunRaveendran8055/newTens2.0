
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "./index.css";
import {Provider} from "react-redux"
import { store } from "./app/store";
ReactDOM.createRoot(document.getElementById("root")).render(

  
    <BrowserRouter>
      <Provider store={store}>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <App />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
      </Provider>
    </BrowserRouter>
);
