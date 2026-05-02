import express from 'express';
import authRouter from './routes/auth.routes.js';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import { config } from './config/config.js'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from 'passport';


const app = express();

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

app.use("/api/auth",authRouter);

app.get('/', (req, res) => {
  res.send('server is running');
});

app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
},( accessToken,refreshToken,profile,done)=>{
    return done(null,profile);
    
}))

export default app;
