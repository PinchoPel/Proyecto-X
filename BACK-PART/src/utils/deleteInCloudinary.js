const cloudinary = require("cloudinary").v2;

const delCloudinary = (urlImagen) =>{
    let urlSplited = urlImagen.split("/");
  
    let folderName = urlSplited[7];
    let imagen = urlSplited.at(-1).split(".")[0];
    
    let deleteImagenCloud = `${folderName}/${imagen}`;
    
    cloudinary.uploader.destroy(deleteImagenCloud, ()=>{})
  };

  module.exports = {delCloudinary};