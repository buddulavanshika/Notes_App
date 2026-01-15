import React, { useEffect, useRef } from 'react';
import {useState} from 'react'
import { useNavigate,useParams } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import api from "../lib/axios.js";
import {LoaderIcon} from 'lucide-react';
import {Link} from 'react-router';
import {ArrowLeftIcon, Trash2Icon} from 'lucide-react';


const NoteDetailPage = () => {
  const [note,setNote]=useState(null); //initially it is null, we will fetch this from tthe api
  const [loading,setLoading]=useState(true); //loading state while fetching the note details
  const [saving,setSaving]=useState(false); //saving state while updating the note details
  const toastShownRef = useRef(false); //ref to prevent toast from showing twice
    
  const navigate=useNavigate(); //to navigate to other pages programmatically
    

  //we will basically have the note's id in the url as a route parameter
  //we will use a hook to get the id from the url
  const {id}=useParams(); //destructure the id from the useParams hook
  //here it is {id} as we have defined the route as /note/:id in the App.jsx file
  console.log({id}); //here i am wrapping the id in an object so that it is easier to see in the console

  //in order to fetch the note details from the backend we will use useEffect
  //useEffect is mainly used to perform side effects in functional components
  //side effects can be data fetching, subscriptions, or manually changing the DOM in React components
  //we will use useEffect to fetch the note details from the backend when the component mounts
  //here the functional component mounts means when the NoteDetailPage component is rendered for the first time, the functional component is the NoteDetailPage itself
  //so when the user navigates to the /note/:id route, the NoteDetailPage component is rendered for the first time
  //so we will fetch the note details from the backend when the component mounts using useEffect. After the page is mounted the details are fetched and displayed
  //after fetching the details we will set the loading state to false as the data is fetched
  //we will also handle the error case if there is an error while fetching the note details from the backend
  //whenever the id changes we will refetch the note details from the backend
  useEffect(()=>{
    const fetchNote=async()=>{
      try{
        const res=await api.get(`vanshika/${id}`); //make the api call to fetch the note details from the backend
        setNote(res.data); //set the note state with the fetched data, the data is in res.data
        //we set the note with the fetched data so that we can display it in the ui
        if(!toastShownRef.current){
          toast.success("Note details fetched successfully",{
            duration:3000,
            icon:"🦢",
          });
          toastShownRef.current = true;
        }
      }catch(error){
        console.error("Error fetching note details: ",error);
        toast.error("There was an error fetching the note details",{
          icon:"😥",
        });
      }finally{
        setLoading(false); //set loading to false after fetching the data or getting an error
      }
    }
    toastShownRef.current = false; //reset ref when id changes
    fetchNote();
  },[id])
  //here i will console log the note itself to see the fetched data
  console.log("fetched note details: ",note);
  //handle the loading part
  //if loading is true we will show a loading spinner
  //it will be visible when the user navigates to the note detail page and the data is being fetched from the backend
  //it will be seen for a short duration as the data is fetched quickly
  //when the user clicks on a note from the homepage to see the details of the note then the loading spinner will be seen and once the data is fetched the details will be displayed
  if(loading){
    return(
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="size-6 animate-spin" />
      </div>
    )
  }

  //handle the delete functionality to delete the note
  const handleDelete=async()=>{
    if(!window.confirm("Are you sure you want to delete this note?")){
      return;
    }
    try{
      await api.delete(`/vanshika/${id}`); //make the delete api call to delete the note with the given id
      toast.success("Note deleted successfully",{
        duration:3000,  
        icon:"🍂"
        });
        navigate("/"); //navigate to the homepage after deleting the note,
    }catch(error){
      console.error("Error deleting the note: ",error);
      toast.error("There was an error deleting the note",{
        icon:"😥"
        });
        } 
      }

  //handle the save functionality to update the note details
  const handleSave=async()=>{
    if(note.title.trim()==="" || note.content.trim()===""){
      toast.error("Title and content cannot be empty",{
        icon:"⚠️",
      });
      return;
    }
    setSaving(true); //set saving to true when the user clicks on the save button
    try{
      await api.put(`/vanshika/${id}`,{
        title:note.title,
        content:note.content,
      }); //make the put api call to update the note details
      toast.success("Note updated successfully",{
        duration:3000,
        icon:"🦋",
      }); 
      navigate("/"); //navigate to the homepage after updating the note details
    }catch(error){  
      console.error("Error updating the note: ",error);
      toast.error("There was an error updating the note",{
        icon:"😥",
      });
    }finally{
      setSaving(false); //set saving to false after the update is complete
      //this will enable the save button again and the user can click on it again to save further changes
    }
  }

  return (
      <div className='min-h-screen bg-base-200'>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl max-auto">
          <div className='flex items-center justify-between mb-6'>
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className='h-5 w-5'/>
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn  btn-error btn-outline">
              <Trash2Icon className="h-5 w-5"/>
              Delete the note
            </button>
          </div>
          <div className="card bg-base-100 ">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })} 
                />
                {/* ...note means we are copying all the other fields of the note object as it is and only updating the title field with the new value from the input field */}
                {/*update only the title field of the note object keeping the other fields same using the spread operator */}
            </div>
            
            <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Note content"
                  className="textarea textarea-bordered h-40"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
                {/*update only the content field of the note object keeping the other fields same using the spread operator */}
                {/* ...note means we are copying all the other fields of the note object as it is and only updating the content field with the new value from the textarea field */}
            </div>

            <div className="card-actions justify-end">
              <button onClick={handleSave} className="btn btn-primary" disabled={saving}>
                {saving ? "Saving...":"Save Changes"} 
                {/*if saving is true show Saving... else show Save Changes */}
                {/* this is to give feedback to the user that the changes are being saved */}
                {/* disable the button while saving to prevent multiple clicks */}
                {/* initially saving is false, when the user clicks on the save button we will set saving to true and after the save is complete we will set it back to false */}
              </button>
            </div>

          </div>
          </div>
        </div>
      </div>
      </div>
    )
}

export default NoteDetailPage
