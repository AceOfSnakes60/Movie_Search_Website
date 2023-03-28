const SERVER_PATH = `http://localhost:8000`

async function getMoviesFromApi() {
    const response = await fetch(`${SERVER_PATH}/api/movies/`)
    const movies = await response.json();
    return movies;
}

async function getMoviesByType(type){
    const response = await fetch(`${SERVER_PATH}/api/movies/${type}`)
return await response.json();
}

async function getMoviesBySearch(query){
    query = query.replace(" ", "%20");
    const response = await fetch(`${SERVER_PATH}/api/movies/find/${query}`)
return await response.json();
}

async function getMoviePictures(id){
    const response = await fetch(`${SERVER_PATH}/api/movies/pictures/${id}`)
    return await response.json();
}

async function getMovieDetails(id){
    const response = await fetch(`${SERVER_PATH}/api/movies/details/${id}`)
    return await response.json();
}

export {getMoviesFromApi, getMoviesByType, getMoviesBySearch, getMoviePictures, getMovieDetails};