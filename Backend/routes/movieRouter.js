import express from 'express';

const router = express.Router();

router.get('/api/movies', (req, res)=>{
    const endpoint = getApiEndpoint(apiParams.discover);
    fetch(endpoint)
    .then(response=>response.json())
    .then((data)=>res.send(data));
})

router.get('/api/movies/:id', (req, res)=>{
    const endpoint = getApiEndpoint(apiParams[req.params.id]);
    fetch(endpoint)
    .then(response=>response.json())
    .then((data)=>res.send(data));
})

router.get('/api/movies/find/:id', (req, res)=>{
    const params = apiParams["find"];
    params.PARAMS.query = req.params.id;
    const endpoint = getApiEndpoint(params);
    fetch(endpoint)
    .then(response=>response.json())
    .then((data)=>res.send(data));
})

app.get('/api/picture/:id', (req, res)=>{
    const endpoint = `https://image.tmdb.org/t/p/w500/${req.params.id}`
    fetch(endpoint)
    .then(response=>response.json())
    .then((data)=>res.send(data));
})
app.get('/api/movies/pictures/:id', (req, res)=>{
    const endpoint = `https://api.themoviedb.org/3/movie/${req.params.id}/images?api_key=${API_KEY}&language=en-US`
    fetch(endpoint)
    .then(response=>response.json())
    .then((data)=>{console.log(data); res.send(data);});
})
app.get('/api/movies/details/:id', (req, res)=>{
    const endpoint = `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${API_KEY}&language=en-US`
        fetch(endpoint)
    .then(response=>response.json())
    .then((data)=>res.send(data));
})

app.get('/api/people/findPerson/:id', (req, res)=>{
    const params = apiParams["findPerson"];
    params.PARAMS.query = req.params.id;
    const endpoint = getApiEndpoint(params);
    fetch(endpoint)
    .then(response=>response.json())
    .then((data)=>res.send(data));
})

app.get('/api/movies/reviews/:id', (req, res)=>{
    const endpoint = `https://api.themoviedb.org/3/movie/${req.params.id}/reviews?api_key=${API_KEY}&language=en-US`
    fetch(endpoint)
.then(response=>response.json())
.then((data)=>res.send(data));
})