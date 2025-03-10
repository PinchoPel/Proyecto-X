export function waitForDOM(selector1, selector2, selector3) {
    return new Promise((resolve, reject) => {
      document.addEventListener("DOMContentLoaded", () => {
        const element1 = document.querySelector(selector1);
        const element2 = document.querySelector(selector2);
        const element3 = document.querySelector(selector3);
        if (element1 && element2 && element3) {
          resolve([element1, element2, element3])
        }
        else if (element1 && element2) {
          resolve([element1, element2])
        } 
        else if (element1) {
          resolve(element1); 
        }
        else {
          reject(`Elemento lo encontrado`); 
        }
      });
    });
  };