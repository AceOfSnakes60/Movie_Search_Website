import React from 'react'
import { useState, useEffect } from 'react'
import { getMovieDetails, getMovieReviews } from './library/getMovies'
import { useParams } from 'react-router-dom';
import { SearchBar } from './Search'
import Button from 'react-bootstrap/Button'
import './Details.css'


function Details() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState();
    const [movieReviews, setMovieReviews] = useState();
    const [user, setUser] = useState({ favorites: [] })
    const [buttonLabel, setButtonLabel] = useState("Add to favorites");
    const storedData = localStorage.getItem('userInfo');
    const userData = JSON.parse(storedData);
    const [castList, setCastList] = useState();


    useEffect(() => {
        getMovieDetails(id)
            .then(data => {
                setMovieDetails(data);
            })
        getMovieReviews(id)
            .then(data => {
                setMovieReviews(data);
            });
    }, []);

    const getUser = (email) => {
        return fetch(`http://localhost:8000/api/users/${email}`).then(res => res.json());
    };

    useEffect(() => {
        if (userData && userData.email) {
            getUser(userData.email).then(data => setUser(data.Data))
        }
    }, [])


    async function AddToFavorites(e) {
        const updatedUser = {
            ...user,
            favorites: [...user.favorites, { id: movieDetails.id, poster_path: movieDetails.poster_path }]
        };

        setUser(updatedUser);

        const response = await fetch(`http://localhost:8000/api/users/${updatedUser._id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        });

        response.ok ? setButtonLabel("Delete") : console.log("error");
    }

    async function DeleteFromFavorites() {
        const newFavorites = user.favorites.filter(fav => fav && fav.id !== movieDetails.id);
        const updatedUser = {
            ...user,
            favorites: newFavorites
        };

        setUser(updatedUser);

        const response = await fetch(`http://localhost:8000/api/users/${updatedUser._id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        });

        response.ok ? setButtonLabel("Add to favorites") : console.log("error");
    }


    useEffect(() => {
        const hasMovie = user.favorites.some(fav => fav && fav.id === movieDetails?.id);
        setButtonLabel(hasMovie ? "Delete" : "Add to favorites");
    }, [user.favorites, movieDetails?.id]);



    return (
        <div className='moviePage'>
            <div><SearchBar /></div>   
            <div className='movieDeets'>
                {movieDetails !== undefined &&<div className='movie'>
                    <div className='column-1'>                
                    <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}/>
                    {userData &&
                            <Button
                                type='submit'
                                variant="primary"
                                size="lg"
                                active
                                onClick={buttonLabel === "Add to favorites" ? AddToFavorites : DeleteFromFavorites}>
                                {buttonLabel}
                            </Button>}
                            </div>
                        <div className='movie-content'>
                                <h1 className='title'>{movieDetails.title}</h1>
                                <p className='tagline'>{movieDetails.tagline}</p>
                                <p className='date'>{movieDetails.release_date}</p>
                                <div className='genres'>{movieDetails.genres.map(genre=>{return(<p>{genre.name}</p>);})}</div>
                                <p className='description'>{movieDetails.overview}</p>
                                <p className='revenue'>Revenue: {movieDetails.revenue}</p>
                                <p className='runtime'>Runtime: {movieDetails.runtime} minutes</p>
                                <p className='budget'>Budget: {movieDetails.budget}</p>
                                
                    </div></div>}
            </div>
            {castList !== undefined && <div className='castList'>

            </div>}
            <div className='reviews'>{movieReviews !== undefined && movieReviews.results.map((review) => {
                return (
                    <div className='review'>
                        <h3>{review.author}</h3>
                        <p>{review.content}</p>
                        <p>{review.created_at}</p>
                    </div>);
            })}
            </div>
        </div>
    )
}

export { Details };