import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    plan: {
      type: String,
      enum: ["free", "pro"],
      default: "free",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    logo: {
      type: String,
      default: "", // URL of the logo
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export default mongoose.model("Tenant", tenantSchema);