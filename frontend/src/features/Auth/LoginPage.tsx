import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const { connected } = useWallet();
    const navigate = useNavigate();

    // Redirect to profile page when connected
    useEffect(() => {
        if (connected) {
            navigate('/');
        }
    }, [connected, navigate]);

    return (
        <div>
            <h2>Login with Your Wallet</h2>
            <WalletMultiButton />
        </div>
    );
};

export default LoginPage;
