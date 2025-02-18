export const previousSight = (inputSelector, imageSelector, labelSelector, callback) =>{
    const imageInput = document.querySelector(inputSelector);
    const image = document.querySelector(imageSelector);
    const label = document.querySelector(labelSelector);
    const imageFile= imageInput.files[0];
    
    const reader = new FileReader();
    
    reader.onload = function() {
        image.src = reader.result;
    };
    if (typeof callback === "function") {
        callback();
    }
    reader.readAsDataURL(imageFile);
    image.classList = "visiblePreviousImage";
    label.textContent = "Haz clic de nuevo para cambiar la imagen";
};