import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        
        console.log(localStorage.length);
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key!);
            console.log(`${key}: ${value}`);
        }
        
    
        // Redirect to login page or home page
        navigate('/');
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
