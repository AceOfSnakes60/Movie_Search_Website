
import { getMoviesFromApi, getMoviesByType, getMoviesBySearch, getPeopleBySearch } from './library/getMovies'
import React from 'react';
import { useState, useEffect } from 'react'
import { SearchBar } from './Search'
import { useNavigate } from 'react-router';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRankingStar, fa1, fa2, fa3, fa4, fa5} from '@fortawesome/free-solid-svg-icons'
import startColor from '../images/starColor.png'
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
    const handleClick = (id) => {

        navigate(`/movie/${id}`, { replace: true })
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

    useEffect(() => {
        getMoviesFromApi().then(movies => setDiscoverMovies(movies)).catch(err => console.error(err))
        getMoviesByType("upcoming").then(movies => setUpcomingMovies(movies)).catch(err => console.error(err))
        getMoviesByType("topRated").then(movies => setHighestRated(movies)).catch(err => console.error(err))
    }, []);


    const handleSelectChange = (event) => {
        if (event.target.value === 'movies') {
            setShowSearch('movies');
        } else if (event.target.value === 'actors') {
            setShowSearch('actors');
        }
    };

    return (
        <div>
            {upcomingMovies &&
    <Carousel className="upcomingMovie">{upcomingMovies.results.map((movie, index) => (
            <Carousel.Item key={index} interval={2800} style={{ 
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                backgroundSize: 'cover' ,
                backgroundBlendMode: 'multiply'
              }}>
                <div onClick={() => handleClick(movie.id)}>
                    <div className='moviePreview'>
                    <img
                        className="poster"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <h5>{movie.release_date}</h5>
                    </div>
                </div>
            </Carousel.Item>
        ))}
    </Carousel>
}

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
            </div>
            <div>
                <SearchPeopleResults people={foundPeople} />

            </div>
            <div className="upcoming">
                <hr style={{ width: "80%" }} />
                {discoverMovies &&
                    <div className="randomMovie">
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <FontAwesomeIcon icon={faRankingStar} size="2xl" />
                                <Card.Title>{discoverMovies.results[7].title}</Card.Title>
                                <Card.Text>
                                    {discoverMovies.results[7].overview}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleClick(discoverMovies.results[7].id)}>Check</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <FontAwesomeIcon icon={faRankingStar} size="2xl" />
                                <Card.Title>{discoverMovies.results[8].title}</Card.Title>
                                <Card.Text>
                                    {discoverMovies.results[8].overview}
                                </Card.Text>
                                <Button variant="primary">Check</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <FontAwesomeIcon icon={faRankingStar} size="2xl" />
                                <Card.Title>{discoverMovies.results[10].title}</Card.Title>
                                <Card.Text>
                                    {discoverMovies.results[10].overview}
                                </Card.Text>
                                <Button variant="primary">Check</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <FontAwesomeIcon icon={faRankingStar} size="2xl" />
                                <Card.Title>{discoverMovies.results[3].title}</Card.Title>
                                <Card.Text>
                                    {discoverMovies.results[3].overview}
                                </Card.Text>
                                <Button variant="primary">Check</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <FontAwesomeIcon icon={faRankingStar} size="2xl" />
                                <Card.Title>{discoverMovies.results[14].title}</Card.Title>
                                <Card.Text>
                                    {discoverMovies.results[14].overview}
                                </Card.Text>
                                <Button variant="primary">Check</Button>
                            </Card.Body>
                        </Card>
                    </div>
                }
                <hr style={{ width: "80%" }} />
                <div className="highestRated">
                    <h1>TOP 5 MOVIES</h1>
                    <div>{highestRated !== undefined && <ShowHighestRated movie={highestRated.results} index={0} number={fa1}/>}</div>
                    <div>{highestRated !== undefined && <ShowHighestRated movie={highestRated.results} index={1} number={fa2}/>}</div>
                    <div>{highestRated !== undefined && <ShowHighestRated movie={highestRated.results} index={2} number={fa3}/>}</div>
                    <div>{highestRated !== undefined && <ShowHighestRated movie={highestRated.results} index={3} number={fa4}/>}</div>
                    <div>{highestRated !== undefined && <ShowHighestRated movie={highestRated.results} index={4} number={fa5}/>}</div>
                </div>
            </div>
        </div >
    )
}

// function ShowDiscoverMovies(props) {
//     return (
//         <div>
//             <h1 className='randomMovieText'>{props.movie.title}</h1>
//         </div>
//     )
// }
// function ShowUpcomingMovies(props) {

//     return (
//         <div>
//             <h1 className='randomMovieText'>{props.movie.title}</h1>
//             <h1 className='randomMovieText'>{props.movie.release_date}</h1>
//         </div>
//     )
// }


function ShowHighestRated(props) {
    return (
        <div className='highestRated-card'>
            <FontAwesomeIcon icon={props.number} beat size="2xl" />
            <div className='cloumn-1'>
                <h2>{props.movie[props.index].title}</h2>
                <h3>{props.movie[props.index].release_date}</h3>
                <h2>{props.movie[props.index].vote_average}</h2>
                <img src={startColor}/>
            </div>
            <img src={`https://image.tmdb.org/t/p/w500${props.movie[props.index].poster_path}`} alt="top-movies" />
        </div>)
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