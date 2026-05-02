import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.JWT_SECRET){
    throw new Error("jwt secret is not available in environment varibale")
}

if(!process.env.MONGO_URL){
    throw new Error("mongo url is not available in environment varibale")
}

if(!process.env.GOOGLE_CLIENT_ID){
    throw new Error("google client id is not available in environment varibale")
}

if(!process.env.GOOGLE_CLIENT_SECRET){
    throw new Error("google client secret is not available in environment varibale")
}

export const config = {
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URL: process.env.MONGO_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
}
