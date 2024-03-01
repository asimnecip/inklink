import React from 'react';
import { useNavigate } from 'react-router-dom';
import WalletButton from '../WalletButton/WalletButton';
import './Navbar.css'
import inkLinkLogo from '../../assets/inklink.svg'; // Import the logo


const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav>
            <div className="logo">
                <img 
                    src={inkLinkLogo} 
                    alt="Inklink" 
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                     />
            </div>
            <div className="menu">
                <WalletButton />
            </div>
        </nav>
    );
};

export default Navbar;
