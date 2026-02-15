import mongoose from "mongoose";


export const connection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_AUCTION_PLATEFORM"
    }).then(() => {
        console.log("Connected to database.");
    }).catch((err) => {
        console.error("Some error occurred while connecting to DB:", err);
    });
};