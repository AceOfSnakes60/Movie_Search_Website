import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
import fetch from 'node-fetch';
import apiParams from "./apiParams.json" assert {type: "json"}
import router from './routes/userRouters.js';
const API_URL = 'https://api.themoviedb.org/3/';
const API_PATH = 'https://api.themoviedb.org/3/movie/76341?api_key=';
const API_KEY = "adeabbf238b9fddf9592359157ae31cb"

app.use(cors());
app.use(express.json())


const port = 8000;


function getApiEndpoint(params){

    return `${API_URL+params.PATH}?api_key=${API_KEY}${(Object.keys(params.PARAMS)).map((key)=>{   return  `&${key}=${params.PARAMS[key]}`   })}`
}

app.get('/', (req,res) => {
    //res.json('...')
    fetch(API_PATH+API_KEY)
    .then(response=>response.json())
    .then((data)=>res.send(data));
})

app.get('/api/movies', (req, res)=>{
    const endpoint = getApiEndpoint(apiParams.discover);
    fetch(endpoint)
    .then(response=>response.json())
    .then((data)=>res.send(data));
})

app.get('/api/movies/:id', (req, res)=>{
    const endpoint = getApiEndpoint(apiParams[req.params.id]);
    fetch(endpoint)
    .then(response=>response.json())
    .then((data)=>res.send(data));
})

app.get('/api/movies/find/:id', (req, res)=>{
    const params = apiParams["find"];
    params.PARAMS.query = req.params.id;
    const endpoint = getApiEndpoint(params);
    fetch(endpoint)
    .then(response=>response.json())
    .then((data)=>res.send(data));
})

app.use('/api/users', router)

app.listen(port, () => {console.log(`http://localhost:${port}`)});