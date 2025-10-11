import path from "path";
import { configs } from "./app/configs";
import { authSwaggerDocs } from "./app/modules/auth/auth.swagger";
import { userSwaggerDocs } from "./app/modules/user/user.swagger";


export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Doc - Team Virevo",
            version: "1.0.0",
            description: "Express API with auto-generated Swagger docs",
        },
        paths: {
            ...authSwaggerDocs,
            ...userSwaggerDocs,
        },
        servers: configs.env === "production" ? [
            { url: "https://live-url.com" },
            { url: "http://localhost:5000" },
        ] : [
            { url: "http://localhost:5000" },
            { url: "https://live-url.com" },
        ],
        components: {
            securitySchemes: {
                AuthorizationToken: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                    description: "Put your accessToken here ",
                },
            },
        },
        security: [
            {
                AuthorizationToken: []
            },
        ],
    },
    apis: [
        path.join(
            __dirname,
            configs.env === "production" ? "./**/*.js" : "./**/*.ts"
        ),
    ],
};
