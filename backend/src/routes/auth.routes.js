import { Router } from "express";
import { register, login, googleCallback, getCompanies } from "../controllers/auth.controller.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import passport from "passport";
import { authenticateAdmin } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", authenticateAdmin, registerValidator, register);
authRouter.post("/login", loginValidator, login);
authRouter.get('/getcompanies',getCompanies)

// Google OAuth routes
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/' }), googleCallback);

export default authRouter;
