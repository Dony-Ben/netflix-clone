import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import cart_icon from '../../assets/cart_icon.svg'
import { signOut } from "firebase/auth";
import { auth } from "../../Config/Firebase";
import { Link } from 'react-router-dom';
function Navbar() {

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                window.location.href = "/login";
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    };
    return (
        <>
            <div className='navbar'>
                <div className='navbar-left'>
                    <img src={logo} alt="Netflix Logo" className='netflix-logo' />
                    <ul>
                        <li><Link to="/Home">Home</Link></li>
                        <li><Link to="#">TV Shows</Link></li>
                        <li><Link to="#">Movies</Link></li>
                        <li><Link to="#">New & Popular</Link></li>
                        <li><Link to="/my-list">My List</Link></li>
                        <li><Link to="#">Browse by Language</Link></li>
                    </ul>
                </div>
                <div className='navbar-right'>
                    <img src={search_icon} alt="" className='icons' />
                    <p>Children</p>
                    <img src={bell_icon} alt="" className='icons' />
                    <div className='navbar-profile'>
                        <img src={profile_img} alt="profile_img" className='profile' />
                        <img src={cart_icon} alt="cart_icon" />
                        <div className='dropdown'>
                            <button className="logout-btn" onClick={handleSignOut}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
