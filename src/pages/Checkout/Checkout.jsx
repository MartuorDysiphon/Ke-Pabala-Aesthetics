import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useUser, useAuth } from '@clerk/clerk-react';
import ReceiptSlip from './ReceiptSlip/ReceiptSlip';
import './Checkout.css';

const API_BASE = process.env.REACT_APP_API_URL || 'https://pabala-aesthetics.onrender.com/api';

const Checkout = () => {
    const { cart, getTotalPrice, clearCart } = useCart();
    const { isSignedIn, user } = useUser();
    const { userId } = useAuth();
    const navigate = useNavigate();
    
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
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [apiError, setApiError] = useState(null);

    // Pre-fill user data from Clerk when signed in
    useEffect(() => {
        if (isSignedIn && user) {
            const fullName = user.fullName || '';
            const names = fullName.split(' ');
            const firstName = names[0] || '';
            const lastName = names.length > 1 ? names.slice(1).join(' ') : '';
            
            const primaryEmail = user.primaryEmailAddress?.emailAddress || '';
            const phoneNumber = user.primaryPhoneNumber?.phoneNumber || '';
            
            setFormData(prev => ({
                ...prev,
                firstName: firstName || prev.firstName,
                lastName: lastName || prev.lastName,
                email: primaryEmail || prev.email,
                phone: phoneNumber || prev.phone
            }));
        }
    }, [isSignedIn, user]);

    // Redirect if not signed in and cart has items
    useEffect(() => {
        if (!isSignedIn && cart.items.length > 0) {
            setShowLoginPrompt(true);
        }
    }, [isSignedIn, cart.items.length]);

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
        { id: 'bank-transfer', name: 'Bank', icon: 'university', color: '#1d1d1f' },
        { id: 'capitec', name: 'Capitec', icon: 'mobile-alt', color: '#007AFF' },
        { id: 'payshap', name: 'PayShap', icon: 'bolt', color: '#FF9500' },
        { id: 'layby', name: 'Layby', icon: 'calendar-plus', color: '#34C759' }
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
        setApiError(null);
        
        // Check authentication
        if (!isSignedIn) {
            setShowLoginPrompt(true);
            return;
        }

        // Validation
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'suburb', 'city', 'province', 'postalCode'];
        const missingFields = requiredFields.filter(field => !formData[field]);
        
        if (missingFields.length > 0) {
            alert('Please fill in all required fields.');
            return;
        }

        if (cart.items.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Phone validation
        const phoneRegex = /^(\+27|0)[1-9][0-9]{8}$/;
        const cleanedPhone = formData.phone.replace(/\s/g, '');
        if (!phoneRegex.test(cleanedPhone)) {
            alert('Please enter a valid South African phone number.');
            return;
        }

        setIsSubmitting(true);

        try {
            const newOrderNumber = generateOrderNumber();
            setOrderNumber(newOrderNumber);
            
            const cartSnapshot = {
                items: [...cart.items],
                total: getTotalPrice()
            };
            setOrderCart(cartSnapshot);

            const selectedDelivery = deliveryOptions.find(d => d.id === formData.deliveryMethod);
            const subtotal = getTotalPrice();
            const deliveryCost = selectedDelivery?.cost || 0;
            const total = subtotal + deliveryCost;

            // Run both API calls in parallel for faster execution
            const apiCalls = [];

            // Formspree Integration (non-critical - can fail silently)
            const formspreePromise = fetch('https://formspree.io/f/mjgewery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    _subject: `New Order #${newOrderNumber} - Ke Pabala Aesthetics`,
                    orderNumber: newOrderNumber,
                    customerName: `${formData.firstName} ${formData.lastName}`,
                    customerEmail: formData.email,
                    customerPhone: formData.phone,
                    deliveryAddress: `${formData.address}, ${formData.suburb}, ${formData.city}, ${formData.province} ${formData.postalCode}`,
                    cartItems: cart.items.map(item => `${item.quantity}x ${item.name} (R${item.price})`).join(', '),
                    deliveryMethod: selectedDelivery?.name,
                    paymentMethod: formData.paymentMethod,
                    subtotal: `R${subtotal.toFixed(2)}`,
                    deliveryCost: `R${deliveryCost.toFixed(2)}`,
                    total: `R${total.toFixed(2)}`,
                    _replyto: formData.email
                })
            }).catch(err => console.warn('Formspree notification failed:', err));

            apiCalls.push(formspreePromise);

            // Backend order creation
            const backendPromise = fetch(`${API_BASE}/orders/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart.items,
                    customerInfo: formData,
                    deliveryMethod: selectedDelivery,
                    paymentMethod: formData.paymentMethod,
                    subtotal: subtotal,
                    deliveryCost: deliveryCost,
                    total: total,
                    userId: userId,
                    userEmail: formData.email,
                    orderNumber: newOrderNumber
                })
            }).catch(err => console.error('Backend order creation failed:', err));

            apiCalls.push(backendPromise);

            // Wait for both API calls to complete (or timeout after 5 seconds)
            await Promise.race([
                Promise.all(apiCalls),
                new Promise(resolve => setTimeout(resolve, 5000)) // 5 second timeout
            ]);

            // Clear cart and complete order immediately
            clearCart();
            setOrderComplete(true);
            setShowReceipt(true);
            
        } catch (error) {
            console.error('Order processing error:', error);
            setApiError('Failed to process order. Please try again.');
            alert('Failed to process order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedDelivery = deliveryOptions.find(d => d.id === formData.deliveryMethod);
    const subtotal = getTotalPrice();
    const deliveryCost = selectedDelivery ? selectedDelivery.cost : 0;
    const total = subtotal + deliveryCost;

    // Show login prompt if not authenticated
    if (showLoginPrompt) {
        return (
            <div className="Checkout__login-prompt">
                <div className="Checkout__login-container">
                    <div className="Checkout__login-icon">
                        <i className="fas fa-user-lock"></i>
                    </div>
                    <h2 className="Checkout__login-title">Sign In Required</h2>
                    <p className="Checkout__login-message">
                        Please sign in to complete your checkout. Your cart items have been saved.
                    </p>
                    <div className="Checkout__login-actions">
                        <button 
                            className="Checkout__btn Checkout__btn-accent"
                            onClick={() => navigate('/sign-in?redirect_url=/checkout')}
                        >
                            <i className="fas fa-sign-in-alt"></i>
                            Sign In
                        </button>
                        <button 
                            className="Checkout__btn Checkout__btn-secondary"
                            onClick={() => navigate('/')}
                        >
                            <i className="fas fa-home"></i>
                            Return Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
            <div className="Checkout__success">
                <div className="Checkout__success-container">
                    <div className="Checkout__success-icon">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <h1 className="Checkout__success-title">Order Confirmed</h1>
                    <p className="Checkout__order-number">#{orderNumber}</p>
                    
                    <div className="Checkout__success-grid">
                        <div className="Checkout__success-card">
                            <i className="fas fa-envelope"></i>
                            <div>
                                <h4>Order Confirmed</h4>
                                <p>Order #{orderNumber}</p>
                            </div>
                        </div>
                        <div className="Checkout__success-card">
                            <i className="fas fa-truck"></i>
                            <div>
                                <h4>Delivery</h4>
                                <p>{selectedDelivery?.name} · {selectedDelivery?.time}</p>
                            </div>
                        </div>
                        <div className="Checkout__success-card">
                            <i className="fas fa-credit-card"></i>
                            <div>
                                <h4>Payment</h4>
                                <p>{paymentMethods.find(p => p.id === formData.paymentMethod)?.name}</p>
                            </div>
                        </div>
                    </div>

                    <div className="Checkout__success-actions">
                        <button 
                            className="Checkout__btn Checkout__btn-accent" 
                            onClick={() => setShowReceipt(true)}
                        >
                            <i className="fas fa-receipt"></i>
                            View Receipt
                        </button>
                        <button 
                            className="Checkout__btn Checkout__btn-secondary" 
                            onClick={() => window.location.href = '/'}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="Checkout">
            <div className="Checkout__container">
                <header className="Checkout__header">
                    <h1 className="Checkout__title">Complete Order</h1>
                    {isSignedIn && (
                        <div className="Checkout__user-info">
                            <i className="fas fa-user-check"></i>
                            <span>Signed in as {user?.fullName || user?.primaryEmailAddress?.emailAddress}</span>
                        </div>
                    )}
                </header>
                
                <div className="Checkout__content">
                    <div className="Checkout__main">
                        <form className="Checkout__form" onSubmit={handleSubmit}>
                            {/* Personal Info */}
                            <section className="Checkout__section">
                                <h3 className="Checkout__section-title">
                                    Personal Information
                                    {isSignedIn && <span className="Checkout__auto-filled">Auto-filled from your account</span>}
                                </h3>
                                <div className="Checkout__form-grid">
                                    <div className="Checkout__form-group">
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="Checkout__input"
                                            placeholder="First name"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="Checkout__form-group">
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="Checkout__input"
                                            placeholder="Last name"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="Checkout__form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="Checkout__input"
                                            placeholder="your@email.com"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="Checkout__form-group">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="Checkout__input"
                                            placeholder="071 234 5678"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                            </section>
                            
                            {/* Address */}
                            <section className="Checkout__section">
                                <h3 className="Checkout__section-title">Delivery Address</h3>
                                <div className="Checkout__form-grid">
                                    <div className="Checkout__form-group Checkout__form-group-full">
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="Checkout__input"
                                            placeholder="Street address"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="Checkout__form-group">
                                        <input
                                            type="text"
                                            name="suburb"
                                            value={formData.suburb}
                                            onChange={handleInputChange}
                                            className="Checkout__input"
                                            placeholder="Suburb"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="Checkout__form-group">
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="Checkout__input"
                                            placeholder="City"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="Checkout__form-group">
                                        <select
                                            name="province"
                                            value={formData.province}
                                            onChange={handleInputChange}
                                            className="Checkout__select"
                                            required
                                            disabled={isSubmitting}
                                        >
                                            <option value="">Province</option>
                                            {provinces.map(province => (
                                                <option key={province} value={province}>
                                                    {province}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="Checkout__form-group">
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            className="Checkout__input"
                                            placeholder="Postal code"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                            </section>
                            
                            {/* Delivery */}
                            <section className="Checkout__section">
                                <h3 className="Checkout__section-title">Delivery Method</h3>
                                <div className="Checkout__delivery-grid">
                                    {deliveryOptions.map(option => (
                                        <label 
                                            key={option.id} 
                                            className={`Checkout__delivery-option ${formData.deliveryMethod === option.id ? 'Checkout__delivery-option-selected' : ''}`}
                                        >
                                            <input
                                                type="radio"
                                                name="deliveryMethod"
                                                value={option.id}
                                                checked={formData.deliveryMethod === option.id}
                                                onChange={handleInputChange}
                                                className="Checkout__delivery-radio"
                                                disabled={isSubmitting}
                                            />
                                            <div className="Checkout__delivery-info">
                                                <div className="Checkout__delivery-name">{option.name}</div>
                                                <div className="Checkout__delivery-desc">{option.time}</div>
                                            </div>
                                            <div className="Checkout__delivery-price">R{option.cost}</div>
                                        </label>
                                    ))}
                                </div>
                            </section>
                            
                            {/* Payment */}
                            <section className="Checkout__section">
                                <h3 className="Checkout__section-title">Payment Method</h3>
                                <div className="Checkout__payment-grid">
                                    {paymentMethods.map(method => (
                                        <label 
                                            key={method.id}
                                            className={`Checkout__payment-option ${formData.paymentMethod === method.id ? 'Checkout__payment-option-selected' : ''}`}
                                            style={{ '--payment-color': method.color }}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method.id}
                                                checked={formData.paymentMethod === method.id}
                                                onChange={handleInputChange}
                                                className="Checkout__payment-radio"
                                                disabled={isSubmitting}
                                            />
                                            <i className={`fas fa-${method.icon} Checkout__payment-icon`}></i>
                                            <div className="Checkout__payment-name">{method.name}</div>
                                        </label>
                                    ))}
                                </div>
                                
                                {/* Payment Details */}
                                <div className="Checkout__payment-details">
                                    {formData.paymentMethod === 'bank-transfer' && (
                                        <div className="Checkout__bank-info">
                                            <div className="Checkout__bank-row">
                                                <span>Bank:</span>
                                                <span>Capitec</span>
                                            </div>
                                            <div className="Checkout__bank-row">
                                                <span>Account Number:</span>
                                                <span className="Checkout__account-number">1764824367</span>
                                            </div>
                                            <div className="Checkout__bank-row">
                                                <span>Reference:</span>
                                                <span className="Checkout__reference">Order number</span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {formData.paymentMethod === 'capitec' && (
                                        <div className="Checkout__bank-info">
                                            <div className="Checkout__bank-row">
                                                <span>Phone Number:</span>
                                                <span className="Checkout__account-number">0712345678</span>
                                            </div>
                                            <div className="Checkout__bank-row">
                                                <span>Account Holder:</span>
                                                <span>NJ Ntabanyane</span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {formData.paymentMethod === 'payshap' && (
                                        <div className="Checkout__bank-info">
                                            <div className="Checkout__bank-row">
                                                <span>PayShap ID:</span>
                                                <span className="Checkout__account-number">0712345678</span>
                                            </div>
                                            <div className="Checkout__bank-row">
                                                <span>Account Holder:</span>
                                                <span>NJ Ntabanyane</span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {formData.paymentMethod === 'layby' && (
                                        <div className="Checkout__bank-info">
                                            <div className="Checkout__bank-row">
                                                <span>Deposit:</span>
                                                <span>R{(total * 0.2).toFixed(2)}</span>
                                            </div>
                                            <div className="Checkout__bank-row">
                                                <span>3 Monthly:</span>
                                                <span>R{((total * 0.8) / 3).toFixed(2)}</span>
                                            </div>
                                            <div className="Checkout__bank-note">
                                                We'll contact you to set up payment schedule
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                            
                            {apiError && (
                                <div className="Checkout__error-message" style={{ color: '#ff3b30', textAlign: 'center', marginBottom: '1rem' }}>
                                    <i className="fas fa-exclamation-circle"></i> {apiError}
                                </div>
                            )}
                            
                            <button 
                                type="submit" 
                                className="Checkout__submit-btn"
                                disabled={isSubmitting || cart.items.length === 0 || !isSignedIn}
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-lock"></i>
                                        {isSignedIn ? `Complete Order · R${total.toFixed(2)}` : 'Sign In Required'}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                    
                    {/* Order Summary */}
                    <aside className="Checkout__sidebar">
                        <div className="Checkout__summary">
                            <h3 className="Checkout__summary-title">Order Summary</h3>
                            
                            <div className="Checkout__cart-items">
                                {cart.items.length === 0 ? (
                                    <div className="Checkout__empty-cart">
                                        <i className="fas fa-shopping-bag"></i>
                                        <p>Your cart is empty</p>
                                    </div>
                                ) : (
                                    cart.items.map((item, index) => (
                                        <div key={index} className="Checkout__cart-item">
                                            <div className="Checkout__item-image">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        if (e.target.nextSibling) {
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }
                                                    }}
                                                />
                                                <div className="Checkout__image-placeholder">
                                                    <i className="fas fa-image"></i>
                                                </div>
                                                <span className="Checkout__item-quantity">{item.quantity}</span>
                                            </div>
                                            <div className="Checkout__item-details">
                                                <div className="Checkout__item-name">{item.name}</div>
                                                <div className="Checkout__item-variants">
                                                    {item.color && <span>{item.color}</span>}
                                                    {item.size && <span>{item.size}</span>}
                                                    {item.customColor && <span className="Checkout__custom-badge">Custom</span>}
                                                </div>
                                            </div>
                                            <div className="Checkout__item-price">
                                                R{((parseFloat(item.price) + (item.customColor ? 100 : 0)) * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            
                            {cart.items.length > 0 && (
                                <>
                                    <div className="Checkout__totals">
                                        <div className="Checkout__total-row">
                                            <span>Subtotal</span>
                                            <span>R{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="Checkout__total-row">
                                            <span>Delivery</span>
                                            <span>R{deliveryCost.toFixed(2)}</span>
                                        </div>
                                        <div className="Checkout__total-row Checkout__total-final">
                                            <span>Total</span>
                                            <span>R{total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="Checkout__delivery-info">
                                        <div className="Checkout__delivery-badge">
                                            <i className="fas fa-shipping-fast"></i>
                                            {selectedDelivery?.name}
                                        </div>
                                        <p className="Checkout__delivery-time">{selectedDelivery?.time}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Checkout;