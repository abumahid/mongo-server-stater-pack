import { z } from "zod";

// Zod schema matching TAccount / authSchema
const register_validation = z.object({
    email: z.string({ message: "Email is required" }).email(),
    password: z.string({ message: "Password is required" }),
    name: z.string({ message: "Name is required" })
});

const login_validation = z.object({
    email: z.string({ message: "Email is required" }),
    password: z.string({ message: "Email is required" })
})

const changePassword = z.object({
    oldPassword: z.string({ message: "Old Password is required" }),
    newPassword: z.string({ message: "New Password is required" })
})

const forgotPassword = z.object({ email: z.string({ message: "Email is required" }) })
const resetPassword = z.object({
    token: z.string(),
    newPassword: z.string(),
    email: z.string()
})
const verified_account = z.object({
    token: z.string({ message: "Token is Required!!" })
})

export const auth_validation = {
    register_validation,
    login_validation,
    changePassword,
    forgotPassword,
    resetPassword,
    verified_account
}