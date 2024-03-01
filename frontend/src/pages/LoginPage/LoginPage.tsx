import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const { connected } = useWallet();
    const navigate = useNavigate();

    useEffect(() => {
        if (connected) {
            navigate('/');
        }
    }, [connected]);

    return (
        <WalletMultiButton />
    );
};

export default LoginPage;
