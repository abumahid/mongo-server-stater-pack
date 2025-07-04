import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const user_schema = new Schema<TUser>({
    name: { type: String, required: true },
    photo: { type: String, required: false },
    accountId: { type: String, required: false, ref: "account" },
    address: {
        location: { type: String },
        city: { type: String },
        state: { type: String },
        postCode: { type: String },
        country: { type: String },
        timeZone: { type: String }
    }
}, {
    versionKey: false,
    timestamps: true
})


export const User_Model = model("user", user_schema)