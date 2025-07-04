import { model, Schema, Types } from "mongoose";
import { TAccount } from "./auth.interface";


const authSchema = new Schema<TAccount>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    lastPasswordChange: { type: String },
    isDeleted: { type: Boolean, default: false },
    status: { type: String, default: "ACTIVE" },
    role: { type: String, default: "USER" },
    isVerified: { type: Boolean, default: false }
}, {
    versionKey: false,
    timestamps: true
});


export const Account_Model = model("account", authSchema)