import React, { useState, useEffect} from 'react';
import Movie from './components/Movie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query="

function App() {
    const [ movies, setMovies] = useState([]);
    const [ searchTerm,setSearchTerm] = useState('');
    
    
    useEffect(() => {
        getMovies(FEATURED_API);
    }, []);

    const getMovies = (API) => {
        fetch(API).then(res => res.json())
        .then(data => {
            console.log(data);
            setMovies(data.results);
        });
    }
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (searchTerm){
            getMovies(SEARCH_API + searchTerm);
            setSearchTerm('');
        }
    };

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <>
        <header>
            <form onSubmit={handleOnSubmit}>
                <input clasName="search" 
                type="search" placeholder="Search..." 
                value={searchTerm} onChange={handleOnChange} 
                style={{    fontFamily: "inherit",
                    border: "2px solid #22254b",
                    borderRadius: "50px",
                    fontSize: "1.2rem",
                    padding: "0.5rem 1.5rem",
                    backgroundColor: "rgb(45, 96, 143)",}}/>
            </form>
        </header>
         <div className="movie-container">
            { movies.length > 0 && movies.map((movie) => 
            <Movie key={movie.id} {...movie}/>)
            } </div>
        </>    
        );
}

export default App;