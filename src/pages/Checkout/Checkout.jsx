import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

const Checkout = () => {
    const { cart, getTotalPrice, clearCart } = useCart();
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    // FormBackend Configuration - Optional for local testing
    const FORMBACKEND_FORM_ID = process.env.REACT_APP_FORMBACKEND_FORM_ID;

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        streetAddress: '',
        suburb: '',
        city: '',
        province: '',
        postalCode: '',
        deliveryMethod: 'paxi-7-9',
        paymentMethod: 'bank-transfer',
        bankName: ''
    });

    const southAfricanProvinces = [
        'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 
        'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape'
    ];

    const deliveryOptions = [
        { value: 'paxi-7-9', label: 'Paxi (7-9 working days) - R60', cost: 60 },
        { value: 'paxi-3-5', label: 'Paxi (3-5 working days) - R110', cost: 110 },
        { value: 'courrier-guy', label: 'Courier Guy (1-2 working days) - R200', cost: 200 }
    ];

    const paymentMethods = [
        { value: 'bank-transfer', label: 'Bank Transfer', icon: 'fas fa-university' },
        { value: 'capitec', label: 'Capitec to Capitec', icon: 'fas fa-mobile-alt' },
        { value: 'payshap', label: 'PayShap', icon: 'fas fa-bolt' },
        { value: 'layby', label: 'Layby', icon: 'fas fa-calendar-plus' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const generateOrderNumber = () => {
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `KPA${timestamp}${random}`;
    };

    const simulateFormSubmission = async (orderData) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For testing, just return success
        return { success: true, data: { message: 'Order received successfully' } };
    };

    const submitToFormBackend = async (orderData) => {
        const selectedDelivery = deliveryOptions.find(d => d.value === formData.deliveryMethod);
        const subtotal = getTotalPrice();
        const deliveryCost = selectedDelivery ? selectedDelivery.cost : 0;
        const total = subtotal + deliveryCost;

        // Format order items for submission
        const orderItems = orderData.cartItems.map(item => ({
            name: item.name,
            color: item.color,
            size: item.size,
            quantity: item.quantity,
            price: (parseFloat(item.price) + (item.customColor ? 100 : 0)).toFixed(2),
            total: ((parseFloat(item.price) + (item.customColor ? 100 : 0)) * item.quantity).toFixed(2)
        }));

        const submissionData = {
            // Customer Information
            firstName: orderData.customerInfo.firstName,
            lastName: orderData.customerInfo.lastName,
            email: orderData.customerInfo.email,
            phone: orderData.customerInfo.phone,
            
            // Delivery Address
            streetAddress: orderData.customerInfo.streetAddress,
            suburb: orderData.customerInfo.suburb,
            city: orderData.customerInfo.city,
            province: orderData.customerInfo.province,
            postalCode: orderData.customerInfo.postalCode,
            
            // Order Details
            orderNumber: orderData.orderNumber,
            deliveryMethod: selectedDelivery.label,
            paymentMethod: orderData.customerInfo.paymentMethod,
            subtotal: `R${subtotal.toFixed(2)}`,
            deliveryCost: `R${deliveryCost.toFixed(2)}`,
            total: `R${total.toFixed(2)}`,
            
            // Order Items
            orderItems: JSON.stringify(orderItems),
            itemCount: orderData.cartItems.length.toString(),
            
            // Timestamp
            orderDate: new Date().toLocaleString('en-ZA')
        };

        try {
            const response = await fetch(`https://formbackend.com/forms/${FORMBACKEND_FORM_ID}/submissions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData)
            });

            if (!response.ok) {
                throw new Error(`Form submission failed: ${response.status}`);
            }

            const result = await response.json();
            return { success: true, data: result };
        } catch (error) {
            console.error('FormBackend submission error:', error);
            return { success: false, error: error.message };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        // Basic form validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
            setSubmitError('Please fill in all required personal information fields.');
            setIsSubmitting(false);
            return;
        }

        if (!formData.streetAddress || !formData.suburb || !formData.city || !formData.province || !formData.postalCode) {
            setSubmitError('Please complete all delivery address fields.');
            setIsSubmitting(false);
            return;
        }

        if (cart.items.length === 0) {
            setSubmitError('Your cart is empty. Please add items before checking out.');
            setIsSubmitting(false);
            return;
        }

        try {
            // Generate order number
            const newOrderNumber = generateOrderNumber();
            setOrderNumber(newOrderNumber);

            const selectedDelivery = deliveryOptions.find(d => d.value === formData.deliveryMethod);
            const subtotal = getTotalPrice();
            const deliveryCost = selectedDelivery ? selectedDelivery.cost : 0;
            const total = subtotal + deliveryCost;

            // Prepare order data
            const orderData = {
                orderNumber: newOrderNumber,
                customerInfo: formData,
                cartItems: cart.items,
                delivery: selectedDelivery,
                subtotal: subtotal,
                deliveryCost: deliveryCost,
                total: total,
                timestamp: new Date().toISOString()
            };

            let result;

            // Check if FormBackend is configured, otherwise use simulation
            if (FORMBACKEND_FORM_ID) {
                console.log('Submitting to FormBackend...');
                result = await submitToFormBackend(orderData);
            } else {
                console.log('FormBackend not configured - using simulation');
                console.log('Order Data:', orderData);
                result = await simulateFormSubmission(orderData);
            }

            if (result.success) {
                // Clear cart and show success
                clearCart();
                setOrderComplete(true);
                
                // Log order details for testing
                console.log('Order completed successfully:', {
                    orderNumber: newOrderNumber,
                    customer: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    total: total
                });
            } else {
                throw new Error(result.error || 'Form submission failed');
            }
            
        } catch (error) {
            console.error('Order processing error:', error);
            setSubmitError('Failed to process order. Please try again or contact us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedDelivery = deliveryOptions.find(d => d.value === formData.deliveryMethod);
    const subtotal = getTotalPrice();
    const deliveryCost = selectedDelivery ? selectedDelivery.cost : 0;
    const total = subtotal + deliveryCost;

    if (orderComplete) {
        return (
            <div className="checkout">
                <div className="checkout__container">
                    <div className="order-success">
                        {/* Development Mode Banner */}
                        {!FORMBACKEND_FORM_ID && (
                            <div className="development__banner">
                                <i className="fas fa-code development__banner-icon"></i>
                                <div className="development__banner-content">
                                    <h4>Development Mode</h4>
                                    <p>Form submission is simulated. No actual order has been placed.</p>
                                    <p>Configure FormBackend for production use.</p>
                                </div>
                            </div>
                        )}

                        {/* Success Icon and Header */}
                        <div className="success__icon">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h1 className="order-success__title">Order Confirmed</h1>
                        <p className="order-success__number">Order Number: <strong>{orderNumber}</strong></p>
                        
                        {/* Email Confirmation */}
                        <div className="email__confirmation">
                            <div className="email__sent">
                                <i className="fas fa-envelope email__icon"></i>
                                <div className="email__content">
                                    <h4>Order Received</h4>
                                    <p>Your order has been processed successfully</p>
                                    {!FORMBACKEND_FORM_ID && (
                                        <p className="development__note">(Email simulation in development mode)</p>
                                    )}
                                </div>
                            </div>
                            <div className="email__sent">
                                <i className="fas fa-store email__icon"></i>
                                <div className="email__content">
                                    <h4>Ready for Processing</h4>
                                    <p>We&apos;ll prepare your items for delivery</p>
                                </div>
                            </div>
                        </div>

                        {/* Premium Professional Receipt */}
                        <div className="professional__receipt">
                            {/* Receipt Header with Logo */}
                            <div className="receipt__header">
                                <div className="brand__section">
                                    <div className="logo__container">
                                        <img 
                                            src="/assets/IMG.jpg" 
                                            alt="Ke Pabala Aesthetics" 
                                            className="premium__logo"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                            }}
                                        />
                                        <div className="logo__fallback">
                                            <div className="logo__placeholder">KPA</div>
                                        </div>
                                    </div>
                                    <div className="brand__details">
                                        <h1 className="brand__title">KE PABALA AESTHETICS</h1>
                                        <p className="brand__tagline">Luxury Hair & Beauty</p>
                                        <p className="brand__contact">Johannesburg, South Africa</p>
                                    </div>
                                </div>
                                
                                <div className="receipt__meta">
                                    <div className="order__badge">
                                        <i className="fas fa-check-circle"></i>
                                        ORDER CONFIRMED
                                    </div>
                                    <div className="receipt__date">
                                        {new Date().toLocaleDateString('en-ZA', { 
                                            weekday: 'long', 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="receipt__section">
                                <div className="section__header">
                                    <i className="fas fa-box-open section__icon"></i>
                                    <h3 className="section__title">ORDER SUMMARY</h3>
                                </div>
                                
                                <div className="premium__items">
                                    {cart.items.map((item, index) => (
                                        <div key={index} className="premium__item">
                                            <div className="item__image-container">
                                                <img src={item.image} alt={item.name} className="item__image" />
                                                <span className="item__quantity">{item.quantity}</span>
                                            </div>
                                            <div className="item__details">
                                                <h4 className="item__name">{item.name}</h4>
                                                <p className="item__variants">
                                                    <span className="variant__chip">{item.color}</span>
                                                    <span className="variant__chip">{item.size}</span>
                                                    {item.customColor && <span className="variant__chip variant__chip--custom">Custom Color</span>}
                                                </p>
                                            </div>
                                            <div className="item__total">
                                                R{((parseFloat(item.price) + (item.customColor ? 100 : 0)) * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pricing Breakdown */}
                                <div className="pricing__breakdown">
                                    <div className="price__row">
                                        <span>Subtotal</span>
                                        <span>R{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="price__row">
                                        <span>Delivery</span>
                                        <span>R{deliveryCost.toFixed(2)}</span>
                                    </div>
                                    <div className="price__row price__row--total">
                                        <span>
                                            <i className="fas fa-receipt"></i>
                                            TOTAL AMOUNT DUE
                                        </span>
                                        <span>R{total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Instructions */}
                            <div className="receipt__section">
                                <div className="section__header">
                                    <i className="fas fa-credit-card section__icon"></i>
                                    <h3 className="section__title">PAYMENT INSTRUCTIONS</h3>
                                </div>
                                
                                <div className="payment__instructions">
                                    <div className="payment__badge">
                                        {formData.paymentMethod.toUpperCase().replace('-', ' ')}
                                    </div>
                                    
                                    <div className="bank__details">
                                        {formData.paymentMethod === 'bank-transfer' && (
                                            <>
                                                <div className="bank__row">
                                                    <span>Bank:</span>
                                                    <span>Standard Bank</span>
                                                </div>
                                                <div className="bank__row">
                                                    <span>Account Holder:</span>
                                                    <span>Ke Pabala Aesthetics</span>
                                                </div>
                                                <div className="bank__row">
                                                    <span>Account Number:</span>
                                                    <span className="account__number">0123456789</span>
                                                </div>
                                                <div className="bank__row">
                                                    <span>Branch Code:</span>
                                                    <span>051001</span>
                                                </div>
                                            </>
                                        )}
                                        
                                        {formData.paymentMethod === 'capitec' && (
                                            <>
                                                <div className="bank__row">
                                                    <span>Bank:</span>
                                                    <span>Capitec</span>
                                                </div>
                                                <div className="bank__row">
                                                    <span>Account Holder:</span>
                                                    <span>Ke Pabala Aesthetics</span>
                                                </div>
                                                <div className="bank__row">
                                                    <span>Account Number:</span>
                                                    <span className="account__number">0123456789</span>
                                                </div>
                                            </>
                                        )}
                                        
                                        {formData.paymentMethod === 'payshap' && (
                                            <>
                                                <div className="bank__row">
                                                    <span>Service:</span>
                                                    <span>PayShap</span>
                                                </div>
                                                <div className="bank__row">
                                                    <span>Recipient:</span>
                                                    <span>Ke Pabala Aesthetics</span>
                                                </div>
                                                <div className="bank__row">
                                                    <span>PayShap ID:</span>
                                                    <span className="account__number">0712345678</span>
                                                </div>
                                            </>
                                        )}
                                        
                                        {formData.paymentMethod === 'layby' && (
                                            <>
                                                <div className="bank__row">
                                                    <span>Agreement Type:</span>
                                                    <span>Layby Purchase</span>
                                                </div>
                                                <div className="bank__row">
                                                    <span>Deposit Required:</span>
                                                    <span>R{(total * 0.2).toFixed(2)}</span>
                                                </div>
                                                <div className="bank__row">
                                                    <span>Payment Period:</span>
                                                    <span>3 Months</span>
                                                </div>
                                            </>
                                        )}
                                        
                                        <div className="reference__row">
                                            <i className="fas fa-hashtag"></i>
                                            <span>Reference: <strong>{orderNumber}</strong></span>
                                        </div>
                                    </div>
                                    
                                    <div className="payment__note">
                                        <i className="fas fa-clock"></i>
                                        <span>Please complete payment within 24 hours to secure your order</span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Information */}
                            <div className="receipt__section">
                                <div className="section__header">
                                    <i className="fas fa-truck section__icon"></i>
                                    <h3 className="section__title">DELIVERY INFORMATION</h3>
                                </div>
                                
                                <div className="delivery__info">
                                    <div className="customer__address">
                                        <div className="address__header">
                                            <i className="fas fa-user"></i>
                                            <strong>{formData.firstName} {formData.lastName}</strong>
                                        </div>
                                        <div className="address__lines">
                                            <div>{formData.streetAddress}</div>
                                            <div>{formData.suburb}</div>
                                            <div>{formData.city}, {formData.province}</div>
                                            <div>{formData.postalCode}</div>
                                        </div>
                                        <div className="contact__info">
                                            <div><i className="fas fa-phone"></i> {formData.phone}</div>
                                            <div><i className="fas fa-envelope"></i> {formData.email}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="delivery__method">
                                        <div className="delivery__badge">
                                            <i className="fas fa-shipping-fast"></i>
                                            {selectedDelivery.label.split(' - ')[0]}
                                        </div>
                                        <div className="delivery__time">
                                            Estimated: {selectedDelivery.label.split(' - ')[1]}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Brand Footer */}
                            <div className="receipt__footer">
                                <div className="brand__signature">
                                    <div className="signature__line"></div>
                                    <div className="brand__quote">
                                        "Elevating Beauty Through Excellence"
                                    </div>
                                </div>
                                <div className="company__info">
                                    <p>Thank you for choosing Ke Pabala Aesthetics</p>
                                    <div className="contact__links">
                                        <span><i className="fas fa-phone"></i> {process.env.REACT_APP_CONTACT_PHONE || '071 234 5678'}</span>
                                        <span><i className="fas fa-envelope"></i> {process.env.REACT_APP_CONTACT_EMAIL || 'info@kepabala.com'}</span>
                                        <span><i className="fas fa-globe"></i> {process.env.REACT_APP_WEBSITE_URL || 'www.kepabalasthetics.com'}</span>
                                    </div>
                                    <div className="receipt__id">
                                        Receipt ID: {orderNumber} • Printed: {new Date().toLocaleString('en-ZA')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Success Actions */}
                        <div className="success__actions">
                            <button 
                                className="btn btn-accent"
                                onClick={() => window.location.href = '/'}
                            >
                                <i className="fas fa-shopping-bag"></i>
                                Continue Shopping
                            </button>
                            <button 
                                className="btn btn-outline"
                                onClick={() => window.print()}
                            >
                                <i className="fas fa-print"></i>
                                Print Receipt
                            </button>
                            {/* Development Tools */}
                            {!FORMBACKEND_FORM_ID && (
                                <button 
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setOrderComplete(false);
                                        setOrderNumber('');
                                    }}
                                >
                                    <i className="fas fa-redo"></i>
                                    Test Again
                                </button>
                            )}
                        </div>

                        {/* Development Information */}
                        {!FORMBACKEND_FORM_ID && (
                            <div className="development__info">
                                <div className="development__notice">
                                    <i className="fas fa-info-circle development__notice-icon"></i>
                                    <div className="development__notice-content">
                                        <h4>Testing Mode Active</h4>
                                        <p>For production use, configure FormBackend:</p>
                                        <ul>
                                            <li>Create account at <a href="https://formbackend.com" target="_blank" rel="noopener noreferrer">formbackend.com</a></li>
                                            <li>Get your Form ID</li>
                                            <li>Add to .env: REACT_APP_FORMBACKEND_FORM_ID=your_form_id</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout">
            <div className="checkout__container">
                <h1 className="checkout__title">Complete Your Order</h1>
                
                {/* Development Mode Indicator */}
                {!FORMBACKEND_FORM_ID && (
                    <div className="development__mode">
                        <i className="fas fa-flask development__mode-icon"></i>
                        <span className="development__mode-text">Development Mode - Form submissions are simulated</span>
                    </div>
                )}
                
                <div className="checkout__content">
                    <form className="checkout__form" onSubmit={handleSubmit}>
                        {/* Personal Information */}
                        <section className="form__section">
                            <h2 className="form__header">Personal Information</h2>
                            <div className="form__grid">
                                <div className="form__group">
                                    <label className="form__label">First Name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="form__input"
                                        placeholder="Enter your first name"
                                    />
                                </div>
                                <div className="form__group">
                                    <label className="form__label">Last Name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="form__input"
                                        placeholder="Enter your last name"
                                    />
                                </div>
                                <div className="form__group">
                                    <label className="form__label">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="form__input"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                <div className="form__group">
                                    <label className="form__label">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="071 234 5678"
                                        required
                                        disabled={isSubmitting}
                                        className="form__input"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Delivery Address */}
                        <section className="form__section">
                            <h2 className="form__header">Delivery Address</h2>
                            <div className="form__grid">
                                <div className="form__group form__group--full">
                                    <label className="form__label">Street Address *</label>
                                    <input
                                        type="text"
                                        name="streetAddress"
                                        value={formData.streetAddress}
                                        onChange={handleInputChange}
                                        placeholder="123 Main Street, Complex Name"
                                        required
                                        disabled={isSubmitting}
                                        className="form__input"
                                    />
                                </div>
                                <div className="form__group">
                                    <label className="form__label">Suburb *</label>
                                    <input
                                        type="text"
                                        name="suburb"
                                        value={formData.suburb}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Sandton"
                                        required
                                        disabled={isSubmitting}
                                        className="form__input"
                                    />
                                </div>
                                <div className="form__group">
                                    <label className="form__label">City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Johannesburg"
                                        required
                                        disabled={isSubmitting}
                                        className="form__input"
                                    />
                                </div>
                                <div className="form__group">
                                    <label className="form__label">Province *</label>
                                    <select
                                        name="province"
                                        value={formData.province}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                        className="form__select"
                                    >
                                        <option value="">Select Province</option>
                                        {southAfricanProvinces.map(province => (
                                            <option key={province} value={province}>
                                                {province}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form__group">
                                    <label className="form__label">Postal Code *</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 2196"
                                        required
                                        disabled={isSubmitting}
                                        className="form__input"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Delivery Method */}
                        <section className="form__section">
                            <h2 className="form__header">Delivery Method</h2>
                            <div className="delivery__options">
                                {deliveryOptions.map(option => (
                                    <label key={option.value} className="delivery__option">
                                        <input
                                            type="radio"
                                            name="deliveryMethod"
                                            value={option.value}
                                            checked={formData.deliveryMethod === option.value}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isSubmitting}
                                            className="delivery__input"
                                        />
                                        <span className="delivery__checkmark"></span>
                                        <div className="delivery__content">
                                            <span className="delivery__label">{option.label}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section className="form__section">
                            <h2 className="form__header">Payment Method</h2>
                            <div className="payment__options">
                                {paymentMethods.map(method => (
                                    <label key={method.value} className="payment__option">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.value}
                                            checked={formData.paymentMethod === method.value}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isSubmitting}
                                            className="payment__input"
                                        />
                                        <span className="delivery__checkmark"></span>
                                        <div className="payment__content">
                                            <i className={`${method.icon} payment__icon`}></i>
                                            <span className="payment__text">{method.label}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {/* Payment Details */}
                            <div className="payment__details">
                                {formData.paymentMethod === 'bank-transfer' && (
                                    <>
                                        <h4 className="payment__subheader">Bank Transfer Details</h4>
                                        <div className="form__grid">
                                            <div className="form__group">
                                                <label className="form__label">Your Bank Name</label>
                                                <input
                                                    type="text"
                                                    name="bankName"
                                                    value={formData.bankName}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g., Standard Bank, FNB, etc."
                                                    disabled={isSubmitting}
                                                    className="form__input"
                                                />
                                            </div>
                                        </div>
                                        <div className="bank__info">
                                            <p className="bank__text bank__text--strong">Our Bank Details:</p>
                                            <p className="bank__text">Bank: Standard Bank</p>
                                            <p className="bank__text">Account Holder: Ke Pabala Aesthetics</p>
                                            <p className="bank__text">Account Number: 0123456789</p>
                                            <p className="bank__text">Branch Code: 051001</p>
                                            <p className="bank__text"><em>Use your order number as reference</em></p>
                                        </div>
                                    </>
                                )}

                                {formData.paymentMethod === 'capitec' && (
                                    <>
                                        <h4 className="payment__subheader">Capitec to Capitec</h4>
                                        <div className="bank__info">
                                            <p className="bank__text bank__text--strong">Our Capitec Details:</p>
                                            <p className="bank__text">Bank: Capitec</p>
                                            <p className="bank__text">Account Holder: Ke Pabala Aesthetics</p>
                                            <p className="bank__text">Account Number: 0123456789</p>
                                            <p className="bank__text"><em>Use your order number as reference</em></p>
                                            <div className="instruction__note">
                                                Instant transfer available through Capitec app
                                            </div>
                                        </div>
                                    </>
                                )}

                                {formData.paymentMethod === 'payshap' && (
                                    <>
                                        <h4 className="payment__subheader">PayShap Payment</h4>
                                        <div className="bank__info">
                                            <p className="bank__text bank__text--strong">PayShap Details:</p>
                                            <p className="bank__text">PayShap ID: 0712345678</p>
                                            <p className="bank__text">Recipient: Ke Pabala Aesthetics</p>
                                            <p className="bank__text"><em>Use your order number as reference</em></p>
                                            <div className="instruction__note">
                                                Instant payment through your banking app
                                            </div>
                                        </div>
                                    </>
                                )}

                                {formData.paymentMethod === 'layby' && (
                                    <>
                                        <h4 className="payment__subheader">Layby Agreement</h4>
                                        <div className="bank__info">
                                            <p className="bank__text bank__text--strong">Layby Terms:</p>
                                            <p className="bank__text">• 20% deposit required to start layby</p>
                                            <p className="bank__text">• 3-month payment period</p>
                                            <p className="bank__text">• Items reserved until final payment</p>
                                            <p className="bank__text">• No interest charges</p>
                                            <p className="bank__text">• Cancellation fee may apply</p>
                                            <div className="instruction__note">
                                                We will contact you to set up your layby payment schedule
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </section>

                        {submitError && (
                            <div className="error__message">
                                <i className="fas fa-exclamation-circle error__icon"></i>
                                {submitError}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="place-order__btn"
                            disabled={isSubmitting || cart.items.length === 0}
                        >
                            {isSubmitting ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Processing Order...
                                </>
                            ) : (
                                `Place Order - R${total.toFixed(2)}`
                            )}
                        </button>

                        <div className="email__notice">
                            <i className="fas fa-info-circle email__notice-icon"></i>
                            <p className="email__notice-text">
                                {FORMBACKEND_FORM_ID 
                                    ? "When you place this order, we'll automatically send order details to our store and a receipt to your email."
                                    : "In development mode, order details are logged to the console for testing."
                                }
                            </p>
                        </div>
                    </form>

                    {/* Order Summary Sidebar */}
                    <div className="checkout__sidebar">
                        <h3 className="sidebar__title">Order Summary</h3>
                        <div className="cart__preview">
                            {cart.items.map((item, index) => (
                                <div key={index} className="preview__item">
                                    <img src={item.image} alt={item.name} className="preview__image" />
                                    <div className="preview__details">
                                        <h4 className="preview__name">{item.name}</h4>
                                        <p className="preview__info">{item.color} • {item.size}</p>
                                        <p className="preview__info">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="preview__price">
                                        R{((parseFloat(item.price) + (item.customColor ? 100 : 0)) * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="summary__totals">
                            <div className="summary__row">
                                <span>Subtotal:</span>
                                <span>R{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary__row">
                                <span>Delivery:</span>
                                <span>R{deliveryCost.toFixed(2)}</span>
                            </div>
                            <div className="summary__row summary__row--total">
                                <span>Total:</span>
                                <span>R{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="delivery__estimate">
                            <h4 className="delivery__estimate-title">Delivery Estimate</h4>
                            <p className="delivery__estimate-text">{selectedDelivery.label.split(' - ')[0]}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;