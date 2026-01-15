import express from "express";
import {getNote,getNoteById, createNote,updateNote,deleteNote} from "../controllers/nodeControllers.js"


const router=express.Router(); //Think of router as a small Express app.
router.get("/",getNote);
router.get("/:id",getNoteById);
router.post("/",createNote);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);
export default router;

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