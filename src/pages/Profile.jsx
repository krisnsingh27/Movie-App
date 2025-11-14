// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

// function Profile() {
//     const navigate = useNavigate()
//     const [user, setUser] = useState(null)

//     useEffect(() => {
//         const loggedIn = localStorage.getItem("isLoggedIn")
//         const storedUser = JSON.parse(localStorage.getItem("user"));

//         if (loggedIn !== "true" || !storedUser) {
//             navigate("/login");
//         } else {
//             setUser(storedUser);
//         }

//     }, [navigate])


//     const handlelogout = () => {
//         localStorage.setItem("isLoggedIn", false);
//         navigate("/login");
//     };
//     if (!user) {
//         return null;
//     }
//     return (
//         <div style={styles.container}>
//             <div style={styles.box}>
//                 <h1>profile</h1>
//                 <h3>Name: {user.name}</h3>
//                 <h3>Email:{user.email}</h3>

//                 <button onClick={handlelogout} style={styles.logoutbtn}>Logout</button>


//             </div>

//         </div>
//     )
// }
// const styles = {
//     container: {
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#111"

//     },

//     box: {
//         backgroundColor: "#222",
//         padding: "30px",
//         borderRadius: "10px",
//         color: "#fff",
//         textAlign: "center",
//         width: "300px",
//     },
//     loggedIn: {
//         marginTop: "20px",
//         padding: "10px 25px",
//         backgroundColor: "#ff3c3c",
//         border: "none",
//         borderRadius: "6px",
//         cursor: "pointer",
//         color: "#fff",
//         fontWeight: "bold"
//     }
// }


// export default Profile




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Profile() {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);
//     const [favourites, setFavourites] = useState([]);

//     useEffect(() => {
        
//         const loggedIn = localStorage.getItem("isLoggedIn");
//         const storedUser = JSON.parse(localStorage.getItem("user"));

//         if (loggedIn !== "true" || !storedUser) {
//             navigate("/login");
//         } else {
//             setUser(storedUser);

           
//             const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
//             setFavourites(savedFavourites);
//         }
//     }, [navigate]);

//     const handleLogout = () => {
//         localStorage.setItem("isLoggedIn", false);
//         navigate("/login");
//     };

//     const removeFavourite = (imdbID) => {
//         const updatedFavourites = favourites.filter(movie => movie.imdbID !== imdbID);
//         setFavourites(updatedFavourites);
//         localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
//     };

//     if (!user) return null;

//     return (
//         <div style={styles.container}>
//             <div style={styles.box}>
//                 <h1>Profile</h1>
//                 <h3>Name: {user.name}</h3>
//                 <h3>Email: {user.email}</h3>

//                 <button onClick={handleLogout} style={styles.logoutbtn}>Logout</button>

//                 <h2 style={{ marginTop: '20px' }}>My Favourite Movies</h2>
//                 {favourites.length === 0 ? (
//                     <p>No favourite movies added yet.</p>
//                 ) : (
//                     <div style={styles.moviesGrid}>
//                         {favourites.map(movie => (
//                             <div key={movie.imdbID} style={styles.movieCard}>
//                                 <img
//                                     src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150x225?text=No+Image"}
//                                     alt={movie.Title}
//                                     style={styles.poster}
//                                     onClick={() => navigate(`/movie/${movie.imdbID}`)}
//                                     onError={(e) => {
//                                         e.target.onerror = null;
//                                         e.target.src = "https://via.placeholder.com/150x225?text=No+Image";
//                                     }}
//                                 />
//                                 <h4>{movie.Title}</h4>
//                                 <p>{movie.Year}</p>
//                                 <button onClick={() => removeFavourite(movie.imdbID)} style={styles.removeBtn}>
//                                     Remove
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// const styles = {
//     container: {
//         display: 'flex',
//         justifyContent: 'center',
//         padding: '20px',
//     },
//     box: {
//         width: '80%',
//         maxWidth: '900px',
//         padding: '20px',
//         border: '1px solid #ccc',
//         borderRadius: '10px',
//         textAlign: 'center',
//     },
//     logoutbtn: {
//         padding: '10px 20px',
//         margin: '10px 0',
//         cursor: 'pointer',
//     },
//     moviesGrid: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
//         gap: '15px',
//         marginTop: '15px',
//     },
//     movieCard: {
//         border: '1px solid #ddd',
//         borderRadius: '8px',
//         padding: '10px',
//         textAlign: 'center',
//     },
//     poster: {
//         width: '100%',
//         height: '225px',
//         objectFit: 'cover',
//         cursor: 'pointer',
//     },
//     removeBtn: {
//         marginTop: '10px',
//         padding: '5px 10px',
//         cursor: 'pointer',
//     }
// };

