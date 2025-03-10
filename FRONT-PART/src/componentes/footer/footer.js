import { linkCSS } from "../common/linkCSS.js";
import { loadTerms } from "./loadTerms.js";

export const createFooter = () =>{
    linkCSS("./src/componentes/footer/footer.css")
    const footer = document.createElement("footer");
    const contact = document.createElement("a");
    const terms = document.createElement("a");

    contact.textContent = "Contacto";
    contact.href = "mailto:zonadeventos10@gmail.com?subject=Consulta Zona de Eventos";
    contact.id = "contact";
    terms.textContent = "Terminos y Condiciones de Uso";

    terms.addEventListener("click", loadTerms);

    footer.append(contact, terms);
    document.body.append(footer);
};