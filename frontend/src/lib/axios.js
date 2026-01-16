//this is the axios instance which we will use to make api calls to the backend
//we do this so we dont have to type the entire url each time we make a request
import axios from 'axios';


//in production there is no localhost so we have to make it dynamic
const BASE_URL=import.meta.env.MODE==="development"?"http://localhost:4080/api":
"/api"; 
//if in development mode use localhost, else use /api which will be prefixed to the deployed backend url
//this way when we deploy the app both frontend and backend will be deployed together and the requests will go to the correct backend url
//so we just use /api as the base url in production
//import.meta.env.MODE is a special variable provided by Vite to get the current mode of the app
// we just use /api as the base url in prod as the frontend and backend will be deployed together

const api=axios.create({
    // baseURL:"http://localhost:4080/api", //keep only the base url here as when new features are added they can be added easily by specifying in 
    // //this url may not be the one we get in production as in production we will deploy the backend and frontend together
    // //so we should make it dynamic based on the environment
    baseURL:BASE_URL, //set the base url dynamically based on the environment
    })

export default api;