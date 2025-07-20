const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3002",
      "http://localhost:3000",
      "http://localhost:3004",
      "http://localhost:3003",
      "http://localhost:3001"
    ],
    credentials: true,
  })
);
app.use(express.json());



app.get('/', (req, res) => {
  res.send('Connecthire Backend is Running 🚀');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
