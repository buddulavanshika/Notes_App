//get every single node, if no node in the database we ll get an empty array
import Note from "../models/Note.js";

export async function getNote(req,res){
    try{
        // const notes=await Note.find() //find() is a mongoose method to get all the documents from the notes collection
        // //this shows the notes present in the database in the order or creation- first->last
        const notes=await Note.find().sort({createdAt:-1}) //-1 for displaying the notes in the decreasing order of creation- last->first
        res.status(200).json(notes);
    }catch(error){
        console.error("There was an error fetching the note:",error);
        res.status(500).json({message:"Internal server error"});
    }
};

//get a single note by id
//if note with the given id is not found, send 404 status code with message
//if found send 200 status code with the note
//if there is an error while fetching the note, send 500 status code with message
//we get the id from req.params.id
//we use Note.findById() method to find the note by id, where Note is the model we created in models/Note.js
//we also log the error to the console for debugging purposes

export async function getNoteById(req,res){
    try{
        const noteCurrent=await Note.findById(req.params.id);
        if(!noteCurrent){
            return res.status(404).json({message:"Note by this id is not found"});
        }
        res.status(200).json(noteCurrent);
    }catch(error){
        console.error("There was an error fetching the note:",error);
        res.status(500).json({message:"Internal server error"});
    }
};

//before it was
//export async function createNote(req,res){
// res.status(201).json({message:"note created successsfully"});
//};
//now we add the logic to create a note in the database
//every note will have title and content feilds
//we will get these from the req.body
//we will create a new note using the Note model and save it to the database
//then we will send the saved note as a response
//if there is an error we will send a 500 status code with an error message
//in the catch block
//we will also log the error to the console for debugging purposes
//finally if the note is created successfully we will send a 201 status code with the saved note as a response
//
export async function createNote(req,res){
    try{
        const {title,content}=req.body;   //we are getting this from the request body
        //this is possible due to the middleware we added in server.js app.use(express.json())
        //that parses the json data from the request body
        //by default this is not poossible in express, we cant access them without the middleware
        //now we create a new note using the Note model
        const note=new Note({
            title,content
        })
        //await note.save() is a mongoose method to save the document to the notes collection in mongodb
        //await note.save()
        //res.status(201).json({message:"note created successfully"}); this was before adding the logic to save the note to the database
        //this just prints the message when the note is created successfully
        //in order to send the saved note as a response we need to store the result of await note.save() in a variable
        //and then send that variable as a response
        //so we do this
        const savedNote=await note.save();
        res.status(201).json(savedNote);
    }catch(error){
        console.log("There was an error creating the note:",error);
        res.status(500).json({message:"Internal server error, error in createNode controller"});
    }
     
};
//before it was just function updateNote(res,res){
//res.status(200).json({message:"note updated successfully"})};
//now we add the logic to update a note in the database
//to update we need to copy the id of the note we want to update, use put request to /:id endpoint
//we get the id from req.params.id is used to get the id from the url
//if in notesRoutes we have used the endpoint as /:noteId then we will use req.params.noteId to get the id
//we also need the updated title and content from req.body
//we use Note.findByIdAndUpdate() method to update the note in the database
//here we have used /:id as the endpoint in notesRoutes so we use req.params.id to get the id
//new:true is used to return the updated document
export async function updateNote(req,res){
    try{
        const {title,content}=req.body;
        const updatedNote=await Note.findByIdAndUpdate(
            //in the routes we have defined that put is at /:id so req.params.id, if it was :hello, the req.params.hello
            req.params.id,
            {title,content},
            {
            new:true, //by default findByIdAndUpdate returns the old document, setting new:true returns the updated document
            }
        );
        //check if the note to be updated exists
        //if not send 404 status code with message
        if(!updatedNote){
            return res.status(404).json({message:"Note not found"});
        }
        //if updated successfully send 200 status code with updated note
        return res.status(200).json(updatedNote);
    }catch(error){
        console.log("There was an error updating the note: ",error);
        res.status(500).json({message:"Internal server error"});
    }
};
export async function deleteNote(req,res){
    try{
        const deletedNote= await Note.findByIdAndDelete(
            req.params.id
        )
        if(!deletedNote){
            return res.status(404).json({message:"Note not found to delete"});
        }
        res.status(200).json({message:"Note deleted successfully"});
    }catch(error){
        console.log("There was an error deleting the note: ",error);
        res.status(500).json({message:"Internal server error"});
    }
};