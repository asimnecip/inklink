import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignOutButton from '../SignOutButton/SignOutButton';
import './Navbar.css'
import inkLinkLogo from '../../assets/inklink.svg'; // Import the logo


const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav>
            <div className="logo">
                <img src={inkLinkLogo} alt="Inklink" />
            </div>
            <div className="menu">
                <button onClick={() => navigate('/profile')}>Profile</button>
                <SignOutButton />
            </div>
        </nav>
    );
};

export default Navbar;
