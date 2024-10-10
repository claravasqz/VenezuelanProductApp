import React from 'react';

function Home(){
    return(
        <div className="homeContainer">
            <h1 className="homeTitle">Venezuelan Product Finder</h1>
            <p className="homeDescription">Welcome! Choose how you want to search for products:</p>
            <div className="buttonGroup">
            <button className="homeButton" onClick={() => window.location.href= "/stores"}>Find by Store</button>
            <button className="homeButton" onClick={() => window.location.href = "/products"}>Find by Product</button>
            <button className="homeButton" onClick={() => window.location.href = "/popular-products"}>Most Popular Products</button>
            </div>
        </div>
    );
}

export default Home