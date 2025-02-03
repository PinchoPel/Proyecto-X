import { linkCSS } from "../../../componentes/common/linkCSS.js";
import { waitForDOM } from "../../../componentes/common/waitForDOM.js";
import { eventsFetch } from "../section/eventsFetch.js";
import { dataFilter } from "./dataFilter.js";
import { elementToClean } from "./elementToClean.js";
import { noEvents } from "./noEvents.js";
import { renderEvents } from "./renderEvents.js";
linkCSS("./src/pages/home/aside/aside.css");

export const asideToggle = (aside, div, image) => {
    if (!aside.classList.contains("expand") && !div.classList.contains("expand") && !image.classList.contains("expand") ) {
        aside.classList = "expand";
        div.classList = "expand";
        image.classList = "expand";
        image.src = "./src/images/arrow-left-svgrepo-com.svg";
    }
    else{
        aside.classList.remove("expand") ;
        div.classList.remove("expand") ;
        image.classList.remove("expand") ;
        image.src = "./src/images/lens-svgrepo-com.svg";
    }
};

let objectFilter = {
    startdate: null,
    enddate: null,
    province: null,
    tag: null
  };
  
let rangeDateFiltered = [];
let provinceFiltered = [];
let tagFiltered = [];

function renderFiltered() {
    const filteredEvent = dataFilter([rangeDateFiltered, provinceFiltered, tagFiltered], objectFilter);
    return filteredEvent;
  };
const filteredEvent = renderFiltered();

let dir = -1;
waitForDOM("#descendentDate")
.then(boton => {boton.addEventListener("click", async () => {
        try {
            const events = await eventsFetch(`orderdates/${dir}`);
            await renderEvents(events);
            dir *= -1;
        } catch (error) {
          console.error('No se han ordenado los eventos por fechas');
        }
  });
});

waitForDOM("#rangeDateStartInput", "#rangeDateEndInput", "#rangeDateForm")
.then(([inputStart, inputEnd, form]) => {
    form.addEventListener("submit", async (event) => {
        try {
            event.preventDefault();
            const range = await eventsFetch(`rangedates/${inputStart.value}/to/${inputEnd.value}`);
            rangeDateFiltered = range;
            objectFilter.startdate = inputStart.value;
            objectFilter.enddate = inputEnd.value;
            await renderEvents(range)
            noEvents("No hay eventos para esas fechas");
        } catch (error) {
            console.info('No hay eventos en ese rango de fechas');
        }
    });
});

waitForDOM("#searchByProvince")
.then(province => {
    province.addEventListener("change", async (event) => {
        try {
            event.preventDefault();  
            const provinces = await eventsFetch(`/eventlocation/${event.target.value}`);
            provinceFiltered = provinces;         
            objectFilter.province = event.target.value;
            await renderEvents(provinces);
            await noEvents("No hay eventos para la provincia seleccionada, podrías crear el primer evento");
            document.querySelector("#firstOptionProvince").remove();         
        } catch (error) {
            console.info('No hay eventos en esa provincia');
        }
    })
});

waitForDOM("#searchByTag")
.then(tag => {
    tag.addEventListener("change", async (event) => {
        try {
            event.preventDefault();
            const tags = await eventsFetch(`eventstag/${event.target.value}`);
            tagFiltered = tags;
            objectFilter.tag = event.target.value;
            await renderEvents(tags);
            await noEvents("No hay eventos para el interés seleccionado, podrías crear el primer evento");
            document.querySelector("#firstOptionTag").remove();   
        } catch (error) {;
            console.info('No hay eventos para el interés seleccionado');
        }
    })
});

waitForDOM("#cleanFilters")
.then( clean => {
        clean.addEventListener("click", async () => {
        const events = await eventsFetch("orderdates/1");
        await renderEvents(events);
        elementToClean("#searchByProvince", "firstOptionProvince");
        elementToClean("#searchByTag", "firstOptionTag");

        const startDate = document.querySelector("#rangeDateStartInput");
        const endDate = document.querySelector("#rangeDateEndInput");
        startDate.value = "";
        endDate.value = "";

        objectFilter.startdate = null;
        objectFilter.enddate = null;
        objectFilter.province = null;
        objectFilter.tag = null;   
        rangeDateFiltered = [];
        provinceFiltered = [];
        tagFiltered = [];
    });
});