
import { useState, useEffect } from 'react'
import { getMoviesFromApi, getMoviesByType, getMoviesBySearch, getPeopleBySearch } from './library/getMovies'
import React from 'react';
import star from '../images/star.png'
import starColor from '../images/starColor.png'


function Main() {
    const [discoverMovies, setDiscoverMovies] = useState()
    const [upcomingMovies, setUpcomingMovies] = useState();
    const [highestRated, setHighestRated] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [foundMovies, setFoundMovies] = useState();
    const [foundPeople, setFoundPeople] = useState();
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        getMoviesFromApi().then(movies => setDiscoverMovies(movies))
        getMoviesByType("upcoming").then(movies => setUpcomingMovies(movies))
        getMoviesByType("topRated").then(movies => setHighestRated(movies))
    }, []);

    function findMovies() {
        if (searchQuery.length > 0) {
            getMoviesBySearch(searchQuery)
                .then(movies => {
                    setFoundMovies(movies);
                    console.log(movies);
                });
            setShowSearch(true);
        }
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
                    <div>
                        <input
                            type='searchMovie'
                            className='search'
                            placeholder='Search for movies..'
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button onClick={findMovies}>search</button>
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
                    <div className="upcomingMovie">{upcomingMovies !== undefined && <ShowUpcomingMovies movie={upcomingMovies.results} />}
                    </div>
                    <div className="upcomingMovie">Avatar
                    </div>
                    <div className="upcomingMovie">Avatar</div>
                </div>
                <div className="randomMovie">
                    <div className="randomMovieBlock">{discoverMovies !== undefined && <ShowDiscoverMovies movie={discoverMovies.results} />}</div>
                    <div className="randomMovieBlock">{discoverMovies !== undefined && <ShowDiscoverMovies movie={discoverMovies.results} />}</div>
                    <div className="randomMovieBlock">{discoverMovies !== undefined && <ShowDiscoverMovies movie={discoverMovies.results} />}</div>
                    <div className="randomMovieBlock">{discoverMovies !== undefined && <ShowDiscoverMovies movie={discoverMovies.results} />}</div>
                </div>
                <div className="highestRated">
                    TOP 5 MOVIES
                    <div>{highestRated !== undefined && <ShowHighestRated movie={highestRated.results} />}</div>
                </div>
            </div>
        </div>

    )
}

function ShowDiscoverMovies(props) {
    console.log(props);
    let random = Math.floor(Math.random() * 15)
    return (
        <div>
            <h1 className='randomMovieText'>{props.movie[random].title}</h1>
        </div>
    )
}

function ShowUpcomingMovies(props) {
    console.log(props);
    let random = Math.floor(Math.random() * 19)
    return (
        <div>
            <h1 className='randomMovieText'>{props.movie[random].title}</h1>
            <h1 className='randomMovieText'>{props.movie[random].release_date}</h1>
        </div>
    )
}

function ShowHighestRated(props) {
    return (
        <div>
            <h1>{props.movie[0].title}</h1>
            <h2>{props.movie[0].release_date}</h2>
            <h2>{props.movie[0].vote_average}</h2>
        </div>
    )
}

function SearchResults(props) {

    return (
        <div className='SearchResults'>
            {props.movies !== undefined && props.movies.results
                .map(movie => {
                    return (
                        <div className='movieCard'>
                            <h3>{movie.title}</h3>
                            <h4>{(movie.release_date).split('-')[0]}</h4>
                        </div>
                    )
                })}
        </div>
    )
}

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

