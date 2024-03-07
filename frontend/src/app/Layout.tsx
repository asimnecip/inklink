import React, { ReactNode, useCallback, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';
import { useWallet } from '@solana/wallet-adapter-react';
import { UserPG } from '../../types';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { publicKey } = useWallet();
    const dispatch = useDispatch();
    
    const getUsername = useCallback(async () => {
        if (publicKey) {
            const walletAddress = publicKey.toString();
            const checkUserUrl = `http://localhost:3001/users/check/${walletAddress}`;
    
            try {
                const response = await fetch(checkUserUrl, {
                    method: 'GET', // GET method to check the user
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data : UserPG = await response.json();
    
                dispatch(setUser(data));
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        }
    }, [publicKey]);
    
    useEffect(() => {
        getUsername();
    }, [getUsername]);


    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
