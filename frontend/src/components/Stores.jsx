import React, { useEffect, useState } from 'react';
import NewProductForm from './NewProductForm';

const Stores = ({ stores }) => {
  const [storeDetails, setStoreDetails] = useState(null);

    const fetchStoreDetails = async (storeId) => {
        const response = await fetch(`http://localhost:3000/stores/${storeId}`);
        const data = await response.json();
        setStoreDetails(data);
    };

    const handleProductAdded = (newProduct) => {
        setStoreDetails({
          ...storeDetails,
          products: [...storeDetails.products, newProduct],
        });
      };

  return (
    <div>
      <h2>Stores</h2>
      <ul>
        {stores.map((store) => (
          <li key={store._id}>
            {store.name} - {store.address}
            <button onClick={() => fetchStoreDetails(store._id)}>View Details</button>
          </li>
        ))}
      </ul>
      {storeDetails && (
        <div>
          <h3>{storeDetails.name} - {storeDetails.address}</h3>
          <h4>Products:</h4>
          <ul>
            {storeDetails.products.map((product) => (
              <li key={product._id}>
                {product.name} - {product.price}
              </li>
            ))}
          </ul>

          <NewProductForm storeId={storeDetails._id} onProductAdded={handleProductAdded} />
        </div>
      )}
    </div>
  );
};

export default Stores;
