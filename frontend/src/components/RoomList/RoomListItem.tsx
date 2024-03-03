import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentRoom } from '../../features/rooms/roomSlice';
import { Room } from '../../../types'; // Adjust the import path as necessary
import { useNavigate  } from 'react-router-dom'; // Import useHistory hook from react-router-dom

interface RoomListItemProps {
  room: Room;
}

const RoomListItem: React.FC<RoomListItemProps> = ({ room }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleSelectRoom = () => {
    dispatch(setCurrentRoom(room));
    navigate('/room'); // Use navigate with state to avoid showing roomId in URL
    // Navigate to the room's page as needed
  };

  return (
    <button 
      onClick={handleSelectRoom}
      style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
        {room.roomName} - Created by {room.creator}
    </button>
  );
};

export default RoomListItem;
