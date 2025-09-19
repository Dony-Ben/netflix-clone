import React from "react";
import { useWatchlist } from "../../Context/WatchlistContext";
import "./Modal.css";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";
 function MovieModal({ movie, onClose, onPlay }) {
    const { addToWatchlist } = useWatchlist();
  if (!movie) return null;
// const isInWatchlist = watchlist.some((item) => item.id === movie.id);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>x</button>
        <img
          src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title || movie.name}
          className="modal-poster"
        />

        <div className="modal-details">
          <h2>{movie.title || movie.name}</h2>
          <p>{movie.overview}</p>

          {/* Buttons */}
          <div className="modal-actions">
            <button className="play-btn" onClick={() => onPlay(movie)}>
              ▶ Play
            </button>
           
              <button
                className="watchlist-btn"
                onClick={() => addToWatchlist(movie)}
              >
                + Watchlist
              </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;