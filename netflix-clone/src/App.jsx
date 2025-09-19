import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx"
import Player from "./Pages/Player/Player.jsx"
import MyList from "./Pages/List/Mylist.jsx"
import Auth from "./Pages/Auth/Auth.jsx";
import Landing from "./Pages/Landing/Landing.jsx"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div>
            <ToastContainer theme="dark" />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/player/:id" element={<Player />} />
                    <Route path="/my-list" element={<MyList />} />
                    <Route path="/login" element={<Auth />} />
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default App;
