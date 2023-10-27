import mongoose from 'mongoose';

export const Connection = async()=>{
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/EduCareerData')
        // .then(()=>{
            console.log("Database Connected");
    } catch (error) {
        console.log(error);
    }
}
