import React, { ReactNode, useCallback, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useDispatch } from 'react-redux';
import { setUsername } from '../features/user/userSlice';
import { useWallet } from '@solana/wallet-adapter-react';

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
                const data = await response.json();
    
                if (data.exists) {
                    console.log('Existing username:', data.username);
                    // User exists, you can redirect or perform any action needed
                } else {
                    console.log('Generated username:', data.username);
                    // User did not exist and was created, you can redirect or perform any action needed
                }

                dispatch(setUsername(data.username));
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
