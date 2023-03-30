import React from 'react'
import { useState, useEffect } from 'react'
import { getMovieDetails, getMovieReviews } from './library/getMovies'
import { useParams } from 'react-router-dom';
import { SearchBar } from './Search'
import Button from 'react-bootstrap/Button'

function Details() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState();
    const [movieReviews, setMovieReviews] = useState();
    const [user, setUser] = useState({ favorites: [] })
    const [buttonLabel, setButtonLabel] = useState("Add to favorites");
    const storedData = localStorage.getItem('userInfo');
    const userData = JSON.parse(storedData);


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
        return fetch(`http://localhost:8000/api/users/${email}`).then(res => res.json())
    }

    useEffect(() => {
        getUser(userData.email).then(data => setUser(data.Data))
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
        <div>
            <div><SearchBar /></div>
            <div>
                {movieDetails !== undefined &&
                    <div style={{ backgroundImage: `https://image.tmdb.org/t/p${movieDetails.backdrop_path}` }}>
                        <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt="Movie Poster" />
                        {userData &&
                            <Button
                                type='submit'
                                variant="primary"
                                size="lg"
                                active
                                onClick={buttonLabel === "Add to favorites" ? AddToFavorites : DeleteFromFavorites}>
                                {buttonLabel}
                            </Button>}
                        <h2>{movieDetails.title}</h2>
                        <h3>{movieDetails.tagline}</h3>
                        <h3>{movieDetails.release_date}</h3>
                        <p>{movieDetails.overview}</p>
                    </div>}
            </div>
            <div className='castList'></div>
            <div>{movieReviews !== undefined && movieReviews.results.map((review) => {
                return (
                    <div className='review'>
                        <h3>{review.author}</h3>
                        <p>{review.content}</p>
                        <h4>{review.created_at}</h4>
                    </div>);
            })}
            </div>
        </div>
    )
}

export { Details };