// Checkout.jsx
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import ReceiptSlip from './ReceiptSlip/ReceiptSlip';
import './Checkout.css';

const Checkout = () => {
    const { cart, getTotalPrice, clearCart } = useCart();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        suburb: '',
        city: '',
        province: '',
        postalCode: '',
        deliveryMethod: 'standard',
        paymentMethod: 'bank-transfer'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [showReceipt, setShowReceipt] = useState(false);
    const [orderCart, setOrderCart] = useState(null);

    const provinces = [
        'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 
        'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape'
    ];

    const deliveryOptions = [
        { id: 'standard', name: 'Standard', time: '7-9 days', cost: 60 },
        { id: 'express', name: 'Express', time: '3-5 days', cost: 110 },
        { id: 'priority', name: 'Priority', time: '1-2 days', cost: 200 }
    ];

    const paymentMethods = [
        { id: 'bank-transfer', name: 'Bank Transfer', icon: 'university' },
        { id: 'capitec', name: 'Capitec to Capitec', icon: 'mobile-alt' },
        { id: 'payshap', name: 'PayShap', icon: 'bolt' },
        { id: 'layby', name: 'Layby', icon: 'calendar-plus' }
    ];

    const generateOrderNumber = () => {
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `KPA${timestamp}${random}`;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validation
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'suburb', 'city', 'province', 'postalCode'];
        const missingFields = requiredFields.filter(field => !formData[field]);
        
        if (missingFields.length > 0) {
            alert('Please fill in all required fields.');
            setIsSubmitting(false);
            return;
        }

        if (cart.items.length === 0) {
            alert('Your cart is empty.');
            setIsSubmitting(false);
            return;
        }

        try {
            const newOrderNumber = generateOrderNumber();
            setOrderNumber(newOrderNumber);
            
            // Store cart data before clearing
            const cartSnapshot = {
                items: [...cart.items],
                total: getTotalPrice ? getTotalPrice() : cart.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0)
            };
            setOrderCart(cartSnapshot);
            
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setOrderComplete(true);
            setShowReceipt(true);
            
            // Clear cart after showing receipt
            clearCart();
        } catch (error) {
            alert('Failed to process order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedDelivery = deliveryOptions.find(d => d.id === formData.deliveryMethod);
    const subtotal = getTotalPrice ? getTotalPrice() : cart.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    const deliveryCost = selectedDelivery ? selectedDelivery.cost : 0;
    const total = subtotal + deliveryCost;

    if (orderComplete && showReceipt) {
        return (
            <ReceiptSlip
                orderNumber={orderNumber}
                formData={formData}
                cart={orderCart || cart}
                delivery={selectedDelivery}
                subtotal={subtotal}
                total={total}
                onClose={() => setShowReceipt(false)}
            />
        );
    }

    if (orderComplete) {
        return (
            <div className="checkout-success">
                <div className="success-container">
                    <div className="success-icon">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <h1>Order Confirmed</h1>
                    <p className="order-number">#{orderNumber}</p>
                    
                    <div className="success-details">
                        <div className="detail-item">
                            <i className="fas fa-envelope"></i>
                            <div>
                                <h4>Receipt Sent</h4>
                                <p>Sent to: <strong>{formData.email}</strong></p>
                            </div>
                        </div>
                    </div>

                    <div className="success-actions">
                        <button 
                            className="btn btn-accent" 
                            onClick={() => setShowReceipt(true)}
                        >
                            <i className="fas fa-receipt"></i>
                            View Receipt
                        </button>
                        <button 
                            className="btn btn-secondary" 
                            onClick={() => window.location.href = '/'}
                        >
                            <i className="fas fa-shopping-bag"></i>
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout">
            <div className="checkout-container">
                <header className="checkout-header">
                    <h1 className="checkout-title">Complete Your Order</h1>
                </header>
                
                <div className="checkout-content">
                    <form className="checkout-form" onSubmit={handleSubmit}>
                        {/* Personal Information */}
                        <section className="form-section">
                            <h2 className="section-title">
                                <i className="fas fa-user"></i>
                                Personal Info
                            </h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>First Name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="First name"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Last name"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="your@email.com"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="071 234 5678"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                        </section>
                        
                        {/* Delivery Address */}
                        <section className="form-section">
                            <h2 className="section-title">
                                <i className="fas fa-map-marker-alt"></i>
                                Delivery Address
                            </h2>
                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label>Street Address *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="123 Main Street"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Suburb *</label>
                                    <input
                                        type="text"
                                        name="suburb"
                                        value={formData.suburb}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Suburb"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="City"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Province *</label>
                                    <select
                                        name="province"
                                        value={formData.province}
                                        onChange={handleInputChange}
                                        className="form-select"
                                        required
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Select Province</option>
                                        {provinces.map(province => (
                                            <option key={province} value={province}>
                                                {province}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Postal Code *</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Postal code"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                        </section>
                        
                        {/* Delivery Method */}
                        <section className="form-section">
                            <h2 className="section-title">
                                <i className="fas fa-truck"></i>
                                Delivery Method
                            </h2>
                            <div className="delivery-options">
                                {deliveryOptions.map(option => (
                                    <label 
                                        key={option.id} 
                                        className={`delivery-option ${formData.deliveryMethod === option.id ? 'selected' : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name="deliveryMethod"
                                            value={option.id}
                                            checked={formData.deliveryMethod === option.id}
                                            onChange={handleInputChange}
                                            className="delivery-radio"
                                            disabled={isSubmitting}
                                        />
                                        <div className="delivery-info">
                                            <div className="delivery-name">{option.name}</div>
                                            <div className="delivery-desc">{option.time} • R{option.cost}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </section>
                        
                        {/* Payment Method */}
                        <section className="form-section">
                            <h2 className="section-title">
                                <i className="fas fa-credit-card"></i>
                                Payment Method
                            </h2>
                            <div className="payment-options">
                                {paymentMethods.map(method => (
                                    <label 
                                        key={method.id}
                                        className={`payment-option ${formData.paymentMethod === method.id ? 'selected' : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.id}
                                            checked={formData.paymentMethod === method.id}
                                            onChange={handleInputChange}
                                            className="payment-radio"
                                            disabled={isSubmitting}
                                        />
                                        <i className={`fas fa-${method.icon} payment-icon`}></i>
                                        <div className="payment-name">{method.name}</div>
                                    </label>
                                ))}
                            </div>
                            
                            {/* Payment Details */}
                            <div className="payment-details">
                                {formData.paymentMethod === 'bank-transfer' && (
                                    <div className="bank-info">
                                        <p className="bank-info-title">Bank Transfer Details</p>
                                        <div className="bank-details">
                                            <div className="bank-row">
                                                <span>Bank:</span>
                                                <span>Capitec</span>
                                            </div>
                                            <div className="bank-row">
                                                <span>Account Holder:</span>
                                                <span>NJ Ntabanyane</span>
                                            </div>
                                            <div className="bank-row">
                                                <span>Account Number:</span>
                                                <span className="account-number">1764824367</span>
                                            </div>
                                            <div className="bank-row">
                                                <span>Branch Code:</span>
                                                <span>470010</span>
                                            </div>
                                        </div>
                                        <p className="bank-note">
                                            <i className="fas fa-hashtag"></i>
                                            Use order number as reference
                                        </p>
                                    </div>
                                )}
                                
                                {formData.paymentMethod === 'capitec' && (
                                    <div className="bank-info">
                                        <p className="bank-info-title">Capitec to Capitec</p>
                                        <div className="bank-details">
                                            <div className="bank-row">
                                                <span>Phone Number:</span>
                                                <span className="account-number">0712345678</span>
                                            </div>
                                            <div className="bank-row">
                                                <span>Account Holder:</span>
                                                <span>NJ Ntabanyane</span>
                                            </div>
                                        </div>
                                        <p className="bank-note">
                                            <i className="fas fa-mobile-alt"></i>
                                            Instant transfer via Capitec app
                                        </p>
                                    </div>
                                )}
                                
                                {formData.paymentMethod === 'payshap' && (
                                    <div className="bank-info">
                                        <p className="bank-info-title">PayShap Details</p>
                                        <div className="bank-details">
                                            <div className="bank-row">
                                                <span>PayShap ID:</span>
                                                <span className="account-number">0712345678</span>
                                            </div>
                                            <div className="bank-row">
                                                <span>Account Holder:</span>
                                                <span>NJ Ntabanyane</span>
                                            </div>
                                        </div>
                                        <p className="bank-note">
                                            <i className="fas fa-bolt"></i>
                                            Instant payment processing
                                        </p>
                                    </div>
                                )}
                                
                                {formData.paymentMethod === 'layby' && (
                                    <div className="bank-info">
                                        <p className="bank-info-title">Layby Agreement</p>
                                        <div className="bank-details">
                                            <div className="bank-row">
                                                <span>Deposit Required:</span>
                                                <span>R{(total * 0.2).toFixed(2)}</span>
                                            </div>
                                            <div className="bank-row">
                                                <span>Payment Period:</span>
                                                <span>3 Months</span>
                                            </div>
                                            <div className="bank-row">
                                                <span>Monthly Payments:</span>
                                                <span>R{((total * 0.8) / 3).toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="layby-rules">
                                            <p><strong>Layby Rules:</strong></p>
                                            <ul>
                                                <li>20% deposit required to start</li>
                                                <li>3-month payment period</li>
                                                <li>Items reserved until final payment</li>
                                                <li>No interest charges</li>
                                                <li>Cancellation fee may apply</li>
                                            </ul>
                                        </div>
                                        <p className="bank-note">
                                            <i className="fas fa-info-circle"></i>
                                            We'll contact you to set up payment schedule
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>
                        
                        <button 
                            type="submit" 
                            className="btn btn-accent place-order-btn"
                            disabled={isSubmitting || cart.items.length === 0}
                        >
                            {isSubmitting ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-lock"></i>
                                    Pay R{total.toFixed(2)}
                                </>
                            )}
                        </button>
                    </form>
                    
                    {/* Order Summary */}
                    <aside className="checkout-summary">
                        <h3 className="summary-title">Order Summary</h3>
                        
                        <div className="cart-items">
                            {cart.items.length === 0 ? (
                                <div className="empty-cart-message">
                                    <i className="fas fa-shopping-bag"></i>
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                cart.items.map((item, index) => (
                                    <div key={index} className="cart-item">
                                        <div className="item-image-container">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="item-image"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                            <div className="image-placeholder">
                                                <i className="fas fa-image"></i>
                                            </div>
                                            <span className="item-quantity-badge">{item.quantity}</span>
                                        </div>
                                        <div className="item-details">
                                            <div className="item-name">{item.name}</div>
                                            <div className="item-variants">
                                                {item.color && <span className="variant">{item.color}</span>}
                                                {item.size && <span className="variant">{item.size}</span>}
                                                {item.customColor && <span className="variant custom">Custom</span>}
                                            </div>
                                        </div>
                                        <div className="item-price">
                                            R{((parseFloat(item.price) + (item.customColor ? 100 : 0)) * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        {cart.items.length > 0 && (
                            <>
                                <div className="summary-totals">
                                    <div className="total-row">
                                        <span>Subtotal</span>
                                        <span>R{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="total-row">
                                        <span>Delivery</span>
                                        <span>R{deliveryCost.toFixed(2)}</span>
                                    </div>
                                    <div className="total-row final">
                                        <span>Total</span>
                                        <span>R{total.toFixed(2)}</span>
                                    </div>
                                </div>
                                
                                <div className="delivery-estimate">
                                    <div className="delivery-badge">
                                        <i className="fas fa-shipping-fast"></i>
                                        {selectedDelivery?.name}
                                    </div>
                                    <p className="delivery-time">{selectedDelivery?.time}</p>
                                </div>
                            </>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Checkout;