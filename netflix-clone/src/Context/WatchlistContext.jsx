import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, setDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db, auth } from "../Config/Firebase.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const movieRef = doc(db, "watchlists", user.uid);
                    const docSnap = await getDoc(movieRef);

                    if (docSnap.exists()) {
                        const movies = docSnap.data().movies || [];
                        setWatchlist(movies);
                    }
                } catch (error) {
                    console.error("Error loading watchlist: ", error);
                }
            } else {
                setWatchlist([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const addToWatchlist = async (movie) => {
        if (watchlist.some((item) => item.id === movie.id)) {
            toast.info(`${movie.title || movie.name} is already in your watchlist!`);
            return;
        }
        
        try {
            const movieRef = doc(db, "watchlists", auth.currentUser.uid); 
            await setDoc(movieRef, {
                movies: arrayUnion(movie)
            }, { merge: true });

            setWatchlist((prev) => {
                if (prev.some((item) => item.id === movie.id)) return prev;
                return [...prev, movie];
            });
            
            toast.success(`${movie.title || movie.name} added to your watchlist!`);
        } catch (error) {
            console.error("Error adding movie to watchlist: ", error);
            toast.error("Failed to add movie to watchlist.");
        }
    };
    const removeFromWatchlist = async (movieId) => {
        try {
            const movieRef = doc(db, "watchlists", auth.currentUser.uid);
            const docSnap = await getDoc(movieRef);

            if (docSnap.exists()) {
                const currentMovies = docSnap.data().movies || [];
                const updatedMovies = currentMovies.filter(movie => movie.id !== movieId);

                await setDoc(movieRef, {
                    movies: updatedMovies
                }, { merge: true });
            }

            const movieToRemove = watchlist.find(movie => movie.id === movieId);
            const movieTitle = movieToRemove ? (movieToRemove.title || movieToRemove.name) : "Movie";

            setWatchlist((prev) => prev.filter((movie) => movie.id !== movieId));
            
            toast.success(`${movieTitle} removed from your watchlist!`);
        } catch (error) {
            console.error("Error removing movie from watchlist: ", error);
            toast.error("Failed to remove movie from watchlist.");
        }
    };

    return (
        <WatchlistContext.Provider value={{
            watchlist,
            addToWatchlist,
            removeFromWatchlist
        }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext);
