// ReceiptSlip.jsx
import React from 'react';
import Logo from '../../../assets/Logo/IMG.jpg';
import './ReceiptSlip.css';

const ReceiptSlip = ({ orderNumber, formData, cart, delivery, subtotal, total, onClose }) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const formattedTime = currentDate.toLocaleTimeString('en-ZA', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const paymentMethods = [
        { id: 'bank-transfer', name: 'Bank Transfer', icon: 'university' },
        { id: 'capitec', name: 'Capitec Pay', icon: 'mobile-alt' },
        { id: 'payshap', name: 'PayShap', icon: 'bolt' },
        { id: 'layby', name: 'Layby', icon: 'calendar-plus' }
    ];

    const selectedPaymentMethod = paymentMethods.find(p => p.id === formData.paymentMethod);

    const calculateItemTotal = (item) => {
        const basePrice = parseFloat(item.price) || 0;
        const customFee = item.customColor ? 100 : 0;
        const itemPrice = basePrice + customFee;
        return itemPrice * item.quantity;
    };

    const actualSubtotal = subtotal || (cart?.items?.reduce((sum, item) => sum + calculateItemTotal(item), 0) || 0);
    const deliveryCost = delivery?.cost || 0;
    const actualTotal = actualSubtotal + deliveryCost;

    const handlePrint = () => {
        window.print();
    };

    const handleEmail = () => {
        alert(`Receipt sent to ${formData.email}`);
    };

    // Generate simple QR code pattern (simulated)
    const generateQRCode = () => {
        return (
            <div className="qr-code">
                <div className="qr-grid">
                    {/* This is a simulated QR code - in real app, use a QR code library */}
                    <div className="qr-pattern">
                        <div className="qr-corner tl"></div>
                        <div className="qr-corner tr"></div>
                        <div className="qr-corner bl"></div>
                        <div className="qr-data">
                            {/* Simulated QR code data points */}
                            {Array.from({ length: 25 }, (_, i) => (
                                <div key={i} className={`qr-dot ${Math.random() > 0.4 ? 'active' : ''}`}></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="qr-text">KPA-{orderNumber}</div>
            </div>
        );
    };

    return (
        <div className="receipt-slip compact">
            <div className="slip-container">
                {/* Compact Header with Logo */}
                <div className="slip-header">
                    <div className="header-content">
                        <div className="brand-section">
                            <div className="logo-container">
                                <img src={Logo} alt="Ke Pabala Aesthetics" className="brand-logo" />
                                <div className="brand-text">
                                    <h1>Order Comfirmation</h1>
                                    <p className="tagline">Receipt</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-info">
                            <div className="order-number">#{orderNumber}</div>
                            <div className="order-date">{formattedDate} {formattedTime}</div>
                        </div>
                    </div>
                </div>

                {/* Compact Info Cards */}
                <div className="info-sections compact">
                    <div className="info-card compact">
                        <div className="card-header">
                            <i className="fas fa-user"></i>
                            <span>Customer</span>
                        </div>
                        <div className="card-content">
                            <p className="customer-name">{formData.firstName} {formData.lastName}</p>
                            <p className="customer-contact">{formData.phone}</p>
                            <p className="customer-email">{formData.email}</p>
                        </div>
                    </div>

                    <div className="info-card compact">
                        <div className="card-header">
                            <i className="fas fa-truck"></i>
                            <span>Delivery</span>
                        </div>
                        <div className="card-content">
                            <p className="delivery-address">{formData.address}</p>
                            <p className="delivery-area">{formData.suburb}, {formData.city}</p>
                            <p className="delivery-method accent">{delivery?.name} • {delivery?.time}</p>
                        </div>
                    </div>
                </div>

                {/* Compact Order Items */}
                <div className="order-items-section compact">
                    <div className="section-header compact">
                        <div className="section-title">
                            <i className="fas fa-shopping-bag"></i>
                            <span>Order Items ({cart?.items?.length || 0})</span>
                        </div>
                    </div>

                    {!cart?.items || cart.items.length === 0 ? (
                        <div className="empty-state compact">
                            <i className="fas fa-shopping-cart"></i>
                            <p>No items in order</p>
                        </div>
                    ) : (
                        <div className="items-table compact">
                            <div className="table-header compact">
                                <div className="col-item">Item</div>
                                <div className="col-qty">Qty</div>
                                <div className="col-total">Total</div>
                            </div>
                            <div className="table-body compact">
                                {cart.items.map((item, index) => (
                                    <div key={index} className="table-row compact">
                                        <div className="col-item">
                                            <div className="item-name">{item.name}</div>
                                            <div className="item-variants">
                                                {item.color && <span className="variant">{item.color}</span>}
                                                {item.size && <span className="variant">{item.size}</span>}
                                                {item.customColor && <span className="variant custom">Custom</span>}
                                            </div>
                                        </div>
                                        <div className="col-qty">
                                            <span className="quantity">{item.quantity}</span>
                                        </div>
                                        <div className="col-total">
                                            <span className="amount">R{calculateItemTotal(item).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Compact Summary */}
                <div className="summary-section compact">
                    <div className="summary-card compact">
                        <div className="summary-content">
                            <div className="summary-row">
                                <span>Products</span>
                                <span>R{actualSubtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Delivery</span>
                                <span>R{deliveryCost.toFixed(2)}</span>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>R{actualTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compact Payment */}
                <div className="payment-section compact">
                    <div className="payment-card compact">
                        <div className="payment-header compact">
                            <i className={`fas fa-${selectedPaymentMethod?.icon}`}></i>
                            <span>{selectedPaymentMethod?.name}</span>
                        </div>
                        
                        <div className="payment-instructions compact">
                            {formData.paymentMethod === 'bank-transfer' && (
                                <div className="instructions">
                                    <p>Transfer <strong>R{actualTotal.toFixed(2)}</strong> to:</p>
                                    <div className="bank-details">
                                        <div className="detail-row">
                                            <span>Bank:</span>
                                            <span>Capitec</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Account:</span>
                                            <span>NJ Ntabanyane</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Number:</span>
                                            <span className="highlight">1764824367</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Ref:</span>
                                            <span className="highlight">#{orderNumber}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {formData.paymentMethod === 'capitec' && (
                                <div className="instructions">
                                    <p>Send <strong>R{actualTotal.toFixed(2)}</strong> to:</p>
                                    <div className="bank-details">
                                        <div className="detail-row">
                                            <span>Phone:</span>
                                            <span className="highlight">0712345678</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Ref:</span>
                                            <span className="highlight">#{orderNumber}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {formData.paymentMethod === 'payshap' && (
                                <div className="instructions">
                                    <p>PayShap <strong>R{actualTotal.toFixed(2)}</strong> to:</p>
                                    <div className="bank-details">
                                        <div className="detail-row">
                                            <span>ID:</span>
                                            <span className="highlight">0712345678</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Ref:</span>
                                            <span className="highlight">#{orderNumber}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {formData.paymentMethod === 'layby' && (
                                <div className="instructions">
                                    <p>Layby Plan - R{actualTotal.toFixed(2)}</p>
                                    <div className="bank-details">
                                        <div className="detail-row">
                                            <span>Deposit:</span>
                                            <span>R{(actualTotal * 0.2).toFixed(2)}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>3 Payments:</span>
                                            <span>R{((actualTotal * 0.8) / 3).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Compact Footer with QR Code */}
                <div className="slip-footer compact">
                    <div className="footer-content">
                        <div className="thank-you compact">
                            <i className="fas fa-check-circle"></i>
                            <div>
                                <h4>Thank you!</h4>
                                <p>Order confirmed</p>
                            </div>
                        </div>

                        {/* Centered QR Code */}
                        <div className="qr-section">
                            {generateQRCode()}
                        </div>

                        <div className="contact-info compact">
                            <div className="contact-item">
                                <i className="fas fa-phone"></i>
                                <span>071 234 5678</span>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-envelope"></i>
                                <span>pabalaaesthetics@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons compact">
                        <button className="btn btn-compact primary" onClick={handlePrint}>
                            <i className="fas fa-print"></i>
                            Print
                        </button>
                        <button className="btn btn-compact secondary" onClick={onClose}>
                            <i className="fas fa-shopping-bag"></i>
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceiptSlip;