// src/components/RoomList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateRoomModal from './CreateRoomModal';
import RoomListItem from './RoomListItem';

interface Room {
  roomId: string;
  roomName: string;
  creator: string;
  creationTime?: Date; // Include other fields as necessary, optional fields can be marked with ?
}

const RoomList: React.FC = () => {
  // In your RoomList component
  const [rooms, setRooms] = useState<Room[]>([]); // Specify that rooms is an array of Room objects

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:3001/rooms'); // Adjust the API URL accordingly
      setRooms(response.data);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    }
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <button style={{ marginBottom: '10px' }} onClick={() => setIsModalOpen(true)}>Create New Room</button>
      {isModalOpen && (
        <CreateRoomModal
          onClose={() => setIsModalOpen(false)}
          onRoomCreated={fetchRooms}
        />
      )}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {rooms.map(room => (
          <li key={room.roomId} style={{ margin: '10px 0' }}>
            <RoomListItem room={room} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
