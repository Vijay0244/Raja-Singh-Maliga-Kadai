import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './config/connectDb';
import productRouter from './router/productRouter';

dotenv.config()

const app = express()
const PORT = process.env.PORT!

app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = process.env.FRONTEND_URL!

        if(!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")){
            callback(null, true)
        } 
        else{
            callback(new Error("CORS not allowed for: " + origin))
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/products', productRouter)

async function startServer(){
    try{
        await connectDb()
        app.listen(PORT, () =>{
            console.log(`Server running successfully`)
        })
    }
    catch(err: any){
        console.log(`Error in Starting Server - ${err.message}`)
        process.exit(1)
    }
}

startServer()