import React from 'react'
import { useState, useEffect } from 'react'
import { getMovieDetails, getMovieReviews } from './library/getMovies'
import { useParams } from 'react-router-dom';
import { SearchBar } from './Search'

function Details() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState();
    const [movieReviews, setMovieReviews] = useState();
    useEffect(() => {
        getMovieDetails(id)
            .then(data => {
                console.log(data);
                setMovieDetails(data);
            });
        getMovieReviews(id)
            .then(data => {
                console.log(data);
                setMovieReviews(data);
            });
    }, []);
    return (
        <div>
            <div><SearchBar /></div>
            <div>
                {movieDetails !== undefined &&
                <div style={{ backgroundImage: `https://image.tmdb.org/t/p${movieDetails.backdrop_path}`}}>
                <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt="Movie Poster" />
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