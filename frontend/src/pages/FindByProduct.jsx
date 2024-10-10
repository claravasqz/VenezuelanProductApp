import React, {useEffect, useState} from 'react';

function FindByProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try{
                const response = await fetch('http://localhost:3000/products');
                if(!response.ok) {
                    throw new Error('Failed to fetch products');
                }
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };

    fetchProducts();
    }, []);

    return(
        <div>
            <h1>Find Products by Product Name</h1>

            {loading ? (
                <div>Loading..</div>
            ) : error ? ( 
                <div>Error: {error}</div>
            ) : (
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.name} - ${product.price} ({product.category})
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
}

export default FindByProduct;
