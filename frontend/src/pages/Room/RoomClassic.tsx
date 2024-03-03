
// components/CurrentRoomDisplay.tsx
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import { Room } from '../../../types'; // Adjust the import path as necessary

const RoomClassic: React.FC = () => {
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);

  if (!currentRoom) return <div>No room selected</div>;

  return (
    <div>
      <h1>{currentRoom.roomName}</h1>
      {/* Display other room details */}
    </div>
  );
};

export default RoomClassic;
