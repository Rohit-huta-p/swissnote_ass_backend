const userModel = require("../models/userModel");
const {eventModel} = require('../models/eventModel')


const fetchUserDetails = async (req, res) => {
    const {userId} = req.user;
    console.log("USER ID",userId);
    
    try {
        if(userId){
            const user = await userModel.findById(userId);
            return res.status(200).json({userId: userId, email: user.email, role: 'user'});
        }else{
            return res.status(200).json({userId: 0, email: 'Guest@guest.com', role: 'guest'});
        }
    } catch (error) {
        console.log(error);
        
    }
    
}


const register = async (req, res) => {
    const {name, email, password, guest} = req.body;

    if(!name && !email && !password && !guest){
        return res.status(400).json({ message: "Email and password are required." });
    } 
    if(!guest){
        try {
            const user = await userModel.findOne({email});
            if(user){
                return res.status(400).json({error: 'User already exists'});
            }else{
                const hashedPassword = await userModel.encyptPassword(password);
                const newUser = await new userModel({name, email, password: hashedPassword});
                await newUser.save();
                return res.status(201).json({message: 'User created successfully'});
            }   
       } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' }); // Respond with an error 
       }
    }else{
        await login(req, res);
    }

}


const login = async (req, res) => {
    const {email, password, guest} = req.body;
    console.log("Guest: ",guest);
    
    // not guest
    if(!guest){
        // find user

        
        const user = await userModel.findOne({email});
        if(user){
            // check password
            const isPassChecked = await userModel.comparePass(password, user.password);
            
            if(isPassChecked){
                // set Token
                const token = userModel.generateToken(user);
                // SUCCESS - user logged in
                console.log("fsf");
                return res.status(200).json({token, message: "You are logged In"});
            }else{
                // password not match
                return res.status(401).json({error: 'Password does not match'});
            }
        }else{
            // user not found
            return res.status(404).json({error: 'Email Not Found!'});
        }
    // login as guest
    }else {
        const token = userModel.generateToken("guest", guest);
        console.log(token);
        
        return res.status(200).json({token, message: "You are logged In"});
    }
   
   
}


const bookedvents = async (req, res) => {
    const {userId} = req.user;
    let {is_retrieve_full} = req.params;
    is_retrieve_full = Boolean(is_retrieve_full !== "false" && is_retrieve_full !== "0");

    
    try {

      console.log(is_retrieve_full == false);
      
        
        if(is_retrieve_full == false){
            const user = await userModel.findById(userId);
            console.log(user);
            const bookedEventIds = user.bookings;
            return res.status(200).json({bookedEventIds})
        }else  {
            console.log("there");
            
            
            const bookedEvents = await eventModel.find({ "bookings.user": userId });
            const date = new Date();
            
            
            
            console.log(bookedEvents);
            return res.status(200).json({bookedEvents})            

            
        }
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {register, login, fetchUserDetails, bookedvents}