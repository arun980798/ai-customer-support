import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import tenantModel from '../models/tenant.model.js';
import { config } from '../config/config.js';

async function checkToken(user, res, message) {
    const token = jwt.sign(
        { id: user._id, tenantId: user.tenantId }, 
        config.JWT_SECRET, 
        { expiresIn: '7d' }
    );

    res.cookie('token', token)

    return res.status(200).json({
        message,
        success: true,
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId
        }
    });
}

export const register = async (req, res) => {
    const { username, email, password, role = 'customer', companyName, tenantId } = req.body;

    let finalTenantId;

    try {
        // Check if user already exists
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Handle admin registration - create new tenant
        if (role === "admin") {
            if (!companyName) {
                return res.status(400).json({ message: "Company name required for admin registration" });
            }

            const tenant = await tenantModel.create({
                companyName
            });
            finalTenantId = tenant._id;
        }

        // Handle customer registration - use existing tenant
        if (role === "customer") {
            if (!tenantId) {
                return res.status(400).json({ message: "Tenant ID required for customer registration" });
            }

            const tenantExists = await tenantModel.findById(tenantId);
            if (!tenantExists) {
                return res.status(404).json({ message: "Company not found" });
            }
            finalTenantId = tenantId;
        }

        // Create user with role and tenantId
        const user = await userModel.create({
            username,
            email,
            password,
            role,
            tenantId: finalTenantId
        });

        await checkToken(user, res, "User registered successfully");

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: "Server error during registration" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({email})

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        await checkToken(user, res, "User logged in successfully");

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: "Server error during login" });
    }
};

export const googleCallback = async (req,res)=>{
    const{emails , id, displayName, photos} = req.user
    const email = emails[0].value
    const photo = photos[0].value

    let user = await userModel.findOne({email})

    if(!user){
        let user = await userModel.create({
            email,
            username: displayName,
            googleId: id
        })

        const token = await jwt.sign({id: user._id}, config.JWT_SECRET ,{expiresIn: '7d'})

        res.cookie('token', token)

        res.redirect('http://localhost:5173/')
    }
    res.redirect('http://localhost:5173/')

}

export const getCompanies = async (req, res) => {
  try {
    const companies = await tenantModel.find()
      .select("_id companyName") 
      .sort({ createdAt: -1 });

    res.json(companies);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




