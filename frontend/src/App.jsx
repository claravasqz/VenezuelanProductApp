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
      <div className="appContainer">
        <nav className="navbar">
          <ul className="navbarList">
            <li className='navbarItem'> <Link className="navbarLink" to="/">Home</Link></li>
            <li className='navbarItem'> <Link className="navbarLink" to="/stores">Find By Store</Link></li>
            <li className='navbarItem'><Link className="navbarLink" to="/products">Find by Product</Link></li>
            <li className='navbarItem'><Link className="navbarLink" to="/popular-products">Most Popular Products</Link></li>
          </ul>
        </nav>
        <div className="content">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/stores" element={<FindByStore />}/>
          <Route path="/products" element={<FindByProduct />}/>
          <Route path="/popular-products" element={<MostPopularProducts />}/>
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
