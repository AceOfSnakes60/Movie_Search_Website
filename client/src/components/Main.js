
import {useState, useEffect} from 'react'
import {getMoviesFromApi, getMoviesByType, getMoviesBySearch} from './library/getMovies'
import React from 'react';
// import star from '../images/star.png'
// import starColor from '../images/starColor.png'


function Main() {
    const [discoverMovies, setDiscoverMovies] = useState()
    const [upcomingMovies, setUpcomingMovies]= useState();
    const [highestRated, setHighestRated]= useState();
    const [searchQuery, setSearchQuery]= useState('');
    const [foundMovies, setFoundMovies]= useState();
    const [showSearch, setShowSearch] = useState(false);

    useEffect(()=>{
        getMoviesFromApi().then(movies=>setDiscoverMovies(movies)).catch(err=>console.error(err))
        getMoviesByType("upcoming").then(movies=>setUpcomingMovies(movies)).catch(err=>console.error(err))
        getMoviesByType("topRated").then(movies=>setHighestRated(movies)).catch(err=>console.error(err))
    },[]);

    function findMovies(){
        if(searchQuery.length>0){
        getMoviesBySearch(searchQuery)
        .then(movies=>{
            setFoundMovies(movies);
            });
            setShowSearch(true);
        }
    }
    return(
        <div>
            <div className='search-bar'>
                <input type="search" className="search" placeholder="Search for movies.." onChange={e=>setSearchQuery(e.target.value)} />
                <button onClick={findMovies}>search</button>
        
            </div>
            {(showSearch === true)?
            <div>
        <SearchResults movies={foundMovies}/>
        </div>:
        <div className="main">

            <div className="chooseGenre">
                <button className="genres">action</button>
                <button className="genres">comedy</button>
                <button className="genres">drama</button>
                <button className="genres">sci-fi</button>
            </div>
            <div className="upcoming">
                <h1>Upcoming Movies</h1>
                <div className="upcomingMovie">{upcomingMovies!==undefined&&<ShowUpcomingMovies movie={upcomingMovies.results}/>}
                </div>
                <div className="upcomingMovie">Avatar
                </div>
                <div className="upcomingMovie">Avatar</div>
            </div>
            <div className="randomMovie">
                <div className="randomMovieBlock">{discoverMovies!==undefined&&<ShowDiscoverMovies movie={discoverMovies.results}/>}</div>
                <div className="randomMovieBlock">{discoverMovies!==undefined&&<ShowDiscoverMovies movie={discoverMovies.results}/>}</div>
                <div className="randomMovieBlock">{discoverMovies!==undefined&&<ShowDiscoverMovies movie={discoverMovies.results}/>}</div>
                <div className="randomMovieBlock">{discoverMovies!==undefined&&<ShowDiscoverMovies movie={discoverMovies.results}/>}</div>
            </div>
            <div className="highestRated">
                TOP 5 MOVIES
                <div>{highestRated!==undefined&&<ShowHighestRated movie={highestRated.results}/>}</div>
            </div>
        </div>
        }
        </div>
        
    )
}

function ShowDiscoverMovies(props){
    
    let random = Math.floor(Math.random() * 15)
    return(                 
    <div>
        <h1 className='randomMovieText'>{props.movie[random].title}</h1>
    </div>
    )
}

function ShowUpcomingMovies(props){
    
    let random = Math.floor(Math.random() * 19)
    return(                 
    <div>
        <h1 className='randomMovieText'>{props.movie[random].title}</h1>
        <h1 className='randomMovieText'>{props.movie[random].release_date}</h1>
    </div>
    )
}

function ShowHighestRated(props){
    return(                 
    <div>
        <h1>{props.movie[0].title}</h1>
        <h2>{props.movie[0].release_date}</h2>
        <h2>{props.movie[0].vote_average}</h2>
    </div>
    )
}

function SearchResults(props){

    return(
        <div className='SearchResults'>
            {props.movies!==undefined&&props.movies.results
            .map(movie=>{return(
                <div className='movieCard'>
                    <h3>{movie.title}</h3>
                    <h4>{(movie.release_date).split('-')[0]}</h4>
                </div>
            )})}
        </div>
    )
}

export default Main;

