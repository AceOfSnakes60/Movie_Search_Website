
import {useState, useEffect} from 'react'
import {getMoviesFromApi, getMoviesByType} from './library/getMovies'
import React from 'react';


function Main() {
    const [discoverMovies, setDiscoverMovies] = useState()
    const [upcomingMovies, setUpcomingMovies]= useState();
    const [highestRated, setHighestRated]= useState();

    useEffect(()=>{
        //getMoviesFromApi().then(movies=>setDiscoverMovies(movies))
        //getMoviesByType("upcoming").then(movies=>setUpcomingMovies(movies))
        getMoviesByType("topRated").then(movies=>setHighestRated(movies))
    },[]);


    return(
        <div className="main">
            <input type="search" className="search" placeholder="Search for movies.." />
            <div className="chooseGenre">
                <button className="genres">action</button>
                <button className="genres">comedy</button>
                <button className="genres">drama</button>
                <button className="genres">sci-fi</button>
            </div>
            <div className="upcoming">
                <h1>Upcoming Movies</h1>
                <div className="upcomingMovie">Avatar</div>
                <div className="upcomingMovie">Avatar</div>
                <div className="upcomingMovie">Avatar</div>
            </div>
            <div className="randomMovie">
                <div className="randomMovieBlock">TLOU</div>
                <div className="randomMovieBlock">AVENGERS</div>
                <div className="randomMovieBlock">kjefb</div>
                <div className="randomMovieBlock">rbr</div>
            </div>
            <div className="highestRated">
                TOP 5 MOVIES
                <div>{highestRated!==undefined&&<ShowHighestRated movie={highestRated.results}/>}</div>
            </div>
        </div>

    )
}

function ShowHighestRated(props){
    console.log(props);
    return(                 
    <div>
        <h1>{props.movie[0].title}</h1>
        <h2>{props.movie[0].release_date}</h2>
        <h2>{props.movie[0].vote_average}</h2>
    </div>
    )
}

export default Main;

