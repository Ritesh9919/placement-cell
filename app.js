import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import {errorHandlerMiddleware} from './middlewares/errorHandler.middleware.js'

// routers
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'

const app = express();

app.use(express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:process.env.NODE_ENV == 'production'?FRONTEND_DOMAIN:'*',
    credentials:true
}));

app.get('/', (req,res)=> {
    res.send("Hello World");
})


app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use(errorHandlerMiddleware);

export {app}