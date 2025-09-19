import React from "react";
import { useNavigate } from "react-router-dom";
import "./Moviecard.css";

const MovieCard = ({ movie, isLarge }) => {
  const navigate = useNavigate();

  // Extract year
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : movie.first_air_date
    ? movie.first_air_date.split("-")[0]
    : "";

  // Navigate to player page
  const handleMovieClick = () => {
    navigate(`/player/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleMovieClick}>
      <img
        className={isLarge ? "movie-poster-large" : "movie-poster"}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || movie.name}
      />

      <div className="movie-info">
        <div className="movie-title">{movie.title || movie.name}</div>
        <div className="movie-year">{releaseYear}</div>
      </div>
    </div>
  );
};

export default MovieCard;
