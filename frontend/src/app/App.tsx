// App.tsx

import React from 'react';
import './App.css';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../features/Auth/LoginPage';
import ProfilePage from '../features/Auth/ProfilePage';
import MainPage from '../features/Game/MainPage';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute'; // Import the PrivateRoute component

const wallets = [new PhantomWalletAdapter()];

const App: React.FC = () => {
    return (
        <ConnectionProvider endpoint="https://api.devnet.solana.com">
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                  <Router>
                      <Routes>
                          <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                      </Routes>
                  </Router>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default App;
