import React from 'react';
import './support.css';

const ShippingReturns = () => {
    const shippingOptions = [
        {
            title: 'Standard',
            icon: 'truck',
            time: '7-9 business days',
            price: 'R60',
            tracking: 'Included',
            note: 'Ideal for non-urgent deliveries'
        },
        {
            title: 'Express',
            icon: 'bolt',
            time: '3-5 business days',
            price: 'R110',
            tracking: 'SMS updates',
            note: 'Perfect for time-sensitive orders'
        },
        {
            title: 'Priority',
            icon: 'rocket',
            time: '1-2 business days',
            price: 'R200',
            tracking: 'Real-time GPS',
            note: 'For urgent deliveries'
        }
    ];

    return (
        <div className="support-page">
            <div className="support-container">
                <div className="support-header">
                    <h1 className="support-title">Shipping & Returns</h1>
                    <p className="support-subtitle">Everything you need to know about delivery and returns</p>
                </div>

                <div className="support-grid">
                    <div className="support-card">
                        <h2 className="faq-category-title">
                            <i className="fas fa-shipping-fast"></i>
                            Shipping Information
                        </h2>
                        
                        <div className="shipping-options">
                            {shippingOptions.map((option, index) => (
                                <div key={index} className="option-card">
                                    <div className="option-icon">
                                        <i className={`fas fa-${option.icon}`}></i>
                                    </div>
                                    <h3 className="option-title">{option.title} Shipping</h3>
                                    <div className="option-details">
                                        <p><strong>Delivery:</strong> {option.time}</p>
                                        <p><strong>Tracking:</strong> {option.tracking}</p>
                                        <p>{option.note}</p>
                                    </div>
                                    <div className="option-price">{option.price}</div>
                                </div>
                            ))}
                        </div>

                        <div className="policy-list">
                            <h3 className="faq-category-title" style={{ fontSize: '1.2rem', margin: '2rem 0 1rem' }}>
                                Shipping Policy
                            </h3>
                            {[
                                { title: 'Nationwide Delivery', text: 'We ship to all major cities and towns across South Africa' },
                                { title: 'Order Processing', text: 'Orders are processed within 24-48 hours of payment confirmation' },
                                { title: 'Delivery Times', text: 'Delivery times are estimates and may vary based on location and courier availability' },
                                { title: 'Signature Required', text: 'All deliveries require signature upon receipt for security' }
                            ].map((policy, index) => (
                                <div key={index} className="policy-item">
                                    <div className="policy-check">
                                        <i className="fas fa-check"></i>
                                    </div>
                                    <div className="policy-text">
                                        <strong>{policy.title}</strong>
                                        <p>{policy.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="support-card">
                        <h2 className="faq-category-title">
                            <i className="fas fa-undo"></i>
                            Returns & Exchanges
                        </h2>
                        
                        <div className="returns-badge">
                            <i className="fas fa-calendar"></i>
                            14-Day Return Policy
                        </div>
                        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                            We offer a 14-day return policy from the date of delivery
                        </p>

                        <div className="conditions-grid">
                            <div className="condition-card">
                                <h4>Return Conditions</h4>
                                <ul>
                                    <li>Items must be unused and in original condition</li>
                                    <li>Original packaging must be intact</li>
                                    <li>All tags and labels must be attached</li>
                                    <li>Proof of purchase required</li>
                                </ul>
                            </div>
                            
                            <div className="condition-card">
                                <h4>Non-Returnable Items</h4>
                                <ul>
                                    <li>Custom colored hair pieces</li>
                                    <li>Opened hair care products</li>
                                    <li>Personalized items</li>
                                    <li>Sale/clearance items</li>
                                </ul>
                            </div>
                        </div>

                        <div className="process-steps">
                            <h4 className="faq-category-title" style={{ fontSize: '1.2rem', margin: '2rem 0 1rem' }}>
                                Return Process
                            </h4>
                            {[
                                { step: '1', title: 'Contact Support', text: 'Email us at pabalaaesthetics@gmail.com with your order number' },
                                { step: '2', title: 'Receive Instructions', text: "We'll provide you with a returns label and instructions" },
                                { step: '3', title: 'Ship Your Return', text: 'Package items securely and drop at designated courier point' },
                                { step: '4', title: 'Receive Refund', text: 'Refund processed within 5-7 business days after inspection' }
                            ].map((step, index) => (
                                <div key={index} className="process-step">
                                    <div className="step-number">{step.step}</div>
                                    <div className="step-content">
                                        <strong>{step.title}</strong>
                                        <p>{step.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingReturns;