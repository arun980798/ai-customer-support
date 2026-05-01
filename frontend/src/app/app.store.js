import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import consumerReducer from "../features/consumer/consumer.slice";
import adminsReducer from "../features/admins/admins.slice";
import homepageReducer from "../features/homepage/homepage.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        consumer: consumerReducer,
        admins: adminsReducer,
        homepage: homepageReducer,
    }
})
