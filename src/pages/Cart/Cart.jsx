import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

    const handleQuantityChange = (productId, color, size, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId, color, size);
        } else {
            updateQuantity(productId, color, size, newQuantity);
        }
    };

    if (cart.items.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="empty-cart">
                        <i className="fas fa-shopping-bag"></i>
                        <h2>Your cart is empty</h2>
                        <p>Browse our collection and add some items to your cart</p>
                        <Link to="/hair" className="btn btn-accent">
                            Start Shopping
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
                    <h1 className="section-title">Shopping Cart</h1>
                    <button className="clear-cart-btn" onClick={clearCart}>
                        Clear Cart
                    </button>
                </div>

                <div className="cart-content">
                    <div className="cart-items">
                        {cart.items.map((item) => (
                            <div key={`${item.id}-${item.color}-${item.size}`} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                
                                <div className="cart-item-details">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p className="cart-item-variants">
                                        Color: {item.color} • Size: {item.size}
                                        {item.customColor && ` • Custom: ${item.customColor}`}
                                    </p>
                                    <p className="cart-item-price">
                                        R{(parseFloat(item.price) + (item.customColor ? 100 : 0)).toFixed(2)} each
                                    </p>
                                </div>

                                <div className="cart-item-controls">
                                    <div className="quantity-controls">
                                        <button
                                            className="quantity-btn"
                                            onClick={() => handleQuantityChange(item.id, item.color, item.size, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span className="quantity-display">{item.quantity}</span>
                                        <button
                                            className="quantity-btn"
                                            onClick={() => handleQuantityChange(item.id, item.color, item.size, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.id, item.color, item.size)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>

                                <div className="cart-item-total">
                                    R{((parseFloat(item.price) + (item.customColor ? 100 : 0)) * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Order Summary</h3>
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

                        <Link to="/checkout" className="btn btn-accent checkout-btn">
                            Proceed to Checkout
                        </Link>                       
                        
                        <Link to="/hair" className="continue-shopping">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;