import {useState, useEffect} from 'react'
import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { useNavigate } from 'react-router';
import {getMoviesBySearch} from './library/getMovies'

function SearchBar(){
    const [searchQuery, setSearchQuery]= useState('');

    return(            
    <div className='search-bar'>
        <input type="search" className="search" placeholder="Search for movies.." onChange={e=>setSearchQuery(e.target.value)} />
        <button><Link to={`/search/${searchQuery.replace(" ", "%20")}`}>search</Link></button>
    </div>)
}

function SearchResults(){
    const {query} = useParams();
    const [foundMovies, setFoundMovies]= useState();
    const navigate = useNavigate();
        console.log(query)
    useEffect(()=>{
        getMoviesBySearch(query)
        .then(movies=>{
            console.log(movies);
            setFoundMovies(movies);
        });
    },[])
    const handleClick=(id)=>{

        navigate(`/movie/${id}`, {replace:true})
    }

    return(
        <div className='SearchResults'>
            {foundMovies!==undefined&&foundMovies.results.map(movie=>{return(
                <div className='movieCard' id={movie.id} onClick={()=>handleClick(movie.id)}>
                    <h3>{movie.title}</h3>
                    <h4>{(movie.release_date).split('-')[0]}</h4>
                </div>
            )})}
        </div>
    )
}

export {SearchBar, SearchResults}