const mongoose = require("mongoose");
const  {User}  = require("./users");


const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String},
    date: {type: Date, required: true},
    author: {type: String, required: true},
    location: {type: String, required: true, enum: [
        "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila",
        "Badajoz", "Barcelona", "Burgos", "Cáceres", "Cádiz", "Cantabria",
        "Castellón", "Ciudad Real", "Ceuta", "Córdoba", "Cuenca", "Gerona", "Granada",
        "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares", "Jaén",
        "Coruña", "La Rioja", "Las Palmas", "León", "Lérida", "Lugo",
        "Madrid", "Málaga", "Melilla", "Murcia", "Navarra", "Orense", "Palencia",
        "Pontevedra", "Salamanca", "Santa Cruz de Tenerife", "Segovia", "Sevilla",
        "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid",
        "Vizcaya", "Zamora", "Zaragoza"
    ]},
    address: {type: String},
    description: {type: String, required: false},
    tags: {type: [String], enum: [
        "Concierto","Taller", "Conferencia","Feria","Festival","Exposición","Charla","Webinar","Competición","Deportes","Teatro","Danza","Cine","Literatura","Arte","Gastronomía","Tecnología", "Innovación","Cultura","Educación","Medio Ambiente","Viajes","Música","Familia","Infantil","Juvenil","Solidaridad", "Negocios","Startups","Fotografía","Religioso","Aventura", "Fiesta", "Quedada", "Fiestas Locales","Moda","Emprendimiento","Voluntariado","Formación","Bienestar","Salud","Yoga","Ciencia","Gaming","Espectáculos","Cómic","Robótica","Agricultura","Sostenibilidad", "Misterio", "Arquitectura", "Excursión", "Escalada", "Camping", "Naturaleza"
    ]},
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: User.modelName}],
},{
    timestamps: true,
    collection: "events",
    versionKey: false
});

const Event = mongoose.model("event", eventSchema, "events");

module.exports = Event;