// PrivateRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { connected } = useWallet();

    // Redirect to login page if not connected
    return connected ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
