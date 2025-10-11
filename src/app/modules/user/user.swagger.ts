export const userSwaggerDocs = {
    "/api/user/update-profile": {
        patch: {
            tags: ["User"],
            summary: "Update user profile",
            description:
                "Updates the authenticated user's profile information, including optional profile image upload. Accessible by both ADMIN and USER roles.",
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                image: {
                                    type: "string",
                                    format: "binary",
                                    description: "Optional profile image file",
                                },
                                data: {
                                    type: "string",
                                    description:
                                        "JSON string containing user profile update data (validated by `user_validations.update_user`)",
                                    example: JSON.stringify({
                                        name: "John Doe",
                                        email: "john.doe@example.com",
                                        phone: "+8801787654321",
                                        address: "Dhaka, Bangladesh",
                                    }),
                                },
                            },
                            required: ["data"],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "User profile updated successfully",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "Profile updated successfully" },
                                    data: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string", example: "64b2e1b9d1234f0012ab5678" },
                                            name: { type: "string", example: "John Doe" },
                                            email: { type: "string", example: "john.doe@example.com" },
                                            phone: { type: "string", example: "+8801787654321" },
                                            image: {
                                                type: "string",
                                                example: "/uploads/users/profile_64b2e1b9.png",
                                            },
                                            role: { type: "string", example: "USER" },
                                            updatedAt: {
                                                type: "string",
                                                example: "2025-10-10T10:00:00Z",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: { description: "Bad Request — Validation failed or invalid JSON format" },
                401: { description: "Unauthorized — must be logged in as ADMIN or USER" },
            },
        },
    },
};
