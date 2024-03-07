import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';

  import { useNavigate } from 'react-router-dom';
import RoleModal from '../RoleModal/RoleModal'; // Import the RoleModal component
import { RoomPG, RoomRE, RoomHY } from '../../../types';
// import { joinRoom } from '../../features/room/roomSlice';

import { connectSocket, userJoinedRoomAct } from '../../middleware/socketIOMiddleware';
const socketUrl = 'http://localhost:7000'

const RoomListItem: React.FC<RoomPG> = ( room:RoomPG ) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeUser = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // The URL should be replaced with your WebSocket server URL
    dispatch(connectSocket(socketUrl));
  }, [dispatch]); 

  const handleSelectRoom = () => {
    setIsModalOpen(true); // Open the modal instead of directly navigating
  };

  const handleJoinRoom = (role: string) => {
    
    // socket.emit('join-room', { roomId: room.roomId, userId: activeUser.id }) // Emit join-room event with roomId
    dispatch(
      userJoinedRoomAct({
        roomId:room.roomId,
        roomName:room.roomName,
        userId:activeUser.id,
        userName:activeUser.username,
        userRole:role,
        userTeamId:0, // for now
    }));
    // Dispatch and navigate actions can go here based on the role
    navigate('/room');
  };

  return (
    <>
      <button 
        onClick={handleSelectRoom}
        style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          {room.roomName} - Created by {room.creator}
      </button>
      <RoleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleJoinRoom} />
    </>
  );
};

export default RoomListItem;
