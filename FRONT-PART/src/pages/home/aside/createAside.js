import { linkCSS } from "../../../componentes/common/linkCSS.js";
import { createFilterAside, createRangeForm, createReverseDate, createSearchByProvince, createSearchByTag } from "./asideElements.js";
import { asideToggle } from "./asideFunctions.js";

export const createAsideHome = () =>{
    const divHome = document.querySelector("#divHome");
    const asideSectionHome = document.createElement("aside");
    const toggleButtonAsideMenu = document.createElement("button");
    const toggleButtonImageAsideMenu = document.createElement("img");
    const divAside = document.createElement("div");
    linkCSS("./src/pages/home/aside/aside.css");

    const rangeDateForm = createRangeForm();
    const searchByTagDiv = createSearchByTag();
    const searchByProvinceDiv = createSearchByProvince();
    const reverseDate = createReverseDate();
    const cleanFilters = createFilterAside();

    asideSectionHome.id = "asideSectionHome";
    divAside.id = "divAside";
    toggleButtonAsideMenu.id = "toggleButtonAsideMenu";
    toggleButtonImageAsideMenu.id = "toggleButtonImageAsideMenu";
    toggleButtonImageAsideMenu.src = "./src/images/lens-svgrepo-com.svg";

    toggleButtonAsideMenu.append(toggleButtonImageAsideMenu);
    
    divAside.append(rangeDateForm, reverseDate, searchByTagDiv,  searchByProvinceDiv,  cleanFilters);
    asideSectionHome.append(toggleButtonAsideMenu, divAside);
    divHome.append(asideSectionHome);

    toggleButtonAsideMenu.addEventListener("click", ()=> asideToggle(asideSectionHome, divAside, toggleButtonImageAsideMenu));
};