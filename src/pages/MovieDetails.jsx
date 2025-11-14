import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './MovieDetails.css';

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=ce36f814f&i=${movieId}&plot=full`);
        setMovie(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const posters = [movie.Poster];

  return (
    <div className="container">
      <div className="swiper-container">
        <Swiper>
          {posters.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt="Movie Poster" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


      <div className="plot-section">
        <h3>Plot</h3>
        <p>{movie.Plot}</p>
      </div>

      <div className="details">
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Writer:</strong> {movie.Writer}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>Language:</strong> {movie.Language}</p>
      </div>

      <div className="ratings-section">
        <h3>Ratings</h3>
        <ul>
          {movie.Ratings?.map((rate, index) => (
            <li key={index}>{rate.Source}: <span>{rate.Value}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MovieDetails;


