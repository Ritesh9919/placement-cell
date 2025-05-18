import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import {errorHandlerMiddleware} from './middlewares/errorHandler.middleware.js'

// routers
import userRouter from './routes/user.routes.js'

const app = express();

app.use(express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());

app.get('/', (req,res)=> {
    res.send("Hello World");
})


app.use('/api/users', userRouter);
app.use(errorHandlerMiddleware);

export {app}