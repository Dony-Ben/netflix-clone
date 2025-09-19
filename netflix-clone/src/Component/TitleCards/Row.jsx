import React, { useState, useEffect, useRef } from "react";
import "./Row.css";
import axios from "../../Utils/axios.js";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";

export default function Row({ title, fetchUrl, isLarge = false, onMovieSelect }) {
  const rowRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (err) {
        setError("Failed to fetch movies");
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    }

    if (fetchUrl) {
      fetchData();
    }
  }, [fetchUrl]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    if (onMovieSelect) {
      onMovieSelect(movie);
    }
  };

  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="row">
        <h2>{title}</h2>
        <div className="row-posters">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="row">
        <h2>{title}</h2>
        <div className="row-posters">
          <p className="error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters" ref={rowRef}>
        <button className="scroll-btn left" onClick={scrollLeft}>
          ‹
        </button>
        {movies && movies.map((movie) => (
          movie.poster_path && (
            <img
              key={movie.id}
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title || movie.name}
              className={`row-poster ${isLarge ? "row-poster-large" : ""}`}
              onClick={() => handleMovieClick(movie)}
            />
          )
        ))}
        <button className="scroll-btn right" onClick={scrollRight}>
          ›
        </button>
      </div>

    </div>
  );
}
