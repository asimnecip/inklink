import React, { useState } from 'react';

// Props could be extended to include any callbacks or additional data you need
interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (role: string) => void; // Add more parameters as needed for your use case
}

const RoleModal: React.FC<RoleModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [role, setRole] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(role); // You might want to validate the role or perform other actions here
    onClose(); // Close the modal after submitting
  };

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
      <h2>Enter Your Role</h2>
      <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default RoleModal;
