import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();

    return(
        <div className="homeContainer">
            <h1 className="homeTitle">Venezuelan Product Finder</h1>
            <p className="homeDescription">Welcome! Choose how you want to search for products:</p>
            <div className="buttonGroup">
            <button className="homeButton" onClick={() => navigate('/stores')}>Find by Store</button>
            <button className="homeButton" onClick={() => navigate('/products')}>Find by Product</button>
            <button className="homeButton" onClick={() => navigate ('/popular-products')}>Most Popular Products</button>
            </div>
        </div>
    );
}

export default Home