const { eventModel } = require("../models/eventModel");
const userModel = require("../models/userModel");
/**
 * Adds a new event to the database.
 * 
 * @param {Object} req - HTTP request object.
 * @param {Object} req.body - Object of event details.
 * @param {string} req.params.userId - The ID of the user creating the event.
 * @param {Object} res - The HTTP response object.
 * 
 * @returns {Promise<Object>} - Returns a JSON response containing a success message, the saved event, 
 *                              and a success status. Sends an error response if an exception occurs.
 * 
 * @throws {Error} - Logs an error to the console if the event could not be saved.
 */

const addEvent = async (req, res) => {
    console.log("In addEvent");
    
    let eventDetails = req.body;
    const {userId} = req.user;
    try {
      // Include image URL if a file is uploaded
      const imageUrl = req.file?.path || null;
        console.log(imageUrl);
        
      const newEvent = new eventModel({
          ...eventDetails,
          image: imageUrl, 
          createdBy: userId
      });
      
        // console.log(newEvent);
        
        await newEvent.save();
        return res.status(200).json({message: "Event Saved",success: true, eventPosted: newEvent});
    } catch (error) {
        // !error adding event
        console.log(error);
        return res.status(401).json({success: false, message: "Error saving event! Please try again or contact to the developer"})

    }
} 


const fetchSpecificEvent = async (req, res) => {
    const {eventId} = req.params;
    try {
        const response = await eventModel.findById(eventId);
        console.log(response);
        
        if(!response) return res.status(400).json({message: "No event found"});
        return res.status(200).json({message: "Event found", eventDetails: response});

        
    } catch (error) {
        
    }
}

const fetchEvents = async (req, res) => {
    
   try {
    const response =  await eventModel.find();
    return res.status(200).json({events: response})
   } catch (error) {
    return res.status(401).json({message:"Error fetching events", error})
   }
    
}

const fetchUserEvents = async(req, res) => {
    console.log("IN FETCH EVENTS");
    
    const {userId} = req.user;
    try {
        const eventData = await eventModel.find({ createdBy: userId }).populate('createdBy');
        return res.status(200).json({success: true, events: eventData});
    } catch (error) {
        console.log(error);
        
    }
}

const editEvent = async (req, res) => {
    const {eventId} = req.params;
    const eventDetails = req.body;
    try {
        console.log("INSIDE EDIT EVENT CONTROLLER");
        
        const updatedEvent = await eventModel.findByIdAndUpdate(
            eventId,
            {$set: eventDetails},
            {new: true}
        );
        
        
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
          }

        console.log(updatedEvent);
        
         return res.status(200).json({
            message: "Event updated successfully",
            updateEvent: updatedEvent
          });
        
    } catch (error) {
        
    }
}


// save the eventId in userModel for that user
// save the userId, persons in eventModel
const bookEvent = async (req, res) => {
    const {eventId} = req.params;
    const {userId} = req.user;
    const {persons} = req.body;
    try {
        // save the eventId in userModel for that user
        const user = await userModel.findById(userId)
        user.bookings = [...user.bookings, eventId];
        await user.save();
        
        // save the userId, persons in eventModel
        const currentEvent = await eventModel.findById(eventId);
        currentEvent.bookings = [...currentEvent.bookings, {user: userId, persons: persons}]
        await currentEvent.save();
        console.log(currentEvent);
        return res.status(200).json({success: true, message: "Booked"})
    } catch (error) {
        console.log(error);
        return res.status(400).json({success: false, message: "Error booking event"})
    }

}


// delete the event from eventModel
// delete the eventIds from bookings from userModels too
const deleteEvent = async (req, res) => {   
    const {eventId} = req.params;
    console.log(eventId);
    
    try {
        // delete the event from eventModel
        console.log("hi");
        
        const isDeleted = await eventModel.deleteOne({_id: eventId});
        console.log(isDeleted);
        
        return res.status(200).json({message: "Event Deleted", success: true})

        
    } catch (error) {
            console.log(error);
            
    }
}


module.exports = {addEvent, fetchEvents, fetchUserEvents ,editEvent, fetchSpecificEvent, bookEvent, deleteEvent}

