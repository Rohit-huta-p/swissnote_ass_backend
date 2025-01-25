// express
const express = require('express')
const app = express();
const { default: mongoose } = require('mongoose');
// env
const dotenv = require('dotenv')
dotenv.config();

// enabling cors
const cors = require('cors');
app.use(cors( {
    origin: 'https://swissnote-ass-frontend.vercel.app/',
    credentials: true,
}
));
// parse to json
app.use(express.json())

// ROUTES import
const userRoute = require('./routes/userRoute')
const eventRoutes = require('./routes/eventRoutes')
// user apis
app.use('/api/user/', userRoute)
app.use('/api/event/', eventRoutes)




app.listen(process.env.PORT,async () => {
    try {
        console.log(`Server started...${process.env.PORT}`);
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
        
    } catch (error) {
        console.log(error);
        
    }   
})



