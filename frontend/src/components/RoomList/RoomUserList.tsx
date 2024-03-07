import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const RoomUserList: React.FC = () => {
  const userList = useSelector((state: RootState) => state.room.users);

  if (!userList) {
    return <div>No Participants</div>
  } else {
    return (
      <div>
        <h3>Participants</h3>
        <ul>
        {
          userList.filter(Boolean).map((user) => (
            <li key={user.userId}>{user.userName}</li>
          ))
        }
        </ul>
      </div>
    );
  }
};

export default RoomUserList;
