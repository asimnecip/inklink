// src/components/CreateRoomModal.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface CreateRoomModalProps {
  onClose: () => void;
  onRoomCreated: () => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ onClose, onRoomCreated }) => {
    const username = useSelector((state: RootState) => state.user.username);
    const [roomName, setRoomName] = useState('');

  const handleCreateRoom = async () => {
    try {
      await axios.post('http://localhost:3001/rooms', { roomName, creator: username }); // Adjust the API URL and creator accordingly
      onRoomCreated();
      onClose();
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  return (
    <div style={{ position: 'fixed', top: '20%', left: '30%', backgroundColor: 'white', padding: '20px', zIndex: 100 }}>
      <h2>Create New Room</h2>
      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={handleCreateRoom}>Create</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default CreateRoomModal;
