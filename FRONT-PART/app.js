
import { createHeader } from "./src/componentes/header/header.js";
import { createMain } from "./src/componentes/main/main.js";


  createHeader();
  createMain();
  window.addEventListener("load", () => {
    document.body.style.visibility = "visible";
  });