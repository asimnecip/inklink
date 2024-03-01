import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, clusterApiUrl } from '@solana/web3.js';

const ProfilePage: React.FC = () => {
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        const getBalance = async () => {
            if (publicKey) {
                // Initialize connection
                const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
                
                // Fetch balance
                const balance = await connection.getBalance(publicKey);
                
                // Convert balance from lamports to SOL
                const solBalance = balance / 1e9;
                setBalance(solBalance);
            }
        };

        getBalance();
    }, [publicKey]);

    return (
        <div>
            <h2>User Profile</h2>
            <p>Wallet Address: {publicKey?.toBase58()}</p>
            {balance !== null ? (
                <p>Your SOL balance: {balance} SOL</p>
            ) : (
                <p>Fetching balance...</p>
            )}
        </div>
    );
};

export default ProfilePage;