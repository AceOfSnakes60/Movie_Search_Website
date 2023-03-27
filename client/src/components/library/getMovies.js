async function getMoviesFromApi() {
    const response = await fetch("http://localhost:8000/api/movies/")
    const movies = await response.json();
    return movies;
}

async function getMoviesByType(type){
    const response = await fetch(`http://localhost:8000/api/movies/${type}`)
return await response.json();
}

async function getMoviesBySearch(query){
    query = query.replace(" ", "%20");
    const response = await fetch(`http://localhost:8000/api/movies/find/${query}`)
return await response.json();
}
export {getMoviesFromApi, getMoviesByType, getMoviesBySearch};