import dotenv from 'dotenv';
dotenv.config();
import {connectDB} from './config/db.js';
import { app } from './app.js';

const PORT = process.env.PORT || 8000;


// database connection
connectDB();

// Use cloudinary
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  



app.listen(PORT, ()=> {
    console.log(`Server is running on port:${PORT}`)
})



