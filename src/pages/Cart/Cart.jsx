import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(item.id, item.selectedColor, item.selectedLength);
        } else {
            updateQuantity(item.id, item.selectedColor, item.selectedLength, newQuantity);
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
                    <button className="cart-clear-btn" onClick={clearCart}>
                        Clear All
                    </button>
                </div>

                <div className="cart-content">
                    <div className="cart-items-section">
                        {cart.items.map((item) => (
                            <div key={`${item.id}-${item.selectedColor}-${item.selectedLength}`} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                
                                <div className="cart-item-details">
                                    <h3 className="cart-item-name">{item.displayName || item.name}</h3>
                                    <div className="cart-item-variants">
                                        <span className="variant-tag">{item.selectedColor}</span>
                                        <span className="variant-tag">{item.selectedLength}</span>
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
                                        >
                                            −
                                        </button>
                                        <span className="quantity-display">{item.quantity}</span>
                                        <button
                                            className="quantity-btn"
                                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedLength)}
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

                            <Link to="/checkout" className="hr-btn hr-btn-primary hr-btn-full">
                                <i className="fas fa-lock"></i> Proceed to Checkout
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