import {useState, useEffect} from 'react'
import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { useNavigate } from 'react-router';
import {getMoviesBySearch} from './library/getMovies'

function SearchBar(){
    const [searchQuery, setSearchQuery]= useState('');
    const navigate = useNavigate();
    const handleClick=()=>{
        if(searchQuery!==undefined){
            navigate(`/search/${searchQuery.replace(" ", "%20")}`, {replace:true})
        }
    }
    return(            
    <div className='search-bar'>
        <input type="search" className="search" placeholder="Search for movies.." onChange={e=>setSearchQuery(e.target.value)} />
        <button onClick={()=>handleClick()}>search</button>
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
        <div>
        <div><SearchBar /></div>   
        <div className='SearchResults'>
            {foundMovies!==undefined&&foundMovies.results.map(movie=>{return(
                <div className='movieCard' id={movie.id} onClick={()=>handleClick(movie.id)} 
                style={{ 
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                    backgroundSize: 'cover'  
                  }}>
                    <div>
                    <h4>{movie.title}</h4>
                    <h5>{(movie.release_date).split('-')[0]}</h5>
                    </div>
                </div>
            )})}
        </div>
        </div>
    )
}

export {SearchBar, SearchResults}