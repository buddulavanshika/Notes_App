import mongoose from "mongoose";
//1. create a schema
//2. create a model from the schema

const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
        },
    },
    {timestamps:true} //another option object- creatAt and updatedAt
);

//now that we created schema we need to create a model
const Note=mongoose.model("Note",noteSchema);
export default Note;
//model is a class that we can use to create and read documents from the notes collection in mongodb    
//create a note model based on this model, every note will have a title, content feild and the timestamp will be saved
