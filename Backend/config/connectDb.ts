import mongoose from "mongoose"

export async function connectDb(){
    try{
        await mongoose.connect(process.env.MONGO_URL!)
        console.log(`MongoDB Connected`)
    }
    catch(err: any){
        console.log(`Error in Connecting MongoDB - ${err.message}`)
        process.exit(1)
    }
}