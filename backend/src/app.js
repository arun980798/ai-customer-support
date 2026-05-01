import express from 'express';
import authRouter from './routes/auth.routes';



const app = express();




app.use("/api/auth",authRouter);

app.get('/', (req, res) => {
  res.send('server is running');
});

export default app;