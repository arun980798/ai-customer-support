import app from './src/app.js';
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";




dotenv.config();


// connect database
connectDB();



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
