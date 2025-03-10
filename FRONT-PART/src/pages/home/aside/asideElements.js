import { linkCSS } from "../../../componentes/common/linkCSS.js";
import { arrayProvinces, arrayTags } from "./arraysForSelects.js";
linkCSS("./src/pages/home/aside/aside.css");

export function createRangeForm (){
    const rangeDateForm = document.createElement("form");
    const rangeDateFieldset = document.createElement("fieldset");
    const rangeDateLegend = document.createElement("legend");
    const rangeDateStartLabel = document.createElement("label");
    const rangeDateStartInput = document.createElement("input");
    const rangeDateEndLabel = document.createElement("label");
    const rangeDateEndInput = document.createElement("input");
    const rangeDateButton= document.createElement("button");

    const today = new Date().toISOString().split("T")[0];
    rangeDateForm.id = "rangeDateForm";
    rangeDateLegend.textContent = "Buscar por intervalo de fechas";
    rangeDateStartLabel.setAttribute("for", "rangeDateStart");
    rangeDateStartLabel.textContent = "Fecha inicial";
    rangeDateStartInput.id = "rangeDateStartInput";
    rangeDateStartInput.type = "date";
    rangeDateStartInput.name = "rangeDateStart";
    rangeDateStartInput.min = today;
    rangeDateEndLabel.setAttribute("for", "rangeDateEnd");
    rangeDateEndLabel.textContent = "Fecha final";
    rangeDateEndInput.type = "date";
    rangeDateEndInput.name = "rangeDateEnd";
    rangeDateEndInput.id = "rangeDateEndInput";
    rangeDateEndInput.min = today;
    rangeDateButton.textContent = "Buscar fechas";
    rangeDateButton.id = "rangeDateButton";

    rangeDateFieldset.append(rangeDateLegend, rangeDateStartLabel, rangeDateStartInput, rangeDateEndLabel, rangeDateEndInput, rangeDateButton);
    rangeDateForm.append(rangeDateFieldset);
    return rangeDateForm;
};

export function createSearchByProvince (){
    const searchByProvinceDiv = document.createElement("div");
    const searchByProvinceLabel = document.createElement("label");
    const searchByProvinceSelect = document.createElement("select");
    const firstOptionProvince = document.createElement("option");

    searchByProvinceDiv.id = "searchByProvinceDiv";
    searchByProvinceLabel.setAttribute("for", "searchByProvince");
    searchByProvinceLabel.textContent = "Buscar por provincia";
    firstOptionProvince.textContent = "Seleccionar...";
    firstOptionProvince.id = "firstOptionProvince";
    firstOptionProvince.disabled = true;
    firstOptionProvince.selected = true;
    searchByProvinceSelect.id = "searchByProvince";
    for (const province of arrayProvinces) {
        const option = document.createElement("option");
        option.value = province;
        option.textContent = province;
        searchByProvinceSelect.append(option);
    }
    searchByProvinceSelect.value = firstOptionProvince.value;

    searchByProvinceSelect.insertBefore(firstOptionProvince, searchByProvinceSelect.firstChild);
    searchByProvinceDiv.append(searchByProvinceLabel, searchByProvinceSelect);
    return searchByProvinceDiv;
};

export function createSearchByTag (){
    const searchByTagDiv = document.createElement("div");
    const searchByTagLabel = document.createElement("label");
    const searchByTagSelect = document.createElement("select");
    const firstOptionTag = document.createElement("option");

    searchByTagDiv.id = "searchByTagDiv";
    searchByTagLabel.setAttribute("for", "searchByTag");
    searchByTagLabel.textContent = "Buscar por temática";
    searchByTagSelect.id = "searchByTag";
    firstOptionTag.textContent = "Seleccionar...";
    firstOptionTag.id = "firstOptionTag";
    firstOptionTag.disabled = true;
    firstOptionTag.selected = true;
    for (const tag of arrayTags) {
        const option = document.createElement("option");
        option.value = tag;
        option.textContent = tag;
        searchByTagSelect.append(option);
    }
    searchByTagSelect.value = firstOptionTag.value;

    searchByTagSelect.insertBefore(firstOptionTag, searchByTagSelect.firstChild);
    searchByTagDiv.append(searchByTagLabel, searchByTagSelect);
    return searchByTagDiv;
}

export function createReverseDate (){
    const reverseDate = document.createElement("button");
    reverseDate.id = "descendentDate";
    reverseDate.textContent = "Ordenar por fecha";
    return reverseDate;
};

export function createFilterAside (){
    const cleanFilters = document.createElement("button");
    cleanFilters.id = "cleanFilters";
    cleanFilters.id = "cleanFilters";
    cleanFilters.textContent = "Limpiar filtros";
    return cleanFilters;
};