import React, { useState } from 'react';

const NewProductForm = ({ storeId, onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { name, price: parseFloat(price), category, storeId };

    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const savedProduct = await response.json();
        onProductAdded(savedProduct);
        setName('');
        setPrice('');
        setCategory('');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Product Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Price:</label>
      <input
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <label>Category:</label>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <button type="submit">Add Product</button>
    </form>
  );
};

export default NewProductForm;
