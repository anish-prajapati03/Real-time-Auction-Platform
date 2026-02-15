// backend/server.js
import app from "./app.js";
import cloudinary from "cloudinary";

// give a sensible default if PORT not set
const PORT = process.env.PORT || 5000;

// configure cloudinary (only if keys are present)
if (process.env.CLOUDINARY_CLOUD_NAME) {
    cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
