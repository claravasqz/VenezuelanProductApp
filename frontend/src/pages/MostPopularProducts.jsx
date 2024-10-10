import React, {useEffect, useState } from 'react';

function MostPopularProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopularProducts = async () => {
            setLoading(true);
            setError(null);
            try{
            const response = await fetch('http://localhost:3000/products/popular');
            if (!response.ok) {
                throw new Error('Failed to fetch popular products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchPopularProducts();
    }, []);

    return(
        <div>
            <h1>Most Popular Products</h1>

            {loading ? (
                <div>Loading..</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.name} - ${product.price} (Views: {product.views})
                    </li>
                ))}
            </ul>
        )}
    </div>
    
    );
}

export default MostPopularProducts;