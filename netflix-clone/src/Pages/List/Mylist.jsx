import React from "react";
import { useWatchlist } from "../../Context/WatchlistContext";
import "./MyList.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MyList = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="mylist">
      <h2 className="mylist-title">📺 My Watchlist</h2>
      {watchlist.length > 0 ? (
        <div className="mylist-grid">
          {watchlist.map((movie) => (
            <div key={movie.id} className="mylist-item">
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="mylist-poster"
              />
              <h3 className="movie-title">{movie.title || movie.name}</h3>
              <button
                className="remove-btn"
                onClick={() => removeFromWatchlist(movie.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-msg">No movies in your list yet.</p>
      )}
    </div>
  );
};

export default MyList;
