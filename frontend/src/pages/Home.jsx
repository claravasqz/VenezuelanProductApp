import React from 'react';

function Home(){
    return(
        <div>
            <h1>Venezuelan Product Finder</h1>
            <p>Welcome! Choose how you want to search for products:</p>
            <button onClick={() => window.location.href= "/stores"}>Find by Store</button>
            <button onClick={() => window.location.href = "/products"}>Find by Product</button>
            <button onClick={() => window.location.href = "/popular-products"}>Most Popular Products</button>
        </div>
    );
}

export default Home