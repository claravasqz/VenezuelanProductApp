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
        <div className="productContainer">
            <h1 className="productTitle">Find Products by Product Name</h1>

            {loading ? (
                <div className="loading">Loading..</div>
            ) : error ? ( 
                <div className="errorMessage">Error: {error}</div>
            ) : (
            <ul className="productList">
                {products.map((product) => (
                    <li className="productItem" key={product._id}>
                        {product.name} - ${product.price} ({product.category})
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
}

export default FindByProduct;
