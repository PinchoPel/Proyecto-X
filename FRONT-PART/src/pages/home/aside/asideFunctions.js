import { linkCSS } from "../../../componentes/common/linkCSS.js";
import { waitForDOM } from "../../../componentes/common/waitForDOM.js";
import { eventsFetch } from "../section/eventsFetch.js";
import { renderEvents } from "../section/renderEvents.js";
import { cleanFilters } from "./cleanFilters.js";
import { dataFilter } from "./dataFilter.js";
import { noEvents } from "./noEvents.js";
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

export let filteredEvents = []; 
export let objectFilter = {
  startdate: null,
  enddate: null,
  province: null,
  tag: null
};
let dir = 1;

export async function applyFilters() {
  const events = dataFilter([filteredEvents], objectFilter);
  events.sort((a, b) => dir*(new Date(a.date) - new Date(b.date)));
  await renderEvents(events);
  await noEvents("No hay eventos según los criterios de búsqueda seleccionados");
};

waitForDOM("#descendentDate").then(boton => {boton.addEventListener("click", async () => {
        try {
            const order = await eventsFetch(`orderdates/${dir}`);
            filteredEvents = order;
            dir *= -1;
            await applyFilters();
        } catch (error) {
          console.error('No se han ordenado los eventos por fechas');
        }
  });
});

waitForDOM("#rangeDateStartInput", "#rangeDateEndInput", "#rangeDateForm").then(([inputStart, inputEnd, form]) => {
    form.addEventListener("submit", async (event) => {
        try {
            event.preventDefault();
            objectFilter.startdate = inputStart.value || null;
            objectFilter.enddate = inputEnd.value || null;
            const range = await eventsFetch(`rangedates/${inputStart.value}/to/${inputEnd.value}`);
            filteredEvents = range; 
            await applyFilters();
        } catch (error) {
            if (filteredEvents.length === 0 ) {
                console.info('No hay eventos para esas fechas');
            }
        }
    });
});

waitForDOM("#searchByProvince").then(province => {
    province.addEventListener("change", async (event) => {
        try {
            event.preventDefault();  
            objectFilter.province = event.target.value !== document.querySelector("#firstOptionProvince") ? event.target.value : null;
            const provinces = await eventsFetch(`eventlocation/${objectFilter.province}`);
            filteredEvents = provinces; 
            await applyFilters();
            document.querySelector("#firstOptionProvince").remove(); 
        } catch (error) {
            if (filteredEvents.length === 0 ) {
                console.info('No hay eventos para la provincia seleccionada');
            }
        }
    })
});

waitForDOM("#searchByTag").then(tag => {
    tag.addEventListener("change", async (event) => {
        try {
            event.preventDefault();
            objectFilter.tag = event.target.value !== document.querySelector("#firstOptionTag") ? event.target.value : null;
            const tags = await eventsFetch(`eventstag/${objectFilter.tag}`);
            filteredEvents = tags;
            await applyFilters();
            document.querySelector("#firstOptionTag").remove(); 
        } catch (error) {;
            if (filteredEvents.length === 0 ) {
                console.info('No hay eventos para el interés seleccionado');
            }
        }
    })
});

waitForDOM("#cleanFilters").then( clean => {
        clean.addEventListener("click", async () => {
        const events = await eventsFetch("orderdates/1");
        await renderEvents(events);
        cleanFilters();
    });
});