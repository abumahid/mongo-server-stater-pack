import { z } from "zod";

const update_user = z.object({
    name: z.string().optional(),
    photo: z.string().optional(),
    address: z.object({
        location: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        postCode: z.string().optional(),
        country: z.string().optional(),
        timeZone: z.string().optional(),
    }).optional()
})

export const user_validations = {
    update_user
}