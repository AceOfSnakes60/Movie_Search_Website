import React from 'react'
import {useState, useEffect} from 'react'
import {getMovieDetails} from './library/getMovies'

function Details(){
    const [movieDetails, setMovieDetails] = useState(getMovieDetails());
    useEffect(()=>{
        setMovieDetails(getMovieDetails())
    },[]);
    return(<div>{movieDetails}</div>)
}