import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import './App.css';


import FindByStore from './pages/FindByStore';
import FindByProduct from './pages/FindByProduct';
import MostPopularProducts from './pages/MostPopularProducts';
import Home from './pages/Home';


function App() {

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li> <Link to="/">Home</Link></li>
            <li> <Link to="/stores">Find By Store</Link></li>
            <li><Link to="/products">Find by Product</Link></li>
            <li><Link to="/popular-products">Most Popular Products</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/stores" element={<FindByStore />}/>
          <Route path="/products" element={<FindByProduct />}/>
          <Route path="/popular-products" element={<MostPopularProducts />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
