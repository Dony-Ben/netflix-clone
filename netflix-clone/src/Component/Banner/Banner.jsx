import React, { useEffect, useState } from "react";
import axios from "../../Utils/axios";
import requests from "../../Utils/Requests";
import { useNavigate } from "react-router-dom";
import MovieModal from "../Modal/Modal"
import { FaPlay } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal,setShowModal] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const movies = request.data.results;
        if (movies && movies.length > 0) {
          const randomIndex = Math.floor(Math.random() * movies.length);
          setMovie(movies[randomIndex]);
        }
      } catch (error) {
        console.error("Error fetching Netflix originals:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <header className="banner loading">
        <div className="banner_contents">
          <h1 className="banner_title">Loading...</h1>
        </div>
      </header>
    );
  }

  if (!movie) {
    return (
      <header className="banner fallback">
        <div className="banner_contents">
          <h1 className="banner_title">Netflix Originals</h1>
          <h1 className="banner_description">Discover amazing content</h1>
        </div>
      </header>
    );
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="banner_description">{movie?.overview}</p>
        <div className="banner_buttons">
          <button
            className="banner_button play"
            onClick={() => navigate(`/player/${movie.id}`)}
          >
            <FaPlay style={{ marginRight: "8px" }} /> Play
          </button>
          <button
            className="banner_button more_info"
            onClick={() => setShowModal(true)} 
          >
            <MdInfoOutline style={{ marginRight: "8px" }} /> More Info
          </button>

          {showModal && (
            <MovieModal movie={movie} onClose={() => setShowModal(false)} />
          )}
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
