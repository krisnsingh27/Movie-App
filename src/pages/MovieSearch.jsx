// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMovies } from "../features/movieSlice";


// import './MovieSearch.css';
// import { useNavigate } from 'react-router-dom';

// function MovieSearch() {
//     const [query, setQuery] = useState('');
//     const dispatch = useDispatch();
//     const { movies, loading, error } = useSelector(state => state.movies);
//     const navigate=useNavigate()
    


//     const handleSearch = () => {
//         if (!query) return;
//         dispatch(fetchMovies(query));
//     };
//     const handlefavourite=()=>{
//         localStorage.setItem("")
//     }

//     return (
//         <div className="search-container">
//             <h2>Search Movies</h2>
//             <div className="search-bar">
//                 <input
//                     type="text"
//                     value={query}
//                     onChange={e => setQuery(e.target.value)}
//                     placeholder="Enter movie name..."
//                 />
//                 <button onClick={handleSearch}>Search</button>
//             </div>

//             {loading && <p>Loading...</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}

//             <div className="movies-grid">
//                 {movies.map(movie => (
//                     <div key={movie.imdbID} className="movie-card">
                       
//                         <img
//                             src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150x225?text=No+Image"}
//                             alt={movie.Title}
//                             onError={(e) => {
//                                 e.target.onerror = null; 
//                                 e.target.src = "https://via.placeholder.com/150x225?text=No+Image";
//                             }} 
//                               onClick={() => navigate(`/movie/${movie.imdbID}`)}
                              
//                         />

//                         <h3>{movie.Title}</h3>
//                         <p>{movie.Year}</p>
//                         <button onClick={handlefavourite}>Add to favourite</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default MovieSearch;





import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from "../features/movieSlice";
import './MovieSearch.css';
import { useNavigate } from 'react-router-dom';

function MovieSearch() {
    const [query, setQuery] = useState('');
    const [favourites, setFavourites] = useState([]);
    const [watchNext, setWatchNext] = useState([]);
    const dispatch = useDispatch();
    const { movies, loading, error } = useSelector(state => state.movies);
    const navigate = useNavigate();

    useEffect(() => {
        const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
        const savedWatchNext = JSON.parse(localStorage.getItem('watchNext')) || [];
        setFavourites(savedFavourites);
        setWatchNext(savedWatchNext);
    }, []);

    const handleSearch = () => {
        if (!query) return;
        dispatch(fetchMovies(query));
       
    };

    const handleFavourite = (movie) => {
        const isAlreadyFavourite = favourites.some(fav => fav.imdbID === movie.imdbID);
        if (isAlreadyFavourite) return;

        const updatedFavourites = [...favourites, movie];
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
        alert(`${movie.Title} added to favourites!`);
    };

    const handleWatchNext = (movie) => {
        const isAlreadyAdded = watchNext.some(w => w.imdbID === movie.imdbID);
        if (isAlreadyAdded) return;

        const updatedWatchNext = [...watchNext, movie];
        setWatchNext(updatedWatchNext);
        localStorage.setItem('watchNext', JSON.stringify(updatedWatchNext));
        alert(`${movie.Title} added to Watch Next!`);
    };

    return (
        <div className="search-container">
            <h2>Search Movies</h2>
            <div className="search-bar">
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Enter movie name..."
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="movies-grid">
                {movies.map(movie => {
                    const isFavourite = favourites.some(fav => fav.imdbID === movie.imdbID);
                    const isWatchNext = watchNext.some(w => w.imdbID === movie.imdbID);

                    return (
                        <div key={movie.imdbID} className="movie-card">
                            <img
                                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150x225?text=No+Image"}
                                alt={movie.Title}
                                onClick={() => navigate(`/movie/${movie.imdbID}`)}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/150x225?text=No+Image";
                                }}
                            />
                            <h3>{movie.Title}</h3>
                            <p>{movie.Year}</p>
                            <button
                                onClick={() => handleFavourite(movie)}
                                disabled={isFavourite}
                                style={{ borderRadius:"5px" }}
                            >
                                {isFavourite ? "Added" : "Add to Favourite"}
                            </button>
                            <button
                                onClick={() => handleWatchNext(movie)}
                                disabled={isWatchNext}
                                style={{ borderRadius:"5px" }}
                            >
                                {isWatchNext ? "Added" : "Add to Watch Next"}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MovieSearch;
