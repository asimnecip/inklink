
// components/CurrentRoomDisplay.tsx
import { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';

import Chat from '../../components/Chat/Chat';
import Canvas from '../../components/Canvas/Canvas';

import { io } from 'socket.io-client'
import { leaveRoomAct } from '../../middleware/socketIOMiddleware';
import RoomParticipantList from '../../components/RoomList/RoomUserList';
const socket = io('http://localhost:7000')

const RoomClassic: FC = () => {
  const dispatch = useDispatch()

  const room = useSelector((state: RootState) => state.room);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {

    return () => {
      dispatch(leaveRoomAct({roomId:room.roomId, userId:user.id}));
    }
  },[room.roomId]);

  if (!room.roomId) return <div>No room selected</div>;
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
      <h1>{room.roomName}</h1>
      <div style={leftAndRightColumnStyle}>
          {/* <Chat /> */}
      </div>
      <div style={centerColumnStyle}>
          {/* <Canvas roomId={roomId} /> */}
      </div>
      <div style={leftAndRightColumnStyle}>
          {/* Replace this div with your UserList component */}
          <RoomParticipantList />
      </div>
    </div>
  );
};

export default RoomClassic;
