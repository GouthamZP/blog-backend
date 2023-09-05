/**
 * load all config env variables.
 * should be at the top so that all the modules can access it.
*/
import { config } from "dotenv";
config();


// 3rd party
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import { middlewares } from "./middlewares";
import { controllers } from "./controllers";
import { models } from "./models";
import { StatusCodes } from "http-status-codes";

const PORT = process.env.PORT as unknown as number;
const MONGO_DB_URI = process.env.MONGO_DB_URI as string;        


const main = async () => {
    try {        
        // setup database connection
        await mongoose.connect(MONGO_DB_URI);
        console.log("Connected to mongoDB.");
        mongoose.connection.useDb("blog");


        const app = express();
        // 3rd party middlewares
        app.use(cors());
        app.use(express.json());
        app.use(cookieParser());
        app.use(morgan("common"));
        // 3rd party middlewares
        
        /**
         * controllers
         */
        app.get("/auth/showme", middlewares.authenticate, async (req, res, next) => {
            const user = await models.User.findById(req.user.id);
            return res.status(StatusCodes.OK).json(user?.toObject());
        });
        // Auth routes.
        app.post("/auth/register", controllers.register);
        app.post("/auth/login", controllers.login);
        app.get("/auth/logout", middlewares.authenticate, controllers.logout);
        // Blog routes(CRUD).
        app.post("/blogPosts", middlewares.authenticate, controllers.createBlog);
        app.get("/blogPosts", middlewares.authenticate, controllers.readBlogs);
        app.get("/blogPosts/:id", middlewares.authenticate, controllers.readSingleBlog);
        app.patch("/blogPosts/:id", middlewares.authenticate, controllers.updateBlog);
        app.delete("/blogPosts/:id", middlewares.authenticate, controllers.deleteBlog);
        

        /**
         * controllers
        */        
        app.use(middlewares.notfound);
        app.use(middlewares.errorHandler);
        
        
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}.`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }    
}

main();
