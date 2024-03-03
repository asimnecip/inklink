import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Landing from '../../components/Landing/Landing';
import RoomList from '../../components/RoomList/RoomList';

const Home: React.FC = () => {
    const { connected } = useWallet();

    if (connected) {
        return (
            <>
               <RoomList /> 
            </>
        );
    } else {
        return <Landing />
    }
};

export default Home;
