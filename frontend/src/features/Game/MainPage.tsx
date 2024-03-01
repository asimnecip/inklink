import React from 'react';
import Layout from '../../app/Layout'; // Import the Layout component
import Chat from '../../components/Chat/Chat';

const MainPage: React.FC = () => {
    return (
        <>
        <Layout>
            <Chat />
            <div className="room-list">
                {/* List available rooms here */}
            </div>
            <button>Create a Room</button>
        </Layout>
        </>
    );
};

export default MainPage;