// export default Profile;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [favourites, setFavourites] = useState([]);
    const [watchNext, setWatchNext] = useState([]);

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (loggedIn !== "true" || !storedUser) {
            navigate("/login");
        } else {
            setUser(storedUser);
            const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
            const savedWatchNext = JSON.parse(localStorage.getItem('watchNext')) || [];
            setFavourites(savedFavourites);
            setWatchNext(savedWatchNext);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", false);
        navigate("/login");
    };

    const removeFavourite = (imdbID) => {
        const updatedFavourites = favourites.filter(movie => movie.imdbID !== imdbID);
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    const removeWatchNext = (imdbID) => {
        const updatedWatchNext = watchNext.filter(movie => movie.imdbID !== imdbID);
        setWatchNext(updatedWatchNext);
        localStorage.setItem('watchNext', JSON.stringify(updatedWatchNext));
    };

    if (!user) return null;

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h1>Profile</h1>
                <h3>Name: {user.name}</h3>
                <h3>Email: {user.email}</h3>

                <button onClick={handleLogout} style={styles.logoutbtn}>Logout</button>

               
                <h2 style={{ marginTop: '20px' }}>My Favourite Movies</h2>
                {favourites.length === 0 ? (
                    <p>No favourite movies added yet.</p>
                ) : (
                    <div style={styles.moviesGrid}>
                        {favourites.map(movie => (
                            <div key={movie.imdbID} style={styles.movieCard}>
                                <img
                                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150x225?text=No+Image"}
                                    alt={movie.Title}
                                    style={styles.poster}
                                    onClick={() => navigate(`/movie/${movie.imdbID}`)}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/150x225?text=No+Image";
                                    }}
                                />
                                <h4>{movie.Title}</h4>
                                <p>{movie.Year}</p>
                                <button onClick={() => removeFavourite(movie.imdbID)} style={styles.removeBtn}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}

               
                <h2 style={{ marginTop: '40px' }}>Watch Next</h2>
                {watchNext.length === 0 ? (
                    <p>No movies in Watch Next list.</p>
                ) : (
                    <div style={styles.moviesGrid}>
                        {watchNext.map(movie => (
                            <div key={movie.imdbID} style={styles.movieCard}>
                                <img
                                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150x225?text=No+Image"}
                                    alt={movie.Title}
                                    style={styles.poster}
                                    onClick={() => navigate(`/movie/${movie.imdbID}`)}
                                />
                                <h4>{movie.Title}</h4>
                                <p>{movie.Year}</p>
                                <button onClick={() => removeWatchNext(movie.imdbID)} style={styles.removeBtn}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
    },
    box: {
        width: '80%',
        maxWidth: '900px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        textAlign: 'center',
    },
    logoutbtn: {
        padding: '10px 20px',
        margin: '10px 0',
        cursor: 'pointer',
    },
    moviesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '15px',
        marginTop: '15px',
    },
    movieCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        textAlign: 'center',
    },
    poster: {
        width: '100%',
        height: '225px',
        objectFit: 'cover',
        cursor: 'pointer',
    },
    removeBtn: {
        marginTop: '10px',
        padding: '5px 10px',
        cursor: 'pointer',
    }
};

export default Profile;
