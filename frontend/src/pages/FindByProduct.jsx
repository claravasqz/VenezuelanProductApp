import React, {useEffect, useState} from 'react';

function FindByProduct() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3000/products');
            const data = await response.json();
            setProducts(data);
        };

    fetchProducts();
    }, []);

    return(
        <div>
            <h1>Find Products by Product Name</h1>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.name} - ${product.price} ({product.category})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FindByProduct;
