
import { getMoviesFromApi, getMoviesByType, getMoviesBySearch, getPeopleBySearch } from './library/getMovies'

import React from 'react';
import { useState, useEffect } from 'react'

import { SearchBar } from './Search'
import { useNavigate } from 'react-router';
import './Main.css'

function Main() {

    const [discoverMovies, setDiscoverMovies] = useState()
    const [upcomingMovies, setUpcomingMovies] = useState();
    const [highestRated, setHighestRated] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [foundPeople, setFoundPeople] = useState();
    const [showSearch, setShowSearch] = useState(false);


    useEffect(() => {
        getMoviesFromApi().then(movies => setDiscoverMovies(movies)).catch(err => console.error(err))
        getMoviesByType("upcoming").then(movies => setUpcomingMovies(movies)).catch(err => console.error(err))
        getMoviesByType("topRated").then(movies => setHighestRated(movies)).catch(err => console.error(err))
    }, []);
    const navigate = useNavigate();
        const handleClick=(id)=>{

            navigate(`/movie/${id}`, {replace:true})
        }

    function findPeople() {
        if (searchQuery.length > 0) {
            getPeopleBySearch(searchQuery)
                .then(people => {
                    setFoundPeople(people);
                    console.log(people);
                });
                  setShowSearch(true);
        }
    }

    useEffect(()=>{
        getMoviesFromApi().then(movies=>setDiscoverMovies(movies)).catch(err=>console.error(err))
        getMoviesByType("upcoming").then(movies=>setUpcomingMovies(movies)).catch(err=>console.error(err))
        getMoviesByType("topRated").then(movies=>setHighestRated(movies)).catch(err=>console.error(err))
    },[]);


    const handleSelectChange = (event) => {
        if (event.target.value === 'movies') {
            setShowSearch('movies');
        } else if (event.target.value === 'actors') {
            setShowSearch('actors');
        }
    };
    return (
        <div>
            <div className='search-bar'>

                <select onChange={handleSelectChange}>
                    <option disabled selected>What do you want to search</option>
                    <option>movies</option>
                    <option>actors</option>
                </select>
                {showSearch === 'movies' ? (
                    <div className='Search'>
                        <SearchBar />
                    </div>

                ) : showSearch === 'actors' ? (
                    <div>
                        <input
                            type='searchPeople'
                            className='search'
                            placeholder='Search for people..'
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button onClick={findPeople}>search</button>
                    </div>
                ) : null}
                <input type="search" className="search" placeholder="Search for movies.." onChange={e=>setSearchQuery(e.target.value)} />
                <button onClick={findMovies}>search</button>
        
            </div>
            <div>
                <SearchResults movies={foundMovies} />
                <SearchPeopleResults people={foundPeople} />

            </div> 

            <div className="main">

                <div className="chooseGenre">
                    <button className="genres">action</button>
                    <button className="genres">comedy</button>
                    <button className="genres">drama</button>
                    <button className="genres">sci-fi</button>
                </div>
                <div className="upcoming">
                    <h1>Upcoming Movies</h1>

                    {upcomingMovies !== undefined && ((upcomingMovies.results).slice(0, 3)).map((movie)=>{
                    return(<div className="upcomingMovie" onClick={()=>handleClick(movie.id)} ><ShowUpcomingMovies movie={movie}/></div>)}) }  
                </div>
                <div className="randomMovie">
                    <div className="randomMovieBlock">{discoverMovies !== undefined && <ShowDiscoverMovies movie={discoverMovies.results} index={0} />}</div>
                    <div className="randomMovieBlock">{discoverMovies !== undefined && <ShowDiscoverMovies movie={discoverMovies.results} index={1} />}</div>
                    <div className="randomMovieBlock">{discoverMovies !== undefined && <ShowDiscoverMovies movie={discoverMovies.results} index={2} />}</div>
                    <div className="randomMovieBlock">{discoverMovies !== undefined && <ShowDiscoverMovies movie={discoverMovies.results} index={3} />}</div>
                </div>
                <div className="highestRated">
                    TOP 5 MOVIES
                    <div>{highestRated !== undefined && <ShowHighestRated movie={highestRated.results} index={0} />}</div>
                    <div>{highestRated !== undefined && <ShowHighestRated movie={highestRated.results} index={1} />}</div>
                    <div>{highestRated !== undefined && <ShowHighestRated movie={highestRated.results} index={2} />}</div>
                    <div>{highestRated !== undefined && <ShowHighestRated movie={highestRated.results} index={3} />}</div>
                    <div>{highestRated !== undefined && <ShowHighestRated movie={highestRated.results} index={4} />}</div>
                </div>
            </div>
        </div>
    )
}


function ShowUpcomingMovies(props) {

    return (
        <div>
            <h1 className='randomMovieText'>{props.movie.title}</h1>
            <h1 className='randomMovieText'>{props.movie.release_date}</h1>
        </div>
    )
}


function ShowHighestRated(props) {
    return (
        <div>
            <h1>{props.movie[props.index].title}</h1>
            <h2>{props.movie[props.index].release_date}</h2>
            <h2>{props.movie[props.index].vote_average}</h2>


function SearchPeopleResults(props) {

    return (
        <div className='SearchResults'>
            {props.people !== undefined && props.people.results
                .map(person => {
                    return (
                        <div className='movieCard'>
                            <h3>{(person.name)}</h3>
                            <h4>{(person.popularity)}</h4>
                        </div>
                    )
                })}

        </div>
    )
}

export default Main;