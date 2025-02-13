export const previousSight = () =>{
    const imageInput = document.querySelector("#createEventImage");
    const image = document.querySelector("#imagePreviousSight");
    const label = document.querySelector("#createEventImageLabel");
    const imageFile= imageInput.files[0];
    
    const reader = new FileReader();

    reader.onload = function(e) {
        image.src = reader.result;
    };
    reader.readAsDataURL(imageFile);
    image.classList = "visiblePreviousImage";
    label.textContent = "Haz clic de nuevo para cambiar la imagen";
};