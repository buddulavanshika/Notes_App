import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import path from "path"; //this is already present in nodejs so no need to install it

import { connectdb } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";



dotenv.config();
console.log(process.env.MONGO_URI);
//installed dotenv and used config to correctly use it. This .env will be hidden when the app is deployed and pused to github.

const app=express();

//hide the port on this the app is running in .env file and calling that here
const PORT=process.env.PORT||4080;
const __dirname=path.resolve();
//this __dirname will give the absolute path of the current directory

//CORS middleware
//Cross Origin Resource Sharing
//this cors middleware shuld be in the beginning as we are trying to send back a request from the ratelimiter and frontend 
//but if cors middleware is not added first, it will block the request even before it reaches the ratelimiter middleware
// so always add cors middleware at the top
//this is only for development purpose
if(process.env.NODE_ENV!=="production"){
    app.use(
        cors({
    origin:"http://localhost:5173"  //frontend server url
            })
    );
}

//middleware to parse json data from the request body
app.use(express.json());
//call the ratelimiter middle ware for each incoming request
app.use(rateLimiter);
//adding a middleware using app,use so the frontend can send request to the backend and avoid the cors error

//app.use() method is used to mount the specified middleware function(s) at the path which is being specified
//simple custom middleware function to log the request method and url for each incoming request
app.use((req,res,next)=>{
    console.log("middleware executed, we just got a new request");
    console.log(`request method:${req.method}`);
    console.log(`request url:${req.url}`);
    next(); //to pass the control to the next middleware function
})


//for each req, res we are typing the entire url of the endpoint, instead make itshort by using app.use
app.use("/api/vanshika", notesRoutes);  //we are telling that for every request coming to /api/vanshika use notesRoutes
//prefixing the routes and mapping the requestes defined in notesRoutes.js
//its a quick way to modularize the code
//it keeps the code clean and organized
// “If the URL starts with /api/vanshika, send the request to notesRoutes.”

// ✅ The request starts with /api/vanshika
// ➡️ So Express forwards the request to notesRoutes

// 📌 Nothing else happens here — no GET, POST, PUT yet.


//middleware
if(process.env.NODE_ENV==="production"){
    
    //use middleware coming from express
    app.use(express.static(path.join(path.join(__dirname,"../frontend/dist"))));
    //this says serve this a static folder which means all the files present in this folder can be served directly
    //we are joining the current directory with the frontend/dist folder to get the absolute path of the dist folder
    //here we are telling express to serve the static files from the frontend/dist folder
    //whenever there is a request coming to the server for any file present in the dist folder, it will be served directly
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
    });
    //this is a catch all route to serve the index.html file for any request that is not handled by the above routes
    //this is important for single page applications where the routing is handled by the frontend
    //so for any request that is not handled by the backend, we send the index.html file and let the frontend handle the routing
    //we do this when the application is deployed on a platform like render which is serving both frontend and backend together
    //in simple words, the flow is like this:
    //1. request comes to the server
    //2. if the request is for a static file, serve it from the dist folder
    //3. if the request is for an API endpoint, forward it to the respective route handler
    //4. if the request is not handled by any of the above, serve the index.html file and let the frontend handle the routing
    //this way, the frontend can have its own routing and the backend can serve the static files and API endpoints
}


//server listens for the message at port 4080
//connect to database
connectdb().then((()=>{
    //server starts listening only after the database is connected successfully
    app.listen(PORT,()=>{
    console.log("Server is running on port 4080");
    });
}));

// mongodb+srv://buddulavanshika_db_user:zgTAL1LZB1uvMF5p@cluster0.f4765mn.mongodb.net/?appName=Cluster0

//build an api
//build one simple route
// //get request
// app.get("/api/vanshika",(req,res)=>{
//     res.status(200).send("Hello from new backend!, i hope you are doing great"); 
// });
// //post request
// app.post("/api/vanshika",(req,res)=>{
//     res.status(201).send("Hello node is created successfully");
// });

// //put request
// app.put("/api/vanshika/:id",(req,res)=>{
//     res.status(200).json({message:"post is updated successfully"});
// });

// //delete
// app.delete("/api/vanshika/:id",(res,req)=>{
//     res.status(200).json({message:"post is deleted successfully"});
// })
// //patch request
// app.patch("/api/vanshika/:id",(req,res)=>{
//     res.status(200).json({message:"post is patched successfully"});
// });