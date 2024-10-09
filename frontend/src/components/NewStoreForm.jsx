import React, { useState } from 'react';

const NewStoreForm = ({ onStoreAdded }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStore = { name, address };

    try {
      const response = await fetch('http://localhost:3000/stores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStore),
      });

      if (response.ok) {
        const savedStore = await response.json();
        onStoreAdded(savedStore); 
        setName('');
        setAddress('');
      }
    } catch (error) {
      console.error('Error adding store:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <label>Store Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Store Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      <button type="submit">Add Store</button>
    </form>
  );
};

export default NewStoreForm;
