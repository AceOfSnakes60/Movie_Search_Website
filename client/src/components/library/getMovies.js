async function getMoviesFromApi() {
    const movies = await fetch("http://localhost:8000/api/movies/")
        .then(response=>response.json())
        .then(data=>{
            return data;
        })
    return movies.results;
}

const getMoviesByType = (type)=>{
    const movies = fetch(`http://localhost:8000/api/movies/${type}`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        return data;
    })
return movies.results;
}

export {getMoviesFromApi, getMoviesByType};