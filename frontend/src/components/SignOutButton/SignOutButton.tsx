// SignOutButton.tsx

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';

const SignOutButton: React.FC = () => {
    const { disconnect } = useWallet();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await disconnect();
        navigate('/login'); // Redirect to login page or any other page
    };

    return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;
