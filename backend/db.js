import mongoose from "mongoose";

const mongoURI = "mongodb+srv://inotebook123:inotebook123@cluster0.qsezv.mongodb.net/inotebook123";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

export default connectToMongo;