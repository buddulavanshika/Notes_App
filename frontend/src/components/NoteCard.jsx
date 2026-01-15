import React from 'react'
import {Link} from 'react-router';
import { PenSquare, Trash2Icon } from 'lucide-react';
import {formatDate} from "../lib/utils";
import toast from 'react-hot-toast';
import api from '../lib/axios.js';



const NoteCard=({note,setNotes})=> {
    //delete function to delete the note when the delete button is clicked
    const handleDelete=async(e,id)=>{
        e.preventDefault(); //prevent the default behaviour of the link
        //to get rid of the navigation behavior as we are using Link component to navigate to the note detail page
        console.log("deleting note with id: ",id);
        //make an api call to delete the note
        //...
        if (!window.confirm("Are you sure you want to delete this note?")){  //confirm before deleting, if user clicks cancel means not deleting
            return;
        }
        //make the delete api call here if when the user confirms to delete
        try{
            await api.delete(`/vanshika/${id}`); //call the delete endpoint of the backend to delete the note with the given id
            setNotes((prev)=>prev.filter((note)=>note._id !==id)); //update the notes state by filtering out the deleted note
            //get everything except the current note with this id
            toast.success("Note deleted successfully",
                {
                    duration:3000,
                    icon:"🍂",
                }
            );
        }catch(error){
            console.error("Error deleting note: ",error);
            toast.error("There was an error deleting this note",{
                icon:"😥" ,
            })

        }
    };

    return (
        <Link to={`/note/${note._id}`} className="card bg-base-300 hover:shadow-lg transition-all duration-200 border-t-5 border-l-orange-950 border-[#FFA500]">
            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70">{note.content}</p>
                <div className="card-actions justify-end items-center mt-4">
                    <span className="badge badge-outline">{formatDate(new Date(note.createdAt))}</span>
                    <div className="flex items-stretch gap-1">
                        <button className="btn btn-ghost btn-sm text-pretty">
                            <PenSquare className="size-4" /> {/*this is the edit icon from lucide-react, clicking on this will take you to the edit page for the note which is the noteDetail page*/}
                        </button>
                        <button className="btn btn-ghost btn-sm text-error" onClick={(e)=>handleDelete(e,note._id)}>  {/*pass the note id to the handle delete function*/}
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default NoteCard;
