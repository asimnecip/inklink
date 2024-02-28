import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const ProfilePage: React.FC = () => {
    const { publicKey } = useWallet();

    return (
        <div>
            <h2>User Profile</h2>
            <p>Wallet Address: {publicKey?.toBase58()}</p>
            {/* Additional user information */}
        </div>
    );
};

export default ProfilePage;