const { delCloudinary } = require("../../utils/deleteInCloudinary");
const Event = require("../models/events");


const getEvents = async (req,res) => {
    try {
        let dir = parseInt(req.params.order); 
        const allEvents = await Event.find().sort({ date: parseInt(dir) }).populate({path:"participants" , select: " -_id -password -email -role"});
        return res.status(200).json(allEvents);
    } catch (error) {
        return res.status(400).json("Ha fallado la petición")
    }
};

const getSingleEvent = async (req,res,next) => {
    try {
        let {id} = req.params;
        let singleEvent = await Event.findById(id).populate({path:"participants",select: " -_id -password -email -role"});
        return res.status(200).json(singleEvent);
    } catch (error) {
        return res.status(400).json("Ha fallado la petición")
    }
};

const searchByTag = async (req,res,next) => {
    try {
        let {tag} = req.params;
        let searchedTag = await Event.find({tags: tag});
        return res.status(200).json(searchedTag);
    } catch (error) {
        return res.status(400).json("Ha fallado la petición")
    }
};

const searchByLocation = async (req,res,next) => {
    try {
        let {province} = req.params;
        let events = await Event.find({location: province});
        return res.status(200).json(events);
    } catch (error) {
        return res.status(400).json("Ha fallado la petición")
    }
};

const searchByRangeDate = async (req, res, next) => { 
    try {
        let {startDate, endDate} = req.params;
        const start = new Date(`${startDate}T00:00:00.000Z`);
        const end = new Date(`${endDate}T23:59:59.999Z`);
        const event = await Event.find({
            date: { $gte: start, $lte: end },
        })
        return res.status(200).json(event);
    } catch (error) {
        return res.status(400).json("Ha fallado la petición para esas fechas")
    }
};

const getMyEvents = async (req, res, next) => {
    try {
        const {id} = req.user;
        const myEvents = await Event.find({ participants: { $in: [id] } });
        return res.status(200).json(myEvents);
    } catch (error) {
        return res.status(400).json("No hay eventos propios cargados")
    }
};

const getMyCreatedEvents = async (req, res, next) => {
    try {
        const {userName} = req.user;
        const myCreatedEvents = await Event.find({ author: userName}).populate("author");
        return res.status(200).json(myCreatedEvents);
    } catch (error) {
        return res.status(400).json("No hay eventos propios cargados")
    }
};

const postEvent = async (req,res,next) => {
    try {
        const {id} = req.user;
        const uniqueTags = [...new Set(req.body.tags)];
        
        let newEvent = new Event({
            title: req.body.title,
            image: req.file.path,
            date: req.body.date,
            author: req.user.userName,
            location: req.body.location,
            tags: uniqueTags,
            description: req.body.description         
        }) 

        newEvent.participants.push(id);     
        await newEvent.save();
        return res.status(200).json(newEvent);
    } catch (error) {
        return res.status(400).json("Ha fallado la creación del evento")
    }
};

const signUpEvent = async (req, res, next) => {
    try {
        const {id, userName} = req.user;
        const {eventId} = req.params;
        const event = await Event.findById(eventId);

        if (event.participants.includes(id) && userName !== event.author) {
            const eventUpdated = await Event.findByIdAndUpdate(eventId,{ $pull: { participants: id } }, { new: true }).populate("participants");
            return res.status(200).json(eventUpdated);
        }
        else{
            const eventUpdated = await Event.findByIdAndUpdate(eventId,{ $addToSet: { participants: id } }, { new: true }).populate("participants");
            return res.status(200).json(eventUpdated);
        }

    } catch (error) {
        return res.status(400).json("No se ha inscrito en el evento")
    }
};

const modifyEvent = async (req,res,next) => {
    try {
        const {id} = req.params;
        const {author, ...updateEvent} = req.body;
        const eventToModify = await Event.findById(id);        
        if (req.file) {
            delCloudinary(eventToModify.image);
            updateEvent.image = req.file.path;
        }
        const modifiedEvent = await Event.findByIdAndUpdate(id, updateEvent, { new: true, runValidators: true });
        return res.status(200).json(modifiedEvent); 
    } catch (error) {
        return res.status(400).json("Ha fallado la petición")
    }
};

const deleteEvent = async (req,res,next) => {
    try {
        const {id} = req.params;
        const deletedEvent = await Event.findById(id);
        delCloudinary(deletedEvent.image);
        await Event.findByIdAndDelete(id);
        return res.status(200).json({message: `El evento ${deletedEvent.title} ha sido borrado`,deletedEvent});
    } catch (error) {
        return res.status(400).json("Ha fallado la petición")
    }
};

module.exports = {getEvents, getSingleEvent, postEvent, modifyEvent, deleteEvent, searchByTag, searchByLocation, searchByRangeDate, getMyEvents, signUpEvent, getMyCreatedEvents};