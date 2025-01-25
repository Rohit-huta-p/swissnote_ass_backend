const multerUploads = require('../config/multer');
const { addEvent, fetchUserEvents, editEvent, fetchSpecificEvent, fetchEvents, bookEvent, deleteEvent } = require('../controller/eventController');
const verifyToken = require('../utils/verifyToken');


const router = require('express').Router()
/**
 * *EVENT ROUTES
 * ADD - POST /add  (userId)
 * 
 * 
 */


router.get('/',verifyToken, fetchEvents)
router.get('/user_events',verifyToken, fetchUserEvents)
router.post('/:eventId', fetchSpecificEvent)

// add
router.put("/add", verifyToken, multerUploads.single('image'),  addEvent)

router.patch('/edit/:eventId',verifyToken, editEvent)
router.delete('/delete/:eventId',verifyToken, deleteEvent)


router.post('/book/:eventId',verifyToken, bookEvent)

module.exports = router;