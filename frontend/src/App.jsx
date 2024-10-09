import React, { useState, useEffect } from 'react';
import Stores from './components/Stores';
import NewStoreForm from './components/NewStoreForm';
import './App.css';

function App() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const response = await fetch('http://localhost:3000/stores');
      const data = await response.json();
      setStores(data);
    };

    fetchStores();
  }, []); 

  const handleStoreAdded = (newStore) => {
    setStores([...stores, newStore]);
  };

  return (
    <div className="App">
      <h1>Venezuelan Product Finder</h1>
      <NewStoreForm onStoreAdded={handleStoreAdded} />
      <Stores stores={stores} />
    </div>
  );
}

export default App;
