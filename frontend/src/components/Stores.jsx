import React, { useEffect, useState } from 'react';
import NewProductForm from './NewProductForm';

const Stores = ({ stores, onStoreDeleted, viewProducts }) => {
  const [storeDetails, setStoreDetails] = useState(null);

    const fetchStoreDetails = async (storeId) => {
    try {
        const response = await fetch(`http://localhost:3000/stores/${storeId}`);
        const data = await response.json();
        setStoreDetails(data);
    } catch (error) {
        console.error('Error fetching store details:', error);
    }
};

    const handleProductAdded = (newProduct) => {
        setStoreDetails({
          ...storeDetails,
          products: [...storeDetails.products, newProduct],
        });
      };

    const deleteStore = async (storeId) => {
        try{
            const response = await fetch(`http://localhost:3000/stores/${storeId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                onStoreDeleted(storeId);
                setStoreDetails(null);
            }
        } catch (error) {
            console.error('Error deleting store:', error);
        }
    };

    const deleteProduct = async (productId) => {
        try{
            const response = await fetch(`http://localhost:3000/products/${productId}`, {
                method: 'DELETE'
            });
            if(response.ok) {
                setStoreDetails({
                    ...storeDetails,
                    products: storeDetails.products.filter((product) => product._id !== productId),
                });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };


  return (
    <div>
      <h2>Stores</h2>
      <ul>
        {stores.map((store) => (
          <li key={store._id}>
            {store.name} - {store.address}
            <button onClick={() => fetchStoreDetails(store._id)}>View Details</button>
            <button onClick={() => deleteStore(store._id)}>Delete Store</button>
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
                <button onClick={() => deleteProduct(product._id)}>Delete Product</button>
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
