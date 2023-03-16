async function getMoviesFromApi() {
    const movies = await fetch("http://localhost:8000/api/movies/")
        .then(async response=> await response.json())
        .then(data=>{
            return data;
        })
    return movies;
}

async function getMoviesByType(type){
    const movies = await fetch(`http://localhost:8000/api/movies/${type}`)
    .then(async response=>await response.json())
    .then(data=>{
        console.log(data);
        return data;
    })
return movies;
}

export {getMoviesFromApi, getMoviesByType};