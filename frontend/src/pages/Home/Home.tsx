import React from 'react';
import Chat from '../../components/Chat/Chat';
import { useWallet } from '@solana/wallet-adapter-react';
import Landing from '../../components/Landing/Landing';

const Home: React.FC = () => {
    const { connected } = useWallet();

    if (connected) {
        return (
            <>
                <Chat />
                <div className="room-list">
                    {/* List available rooms here */}
                </div>
                <button>Create a Room</button>
            </>
        );
    } else {
        return <Landing />
    }
};

export default Home;
