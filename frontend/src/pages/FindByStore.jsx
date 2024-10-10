import React, {useEffect, useState } from 'react';
import NewStoreForm from '../components/NewStoreForm';
import Stores from '../components/Stores';

function FindByStore() {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStores = async() =>{
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:3000/stores');
                if (!response.ok) {
                    throw new Error('Failed to fetch stores');
                }
            const data = await response.json();
            setStores(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

        fetchStores();
    }, []);

    const handleStoreAdded = (newStore) => {
        setStores([...stores, newStore]);
    };

    const handleStoreDeleted = (deletedStoreId) => {
        setStores(stores.filter((store) => store._id !== deletedStoreId));
        setSelectedStore(null);
    };

    const viewProducts = async (storeId) => {
        setLoading(true);
        setError(null);
        try{
        const response = await fetch(`http://localhost:3000/stores/${storeId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch store products');
        }
        const data = await response.json();
        setSelectedStore(data);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

    return(
        <div className="findByStoreContainer">
            <h1 className="storeTitle">Find Products by Store</h1>
            <NewStoreForm onStoreAdded={handleStoreAdded} />

            {loading ? (
            <div className="loadingMessage">Loading..</div>
            ) : error ? (
                <div className="errorMessage">Error: {error}</div>
            ) : (
                <Stores stores={stores} onStoreDeleted={handleStoreDeleted} viewProducts={viewProducts} />
                )}
            {selectedStore && !loading && !error && (
                <div className="selectedStoreDetails">
                    <h2 className="storeName">Products in {selectedStore.name}</h2>
            <ul className="productList">
                {selectedStore.products.map((product) => (
                    <li key={product._id} className="productItem">
                        {product.name} -${product.price}
                    </li>
                ))}
                </ul>
            </div>
            )}
        </div>
    );
}

export default FindByStore;