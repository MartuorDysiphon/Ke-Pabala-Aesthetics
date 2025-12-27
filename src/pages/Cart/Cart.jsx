import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useUser } from '@clerk/clerk-react';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
    const { isSignedIn } = useUser();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleQuantityChange = (item, newQuantity) => {
        if (isProcessing) return;
        
        setIsProcessing(true);
        
        const validatedQuantity = parseInt(newQuantity);
        
        if (isNaN(validatedQuantity) || validatedQuantity < 1) {
            removeFromCart(item.id, item.color, item.size);
        } else {
            updateQuantity(item.id, item.color, item.size, validatedQuantity);
        }
        
        setTimeout(() => setIsProcessing(false), 100);
    };

    const handleDirectInput = (item, e) => {
        if (isProcessing) return;
        
        const value = e.target.value;
        
        if (/^\d*$/.test(value)) {
            const newQuantity = parseInt(value) || 0;
            
            if (newQuantity === 0) {
                removeFromCart(item.id, item.color, item.size);
            } else {
                updateQuantity(item.id, item.color, item.size, newQuantity);
            }
        }
    };

    const handleBlur = (item, e) => {
        if (isProcessing) return;
        
        const value = e.target.value;
        if (value === '' || value === '0') {
            removeFromCart(item.id, item.color, item.size);
        }
    };

    const handleRemoveItem = (item) => {
        if (isProcessing) return;
        
        setIsProcessing(true);
        removeFromCart(item.id, item.color, item.size);
        setTimeout(() => setIsProcessing(false), 100);
    };

    const handleClearCartWithConfirmation = () => {
        if (cart.items.length === 0 || isProcessing) return;
        
        if (window.confirm('Are you sure you want to clear all items from your cart?')) {
            setIsProcessing(true);
            clearCart();
            setTimeout(() => setIsProcessing(false), 100);
        }
    };

    const handleCheckoutClick = (e) => {
        if (!isSignedIn) {
            e.preventDefault();
            if (window.confirm('Please sign in to proceed to checkout. Would you like to sign in now?')) {
                navigate('/sign-in?redirect_url=/checkout');
            }
        }
    };

    if (cart.items.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="empty-cart">
                        <i className="fas fa-shopping-bag empty-cart-icon"></i>
                        <h2>Your cart is empty</h2>
                        <p>Add some premium hair products to get started</p>
                        <Link to="/hair" className="hr-btn hr-btn-primary">
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <div className="cart-header">
                    <h1 className="cart-title">Shopping Cart</h1>
                    <button 
                        className="cart-clear-btn" 
                        onClick={handleClearCartWithConfirmation}
                        disabled={isProcessing}
                    >
                        Clear All
                    </button>
                </div>

                <div className="cart-content">
                    <div className="cart-items-section">
                        {cart.items.map((item) => (
                            <div key={`${item.id}-${item.color}-${item.size}`} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                
                                <div className="cart-item-details">
                                    <h3 className="cart-item-name">{item.displayName || item.name}</h3>
                                    <div className="cart-item-variants">
                                        <span className="variant-tag">{item.color}</span>
                                        <span className="variant-tag">{item.size}</span>
                                        {item.isPremiumColor && (
                                            <span className="variant-tag premium">+R100</span>
                                        )}
                                    </div>
                                    <div className="cart-item-price">
                                        R{parseFloat(item.price).toFixed(2)} each
                                    </div>
                                </div>

                                <div className="cart-item-controls">
                                    <div className="quantity-controls">
                                        <button
                                            className="quantity-btn"
                                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                            disabled={isProcessing}
                                        >
                                            −
                                        </button>
                                        <input
                                            type="text"
                                            className="quantity-display"
                                            value={item.quantity}
                                            onChange={(e) => handleDirectInput(item, e)}
                                            onBlur={(e) => handleBlur(item, e)}
                                            disabled={isProcessing}
                                            style={{
                                                textAlign: 'center',
                                                border: 'none',
                                                background: 'transparent',
                                                width: '30px',
                                                outline: 'none'
                                            }}
                                        />
                                        <button
                                            className="quantity-btn"
                                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                            disabled={isProcessing}
                                        >
                                            +
                                        </button>
                                    </div>
                                    
                                    <button
                                        className="remove-btn"
                                        onClick={() => handleRemoveItem(item)}
                                        disabled={isProcessing}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>

                                <div className="cart-item-total">
                                    R{(parseFloat(item.price) * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary-section">
                        <div className="cart-summary">
                            <h3 className="summary-title">Order Summary</h3>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>R{getTotalPrice().toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>R{getTotalPrice().toFixed(2)}</span>
                            </div>

                            <Link 
                                to="/checkout" 
                                className="hr-btn hr-btn-primary hr-btn-full"
                                onClick={handleCheckoutClick}
                            >
                                <i className="fas fa-lock"></i> 
                                {isSignedIn ? 'Proceed to Checkout' : 'Sign In to Checkout'}
                            </Link>
                            
                            <Link to="/hair" className="continue-shopping-link">
                                <i className="fas fa-arrow-left"></i> Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;