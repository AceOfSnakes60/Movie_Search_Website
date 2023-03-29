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

async function getPeopleBySearch(query){
    query = query.replace(" ", "%20");
    const people = await fetch(`http://localhost:8000/api/people/findPerson/${query}`)
    .then(async response=>await response.json())
    .then(data=>{
        return data;
    })
return people;
}
export {getMoviesFromApi, getMoviesByType, getMoviesBySearch, getPeopleBySearch};