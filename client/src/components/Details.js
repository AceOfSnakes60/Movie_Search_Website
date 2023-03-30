import React from 'react'
import { useState, useEffect } from 'react'
import { getMovieDetails, getMovieReviews } from './library/getMovies'
import { useParams } from 'react-router-dom';
import { SearchBar } from './Search'
import './Details.css'

function Details() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState();
    const [movieReviews, setMovieReviews] = useState();
    const [castList, setCastList] = useState();

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
        <div className='moviePage'>
            <div><SearchBar /></div>   
            <div className='movieDeets'>
                {movieDetails !== undefined &&<div className='movie'>
                    <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}/>
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
            {castList !== undefined&&<div className='castList'>
            
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