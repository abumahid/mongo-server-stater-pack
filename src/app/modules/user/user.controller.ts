import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { user_services } from "./user.service";
import httpStatus from 'http-status';

const update_profile = catchAsync(async (req, res) => {
    const result = await user_services.update_profile_into_db(req)
    manageResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Profile update successful.",
        data: result
    })
})


export const user_controllers={
    update_profile
}