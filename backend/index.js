import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";


const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins With Default of cors(*)
app.use(cors());

// Option 2: Allow Customs Origins
// app.use(
//     cors({
//         origin: ["http://localhost:3000"],
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"],
//     })
// );

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to the backend!');
});

app.use('/books', booksRoute);

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});