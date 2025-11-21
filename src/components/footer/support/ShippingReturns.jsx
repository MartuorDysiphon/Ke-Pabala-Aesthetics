import React from 'react';
import './support.css';

const ShippingReturns = () => {
    return (
        <div className="content-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-title">Shipping & Returns</h1>
                    <p className="page-subtitle">Everything you need to know about delivery and returns</p>
                </div>

                <div className="content-stack">
                    {/* Shipping Section */}
                    <div className="content-card">
                        <h2 className="content-title">
                            <i className="fas fa-shipping-fast"></i>
                            Shipping Information
                        </h2>
                        
                        <div className="info-grid">
                            <div className="info-item">
                                <div className="info-icon">
                                    <i className="fas fa-truck"></i>
                                </div>
                                <div className="info-content">
                                    <h3>Standard Shipping</h3>
                                    <p><strong>Delivery Time:</strong> 7-9 business days</p>
                                    <p><strong>Cost:</strong> R60.00</p>
                                    <p><strong>Tracking:</strong> Included</p>
                                    <p className="info-note">Ideal for non-urgent deliveries</p>
                                </div>
                            </div>
                            
                            <div className="info-item">
                                <div className="info-icon">
                                    <i className="fas fa-bolt"></i>
                                </div>
                                <div className="info-content">
                                    <h3>Express Shipping</h3>
                                    <p><strong>Delivery Time:</strong> 3-5 business days</p>
                                    <p><strong>Cost:</strong> R110.00</p>
                                    <p><strong>Tracking:</strong> Included with SMS updates</p>
                                    <p className="info-note">Perfect for time-sensitive orders</p>
                                </div>
                            </div>
                            
                            <div className="info-item">
                                <div className="info-icon">
                                    <i className="fas fa-rocket"></i>
                                </div>
                                <div className="info-content">
                                    <h3>Priority Shipping</h3>
                                    <p><strong>Delivery Time:</strong> 1-2 business days</p>
                                    <p><strong>Cost:</strong> R200.00</p>
                                    <p><strong>Tracking:</strong> Real-time GPS tracking</p>
                                    <p className="info-note">For urgent and important deliveries</p>
                                </div>
                            </div>
                        </div>

                        <div className="content-section">
                            <h3>Shipping Policy Details</h3>
                            <div className="policy-list">
                                <div className="policy-item">
                                    <i className="fas fa-check"></i>
                                    <div>
                                        <strong>Nationwide Delivery</strong>
                                        <p>We ship to all major cities and towns across South Africa</p>
                                    </div>
                                </div>
                                <div className="policy-item">
                                    <i className="fas fa-check"></i>
                                    <div>
                                        <strong>Order Processing</strong>
                                        <p>Orders are processed within 24-48 hours of payment confirmation</p>
                                    </div>
                                </div>
                                <div className="policy-item">
                                    <i className="fas fa-check"></i>
                                    <div>
                                        <strong>Delivery Times</strong>
                                        <p>Delivery times are estimates and may vary based on location and courier availability</p>
                                    </div>
                                </div>
                                <div className="policy-item">
                                    <i className="fas fa-check"></i>
                                    <div>
                                        <strong>Signature Required</strong>
                                        <p>All deliveries require signature upon receipt for security</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Returns Section */}
                    <div className="content-card">
                        <h2 className="content-title">
                            <i className="fas fa-undo"></i>
                            Returns & Exchanges
                        </h2>
                        
                        <div className="returns-info">
                            <div className="returns-header">
                                <div className="returns-badge">
                                    <i className="fas fa-calendar"></i>
                                    14-Day Return Policy
                                </div>
                                <p>We offer a 14-day return policy from the date of delivery</p>
                            </div>

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

                            <div className="returns-process">
                                <h4>Return Process</h4>
                                <div className="process-steps">
                                    <div className="process-step">
                                        <div className="step-number">1</div>
                                        <div className="step-content">
                                            <strong>Contact Support</strong>
                                            <p>Email us at pabalaaesthetics@gmail.com with your order number</p>
                                        </div>
                                    </div>
                                    <div className="process-step">
                                        <div className="step-number">2</div>
                                        <div className="step-content">
                                            <strong>Receive Instructions</strong>
                                            <p>We'll provide you with a returns label and instructions</p>
                                        </div>
                                    </div>
                                    <div className="process-step">
                                        <div className="step-number">3</div>
                                        <div className="step-content">
                                            <strong>Ship Your Return</strong>
                                            <p>Package items securely and drop at designated courier point</p>
                                        </div>
                                    </div>
                                    <div className="process-step">
                                        <div className="step-number">4</div>
                                        <div className="step-content">
                                            <strong>Receive Refund</strong>
                                            <p>Refund processed within 5-7 business days after inspection</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingReturns;