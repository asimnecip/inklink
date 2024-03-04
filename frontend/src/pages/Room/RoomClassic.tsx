
// components/CurrentRoomDisplay.tsx
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import { Room } from '../../../types'; // Adjust the import path as necessary
import Chat from '../../components/Chat/Chat';
import Canvas from '../../components/Canvas/Canvas';

const RoomClassic: React.FC = () => {
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);

  if (!currentRoom) return <div>No room selected</div>;
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const columnStyle = {
    padding: '20px',
  };

  const leftAndRightColumnStyle = {
    ...columnStyle,
    flex: 1, // Take up equal space, but less than the center
  };

  const centerColumnStyle = {
    ...columnStyle,
    flex: 2, // Take up twice the space of the side columns
  };

  return (
    <div style={containerStyle}>
      <div style={leftAndRightColumnStyle}>
          <Chat />
      </div>
      <div style={centerColumnStyle}>
          <h1>{currentRoom.roomName}</h1>
          <Canvas roomId={currentRoom.roomId} />
      </div>
      <div style={leftAndRightColumnStyle}>
          {/* Replace this div with your UserList component */}
          <div>User List Placeholder</div>
      </div>
    </div>
  );
};

export default RoomClassic;
