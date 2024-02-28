import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        // Example: Clear user session data from local storage
        localStorage.removeItem('walletName');
        alert(localStorage.length)
    
        // Redirect to login page or home page
        navigate('/login');
    };

    return (
        <nav>
            <div className="logo">
                <img src="/path-to-your-logo.png" alt="Inklink" />
                <span>Inklink</span>
            </div>
            <div className="menu">
                <button onClick={() => navigate('/profile')}>Profile</button>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </nav>
    );
};

export default Navbar;
