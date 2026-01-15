import { ArrowLeftIcon } from 'lucide-react';
import React from 'react'
import {useState} from 'react';
import {Link,useNavigate} from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';
import api from "../lib/axios";

const CreatePage = () => {
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate(); //to navigate to other pages programmatically

  const handleSubmit= async (e)=>{
    //prevent the default behaviour of the form submission, dont reload the page
    e.preventDefault();
    // //just log initially to check
    // console.log("Title:",title);
    // console.log("Content:",content);

    //we get rid of this client side validation so that we can see the rate limiting nd the requests can hit the backend directly
    // if(!title.trim() ||!content){
    //   toast.error("Please fill all the fields");
    //   return;
    // } //this validation is to check if the user has provided some values for title and content
    // //this validation ensure that the error returned by backend is not shown to the user
    // //this is basically a meaningful client validation


    //when they provide some values, we set the loading to true
    setLoading(true);
    try{
      await api.post("/vanshika",{
        title,
        content
      });
      toast.success("note created successfully");
      navigate("/"); //navigate to home page after creating the note
      //navigate is used to programmatically navigate to other pages
      //here after creating the note we navigate to the homepage to see the list of notes including the newly created note
    }catch(error){
      console.log("there was an error creating  new note: ",error);
      if(error.response.status===429){
        toast.error("You are creating notes too fast, please sloww down",{
          duration:5000,
          icon:"☠️😒😰",
        })
      }
      else{
        toast.error("Failed to create, please try again");
      }
      
    }finally{
      setLoading(false);
    }

  }
  return (
    <div className="min-h-screen bg-purple-300 p-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto-center  ">
          <Link to="/" className="btn btn-wide mb-6 bg-purple-0">
          <ArrowLeftIcon className="size-5" />
          Back to notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit} >
                <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text"
                 placeholder="Enter note title"
                 className='input input-bordered'
                 value={title}
                 onChange={(e)=>setTitle(e.target.value)}
                 />
                </div>

                <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                 placeholder="Create your note here..."
                 className='textarea textarea-bordered h-40'
                 value={content}
                 onChange={(e)=>setContent(e.target.value)}
                 />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating...":"Create note now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
