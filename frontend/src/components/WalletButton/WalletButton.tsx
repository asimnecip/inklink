// SignOutButton.tsx

import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const WalletButton: React.FC = () => {
    const { connected, disconnect } = useWallet();
    const navigate = useNavigate();
    const username = useSelector((state: RootState) => state.user.username);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    // Specify the type for your ref. Here it is HTMLDivElement | null since it's referring to a div element.
    const toggleContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Specify the type of the event as MouseEvent to ensure type safety.
        const handleClickOutside = (event: MouseEvent) => {
        // Since event.target is of type EventTarget, we need to assert it to Node type to use it with contains method.
        if (toggleContainer.current && !toggleContainer.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
        window.removeEventListener('click', handleClickOutside);
        };
    }, []);
    

    const handleProfile = () => {
      setIsOpen(false);
      navigate("/profile");
    }

    const handleLogout = async () => {
      setIsOpen(false);
      await disconnect();
      navigate("/login");
    }
    
    if (connected) {
      return (
        <div ref={toggleContainer} style={{ position: 'relative', display: 'inline-block' }}>
          <button onClick={() => setIsOpen(!isOpen)}>{username}</button>
          {isOpen && (
            <div style={{ position: 'absolute', backgroundColor:'#121212', marginTop: '2px' }}>
              {/* Use button elements for dropdown items */}
              <button style={{ display: 'block', width: '100%', padding: '10px', textAlign: 'left' }} onClick={handleProfile}>Profile</button>
              <button style={{ display: 'block', width: '100%', padding: '10px', textAlign: 'left' }} onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )
    } else {
      return (
       <button onClick={() => navigate("/login")}>Sign In</button> 
      )
    }

};

export default WalletButton;
