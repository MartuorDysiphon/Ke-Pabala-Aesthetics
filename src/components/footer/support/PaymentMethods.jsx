import React from 'react';
import './support.css';

const PaymentMethods = () => {
    return (
        <div className="content-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-title">Payment Methods</h1>
                    <p className="page-subtitle">Secure and convenient payment options</p>
                </div>

                <div className="content-stack">
                    {/* Payment Options */}
                    <div className="content-card">
                        <h2 className="content-title">
                            <i className="fas fa-credit-card"></i>
                            Available Payment Methods
                        </h2>
                        
                        <div className="payment-methods-grid">
                            <div className="payment-method-card">
                                <div className="payment-icon">
                                    <i className="fas fa-university"></i>
                                </div>
                                <div className="payment-content">
                                    <h3>Bank Transfer</h3>
                                    <p>Direct transfer to our Capitec account</p>
                                    <div className="payment-details">
                                        <div className="detail-row">
                                            <span>Bank:</span>
                                            <span>Capitec</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Account Holder:</span>
                                            <span>NJ Ntabanyane</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Account Number:</span>
                                            <span className="highlight">1764824367</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Branch Code:</span>
                                            <span>470010</span>
                                        </div>
                                    </div>
                                    <p className="payment-note">
                                        <i className="fas fa-hashtag"></i>
                                        Use order number as reference
                                    </p>
                                </div>
                            </div>

                            <div className="payment-method-card">
                                <div className="payment-icon">
                                    <i className="fas fa-mobile-alt"></i>
                                </div>
                                <div className="payment-content">
                                    <h3>Capitec to Capitec</h3>
                                    <p>Instant transfer via Capitec app</p>
                                    <div className="payment-details">
                                        <div className="detail-row">
                                            <span>Phone Number:</span>
                                            <span className="highlight">0712345678</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Account Holder:</span>
                                            <span>NJ Ntabanyane</span>
                                        </div>
                                    </div>
                                    <p className="payment-note">
                                        <i className="fas fa-bolt"></i>
                                        Instant payment processing
                                    </p>
                                </div>
                            </div>

                            <div className="payment-method-card">
                                <div className="payment-icon">
                                    <i className="fas fa-bolt"></i>
                                </div>
                                <div className="payment-content">
                                    <h3>PayShap</h3>
                                    <p>Real-time payments</p>
                                    <div className="payment-details">
                                        <div className="detail-row">
                                            <span>PayShap ID:</span>
                                            <span className="highlight">0712345678</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Account Holder:</span>
                                            <span>NJ Ntabanyane</span>
                                        </div>
                                    </div>
                                    <p className="payment-note">
                                        <i className="fas fa-clock"></i>
                                        Processed within minutes
                                    </p>
                                </div>
                            </div>

                            <div className="payment-method-card">
                                <div className="payment-icon">
                                    <i className="fas fa-calendar-plus"></i>
                                </div>
                                <div className="payment-content">
                                    <h3>Layby</h3>
                                    <p>Pay over 3 months with no interest</p>
                                    <div className="payment-details">
                                        <div className="detail-row">
                                            <span>Deposit:</span>
                                            <span>20% required</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Payment Period:</span>
                                            <span>3 months</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Interest:</span>
                                            <span>0%</span>
                                        </div>
                                    </div>
                                    <p className="payment-note">
                                        <i className="fas fa-lock"></i>
                                        Items reserved until final payment
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security & Process */}
                    <div className="content-card">
                        <h2 className="content-title">
                            <i className="fas fa-shield-alt"></i>
                            Security & Payment Process
                        </h2>
                        
                        <div className="security-features">
                            <div className="feature-grid">
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <i className="fas fa-lock"></i>
                                    </div>
                                    <div className="feature-content">
                                        <h4>Secure Payments</h4>
                                        <p>All payment methods are secure and verified. We never store your banking details.</p>
                                    </div>
                                </div>
                                
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <i className="fas fa-check-circle"></i>
                                    </div>
                                    <div className="feature-content">
                                        <h4>Payment Confirmation</h4>
                                        <p>Orders are processed immediately upon payment confirmation. You'll receive email notification.</p>
                                    </div>
                                </div>
                                
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <i className="fas fa-receipt"></i>
                                    </div>
                                    <div className="feature-content">
                                        <h4>Digital Receipts</h4>
                                        <p>Automatic receipt generation with order details and payment confirmation.</p>
                                    </div>
                                </div>
                                
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <i className="fas fa-headset"></i>
                                    </div>
                                    <div className="feature-content">
                                        <h4>Payment Support</h4>
                                        <p>Need help with payment? Contact us at payments@kepabala.co.za</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="layby-terms">
                            <h3>Layby Terms & Conditions</h3>
                            <div className="terms-list">
                                <div className="term-item">
                                    <i className="fas fa-credit-card"></i>
                                    <div>
                                        <strong>20% Deposit Required</strong>
                                        <p>To initiate any layby agreement, a 20% deposit of the total order value is required.</p>
                                    </div>
                                </div>
                                <div className="term-item">
                                    <i className="fas fa-calendar"></i>
                                    <div>
                                        <strong>3-Month Payment Period</strong>
                                        <p>Complete payment must be made within 3 months from the initial deposit date.</p>
                                    </div>
                                </div>
                                <div className="term-item">
                                    <i className="fas fa-box"></i>
                                    <div>
                                        <strong>Product Reservation</strong>
                                        <p>Items are reserved and removed from inventory for the duration of the layby period.</p>
                                    </div>
                                </div>
                                <div className="term-item">
                                    <i className="fas fa-times-circle"></i>
                                    <div>
                                        <strong>Cancellation Policy</strong>
                                        <p>Cancellations may incur a 10% administration fee of the total order value.</p>
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

export default PaymentMethods;