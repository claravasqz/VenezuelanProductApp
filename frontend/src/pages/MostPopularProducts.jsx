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
        <div className="popularProductsContainer">
            <h1 className="popularProductsTitle">Most Popular Products</h1>

            {loading ? (
                <div className="loadingMessage">Loading..</div>
            ) : error ? (
                <div className="errorMessage">Error: {error}</div>
            ) : (
            <ul className="popularProductsList">
                {products.map((product) => (
                    <li className="popularProductItem" key={product._id}>
                        {product.name} - ${product.price} (Views: {product.views})
                    </li>
                ))}
            </ul>
        )}
    </div>

    );
}

export default MostPopularProducts;