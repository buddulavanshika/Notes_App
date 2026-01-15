import React, { useState,useEffect } from 'react'
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import Navbar from '../components/Navbar.jsx';
import NoteCard from '../components/NoteCard.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import api from "../lib/axios.js";;


//NoteCard component is imported to display each note in a card format
//Notecard component is in this Hopepage 


const HomePage = () => {
  const [isRateLimited, setIsRateLimited]=useState(true);
  //fetch the states
  const [notes, setNotes]=useState([]); //empty array initially
  //setnotes is the function to update the notes state, it is called when we fetch the notes from the backend, 
  // it is a setter function
  //notes has the list of notes fetched from the backend
  //so we need to use it while deleting a note, after deleting we need to update the notes state to remove the deleted note from the list

  const [loading, setLoading]=useState(true); //loading state, as soon as we load the homepage we set loading to true
  
  console.log("component rendered"); //to check how many times the component is rendered
  //initially the component is rendered once, then when the notes state is updated after fetching the data from the backend, the component is re rendered
  //then useeffect is called again but since we have passed an empty array as the second argument, it will not run again
  useEffect(()=>{ //useeffect to fetch the notes from the backend when the component mounts
    //useeffect means run this function when the component mounts
    //run only once when the component mounts, so we pass an empty array as the second argument
    //run it only once when the page loads
  
    //fetch notes from backend
    const fetchNotes=async()=>{
      try{
        const res=await api.get('/vanshika');
      console.log(res.data);
      setNotes(res.data); //set the notes state with the fetched data
      setIsRateLimited(false); //not rate limited anymore as we are getting the data

      }catch(error){
        console.error('Error fetching notes:', error);
        if(error.response.status===429){
          setIsRateLimited(true); //if rate limited set to true
        }else{
          toast.error("Failed to fetch notes");
        }
      }finally{
        setLoading(false); //either we fetched the data successfully or got some errors, we stop the loading
      }
    };
    console.log("Fetching notes from backend");
    console.log("useeffect running");
    fetchNotes();
  },[]);
  return (
    <div>
    <Navbar />
     {isRateLimited && <RateLimitedUI />}
     {/*display the notes only when not rate limited and loading is false*/}
     <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-pretty py-25">Loading notes...</div>}
        {/*if its true, then we can see the Loading notes..., but if its false and loading we dont see it, it just disappears*/}
        

        {/*if there are no notes in the database, we will display another component*/}
        {loading && notes.length===0 && !isRateLimited && <NoteNotFound />}


        {/*display notes only when we have notes and not rate limited*/}
        {/*once we fetch the notes successfully, we set isRateLimited to false*/}
        {notes.length>0 && !isRateLimited &&(
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/*small screen then grid cols 1, medium screen grid cols 2, large screen grid cols 3*/ }
            {notes.map((note)=>(
              <NoteCard key={note._id} note={note} setNotes={setNotes} /> //pass the setNotes function as a prop to the NoteCard component so that we can update the notes state when we delete a note
            /* {{note.title} 
                {note.content}}
                this is the simple ui, instead of this we will use a seperate component that we created, i.e the notecard commponent */
              
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage