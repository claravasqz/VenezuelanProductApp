import React, {useEffect, useState } from 'react';

function FindByStore() {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        const fetchStores = async() =>{
            const response = await fetch('http://localhost:3000/stores');
            const data = await response.json();
            setStores(data);
        };

        fetchStores();
    }, []);

    const viewProducts = async (storeId) => {
        const response = await fetch(`http://localhost:3000/stores/${storeId}`);
        const data = await response.json();
        setSelectedStore(data);
    };

    return(
        <div>
            <h1>Find Products by Store</h1>
            <ul>
                {stores.map((store) => (<li key={store._id}>   
                    {store.name} - {store.address}
                    <button onClick={() => viewProducts(store._id)}>View Products</button>
                </li>
            ))}
            </ul>

            {selectedStore && (
                <div>
                    <h2>Products in {selectedStore.name}</h2>
                    <ul>
                        {selectedStore.products.map((product) => (
                            <li key={product._id}>
                                {product.name} - ${product.price}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default FindByStore;