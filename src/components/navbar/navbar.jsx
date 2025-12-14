import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { UserButton, useUser, SignInButton } from '@clerk/clerk-react';
import SearchModal from '../SearchModal/SearchModal';
import { searchAllProducts } from '../utils/searchData';
import './navbar.css';

import Logo from '../../assets/Logo/IMG.png';

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({
        results: [],
        loading: false
    });
    
    const location = useLocation();
    const { getTotalItems } = useCart();
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const { isSignedIn } = useUser();
    const searchTimeoutRef = useRef(null);

    useEffect(() => {
        setCartItemsCount(getTotalItems());
    }, [getTotalItems]);

    // Debounced search function
    const performSearch = useCallback((query) => {
        if (!query.trim()) {
            setSearchResults({ results: [], loading: false });
            return;
        }

        // Clear previous timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        setSearchResults(prev => ({ ...prev, loading: true }));
        
        // Set new timeout for debouncing
        searchTimeoutRef.current = setTimeout(() => {
            try {
                const results = searchAllProducts(query);
                setSearchResults({
                    results,
                    loading: false
                });
            } catch (error) {
                console.error('Search failed:', error);
                setSearchResults({
                    results: [],
                    loading: false
                });
            }
        }, 300); // 300ms debounce
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        performSearch(query);
    };

    const openSearchModal = () => {
        setIsSearchOpen(true);
        setSearchQuery('');
        setSearchResults({ results: [], loading: false });
        // Close mobile menu if open
        setIsActive(false);
    };

    const closeSearchModal = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults({ results: [], loading: false });
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
    };

    const closeMobileMenu = () => {
        setIsActive(false);
    };

    const toggleMobileMenu = () => {
        setIsActive(!isActive);
    };

    // Close mobile menu when clicking overlay
    const handleOverlayClick = () => {
        setIsActive(false);
    };

    // Close search when changing pages
    useEffect(() => {
        closeSearchModal();
        setIsActive(false); // Also close mobile menu
    }, [location.pathname]);

    return (
        <>
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
                        <button 
                            onClick={openSearchModal}
                            className="nav-icon" 
                            aria-label="Search"
                            title="Search all products"
                        >
                            <i className="fas fa-search"></i>
                        </button>
                        <Link to="/cart" className="nav-icon cart-icon" aria-label="Shopping Cart" onClick={closeMobileMenu}>
                            <i className="fas fa-shopping-bag"></i>
                            {cartItemsCount > 0 && (
                                <span className="cart-count">{cartItemsCount}</span>
                            )}
                        </Link>
                        
                        {/* Clerk authentication - redirect version */}
                        {isSignedIn ? (
                            <UserButton 
                                appearance={{
                                    elements: {
                                        rootBox: "nav-icon",
                                        userButtonAvatarBox: "w-6 h-6"
                                    }
                                }} 
                            />
                        ) : (
                            <SignInButton mode="redirect" redirectUrl="/">
                                <button className="nav-icon" aria-label="Sign In">
                                    <i className="fas fa-user"></i>
                                </button>
                            </SignInButton>
                        )}
                    </div>

                    <div 
                        className="hamburger" 
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <i className={`fas ${isActive ? 'fa-times' : 'fa-bars'}`}></i>
                    </div>
                </div>
            </nav>

            {/* Overlay for mobile menu */}
            <div 
                className={`nav-overlay ${isActive ? 'active' : ''}`}
                onClick={handleOverlayClick}
            />

            <SearchModal
                isOpen={isSearchOpen}
                onClose={closeSearchModal}
                searchQuery={searchQuery}
                searchResults={searchResults}
                onSearch={handleSearch}
            />
        </>
    );
};

export default Navbar;