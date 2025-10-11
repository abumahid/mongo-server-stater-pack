import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";
import globalErrorHandler from './app/middlewares/global_error_handler';
import notFound from './app/middlewares/not_found_api';
import appRouter from './routes';
import { swaggerOptions } from './swaggerOptions';

// define app
const app = express()
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// middleware
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true
}))
app.use(express.json({ limit: "100mb" }))
app.use(express.raw())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/api", appRouter)

// stating point
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running successful !!',
        data: null,
    });
});

// global error handler
app.use(globalErrorHandler);
app.use(notFound);

// export app
export default app;