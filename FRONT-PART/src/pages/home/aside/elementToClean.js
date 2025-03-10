export const elementToClean = (idSelect, idOption) =>{
    const select = document.querySelector(idSelect);
    let option = document.querySelector(idOption);
    if (!select.querySelector(`option#${idOption}`)) {
        option = document.createElement("option");
        option.textContent = "Seleccionar...";
        option.id = idOption;
        select.value = option.textContent;
        select.insertBefore(option, select.firstChild);
    }
};