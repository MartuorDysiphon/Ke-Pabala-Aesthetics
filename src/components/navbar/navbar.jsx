import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './navbar.css';

import Logo from '../../assets/Logo/IMG.jpg';

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    const { getTotalItems } = useCart();
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        setCartItemsCount(getTotalItems());
    }, [getTotalItems]);

    const closeMobileMenu = () => {
        setIsActive(false);
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
                    <img src={Logo} alt="Ke Pabala Aesthetics" />
                </Link>

                <ul className={`nav-menu ${isActive ? 'active' : ''}`}>
                    <li>
                        <Link 
                            to="/" 
                            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/hair" 
                            className={`nav-link ${location.pathname === '/hair' ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            Hair
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/iphones" 
                            className={`nav-link ${location.pathname === '/iphones' ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            iPhones
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/jeans" 
                            className={`nav-link ${location.pathname === '/jeans' ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            Jeans
                        </Link>
                    </li>
                </ul>

                <div className="nav-icons">
                    <a href="/" className="nav-icon" aria-label="Search">
                        <i className="fas fa-search"></i>
                    </a>
                    <Link to="/cart" className="nav-icon cart-icon" aria-label="Shopping Cart">
                        <i className="fas fa-shopping-bag"></i>
                        {cartItemsCount > 0 && (
                            <span className="cart-count">{cartItemsCount}</span>
                        )}
                    </Link>
                    <a href="/" className="nav-icon" aria-label="User Account">
                        <i className="fas fa-user"></i>
                    </a>
                </div>

                <div 
                    className="hamburger" 
                    onClick={() => setIsActive(!isActive)}
                    aria-label="Toggle menu"
                >
                    <i className={`fas ${isActive ? 'fa-times' : 'fa-bars'}`}></i>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;