import './Player.css';
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "../../Utils/axios.js";

function Player() {
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id;
    const [apiData, setApidata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        // First try to get movie videos
        axios
            .get(`/movie/${id}/videos?language=en-US`)
            .then(res => {
                if (res.data.results && res.data.results.length > 0) {
                    // Try to find a YouTube trailer first
                    const youtubeTrailer = res.data.results.find(video =>
                        video.site === 'YouTube' && video.type === 'Trailer'
                    );

                    // If no YouTube trailer, try any YouTube video
                    const youtubeVideo = res.data.results.find(video =>
                        video.site === 'YouTube'
                    );

                    // Use the best available video
                    const bestVideo = youtubeTrailer || youtubeVideo || res.data.results[0];
                    setApidata(bestVideo);
                    setLoading(false);
                } else {
                    // If no movie videos found, try TV show videos
                    axios
                        .get(`/tv/${id}/videos?language=en-US`)
                        .then(tvRes => {
                            if (tvRes.data.results && tvRes.data.results.length > 0) {
                                const youtubeTrailer = tvRes.data.results.find(video =>
                                    video.site === 'YouTube' && video.type === 'Trailer'
                                );

                                const youtubeVideo = tvRes.data.results.find(video =>
                                    video.site === 'YouTube'
                                );

                                const bestVideo = youtubeTrailer || youtubeVideo || tvRes.data.results[0];
                                setApidata(bestVideo);
                            } else {
                                setError('No videos found for this content');
                            }
                            setLoading(false);
                        })
                        .catch(tvErr => {
                            console.error("TV Video API error:", tvErr);
                            setError('No videos available for this content');
                            setLoading(false);
                        });
                }
            })
            .catch(err => {
                console.error("Movie Video API error:", err);
                setError('Failed to load video data');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className='player'>
                <div className="loading">Loading video...</div>
            </div>
        );
    }
    if (!apiData || !apiData.key) {
        return (
            <div className='player'>
                <img src={back_arrow_icon} alt="back" className='back-button' onClick={() => navigate(-1)} />
                <div className="error-container">
                    <div className="error">No video available for this content</div>
                    <p className="error-message">
                        This movie or TV show doesn't have any available videos in our database.
                    </p>
                    <button className="back-home-btn" onClick={() => navigate('/home')}>
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='player'>
            <img src={back_arrow_icon} alt="back" className='back-button' onClick={() => navigate(-1)} />
            <iframe
                className="video-frame"
                src={`https://www.youtube.com/embed/${apiData.key}`}
                title={apiData.name || 'YouTube video'}
                frameBorder='0'
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            >
            </iframe>

            {apiData && (
                <div className="player-info">
                    <p>{apiData.published_at}</p>
                    <p>{apiData.name}</p>
                    <p>{apiData.type}</p>
                </div>
            )}
        </div>
    );
}

export default Player;
