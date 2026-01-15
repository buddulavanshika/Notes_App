//this is the axios instance which we will use to make api calls to the backend
//we do this so we dont have to type the entire url each time we make a request
import axios from 'axios';

const api=axios.create({
    baseURL:"http://localhost:4080/api", //keep only the base url here as when new features are added they can be added easily by specifying in 
})

export default api;