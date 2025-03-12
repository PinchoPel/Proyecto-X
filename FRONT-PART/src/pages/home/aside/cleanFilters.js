
import { filteredEvents, objectFilter } from "./asideFunctions.js";
import { elementToClean } from "./elementToClean.js";

export const cleanFilters = () => {
    objectFilter.startdate = null;
    objectFilter.enddate = null;
    objectFilter.province = null;
    objectFilter.tag = null;   
    filteredEvents.length = 0; 

    const startDate = document.querySelector("#rangeDateStartInput");
    const endDate = document.querySelector("#rangeDateEndInput");
    startDate.value = "";
    endDate.value = "";

    elementToClean("#searchByProvince", "firstOptionProvince");
    elementToClean("#searchByTag", "firstOptionTag");
};