import { Types } from "mongoose"

export type TUser = {
    name: string,
    photo?: string,
    address?: {
        location?: string,
        city?: string,
        state?: string,
        postCode?: string,
        country?: string,
        timeZone?: string
    },
    accountId?: Types.ObjectId
}