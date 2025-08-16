import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db.js';
import userRoutes from './src/route/userRoute.js';
import JobSeekerRoute from './src/route/jobSeekerRoute.js';
import CompanyRoute from './src/route/companyRoute.js';
import jobRoute from './src/route/jobRoute.js';

connectDB();

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3003",
      "http://localhost:3004"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  })
);


app.use(cookieParser());
app.use(express.json());
app.use('/user',userRoutes);
app.use('/jobseeker', JobSeekerRoute);
app.use('/company',CompanyRoute);
app.use('/job', jobRoute);
app.get('/', (req, res) => {
  res.send('Connecthire Backend is Running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
