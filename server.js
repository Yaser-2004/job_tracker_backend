import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import jobRoutes from './routes/jobRoutes.js'
import authRoutes from './routes/authRoutes.js'
import env from 'dotenv'

const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(cors());
env.config();

//mongoDb connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log("Mongo connection error --->", err));

//routes
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);

//server
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})