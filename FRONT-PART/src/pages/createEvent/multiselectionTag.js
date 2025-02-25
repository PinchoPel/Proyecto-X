export const multiselectionTag = (selected)=>{
    const select = document.querySelector("#createEventTag");
    if (!selected.includes(select.value)) {
        selected.push(select.value);
      }
      else if (selected.includes(select.value)) {
        const index = selected.indexOf(select.value);
        selected.splice(index, 1);
      }      
};