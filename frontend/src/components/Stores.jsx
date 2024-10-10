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
    <div className="storesContainer">
      <h2 className="storesTitle">Stores</h2>
      <ul className="storesList">
        {stores.map((store) => (
          <li className="storeItem" key={store._id}>
            {store.name} - {store.address}
            <div className="storeButtons"></div>
                <button className="viewDetailsButton" onClick={() => fetchStoreDetails(store._id)}>View Details</button>
                <button className="deleteStoreButton" onClick={() => deleteStore(store._id)}>Delete Store</button>
          </li>
        ))}
      </ul>


      {storeDetails && (
        <div className="storeDetails">
          <h3 className="storeDetailsTitle">{storeDetails.name} - {storeDetails.address}</h3>
          <h4 className="storeProductsTitle">Products:</h4>
          <ul className="productsList">
            {storeDetails.products.map((product) => (
              <li className="productItem" key={product._id}>
                {product.name} - {product.price}
                <button className="deleteProductButton" onClick={() => deleteProduct(product._id)}>Delete Product</button>
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
