import React, { useState } from "react";
import Row from "../../Component/TitleCards/Row.jsx"
import Navbar from "../../Component/Navbar/Navbar.jsx"
import Banner from "../../Component/Banner/Banner.jsx";
import requests from "../../Utils/Requests.js";
import Footer from "../../Component/Footer/Footer.jsx";
import MovieModal from "../../Component/Modal/Modal.jsx";
import { useNavigate } from "react-router-dom";
import './Home.css'

function Home() {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMovie(null);
    };

    const handlePlayMovie = (movie) => {
        setShowModal(false);
        navigate(`/player/${movie.id || movie}`);
    };

    const handleAddToWatchlist = (movie) => {
        // Watchlist functionality can be implemented here
    };

    return (
        <div className="home">
            <Navbar/>
            <Banner/>
            <Row 
                title="Now Playing" 
                fetchUrl={requests.fetchNowPlaying} 
                isLarge 
                onMovieSelect={handleMovieSelect}
            />
            <Row 
                title="Popular" 
                fetchUrl={requests.fetchPopular} 
                onMovieSelect={handleMovieSelect}
            />
            <Row 
                title="Top Rated" 
                fetchUrl={requests.fetchTopRated} 
                onMovieSelect={handleMovieSelect}
            />
            <Row 
                title="Upcoming" 
                fetchUrl={requests.fetchUpcoming} 
                onMovieSelect={handleMovieSelect}
            />
            <Footer />
            
            {showModal && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={handleCloseModal}
                    onPlay={handlePlayMovie}
                    onWatchlist={handleAddToWatchlist}
                />
            )}
        </div>
    )
}
export default Home;
