import React from 'react';
import Barcode from 'react-barcode';
import './ReceiptSlip.css';

const ReceiptSlip = ({ orderNumber, formData, cart, delivery, subtotal, total, onClose }) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-ZA', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    const formattedTime = currentDate.toLocaleTimeString('en-ZA', {
        hour: '2-digit',
        minute: '2-digit'
    }).replace(':', '');

    const paymentMethods = {
        'bank-transfer': { name: 'Bank', icon: 'university', color: '#1d1d1f' },
        'capitec': { name: 'Capitec', icon: 'mobile-alt', color: '#007AFF' },
        'payshap': { name: 'PayShap', icon: 'bolt', color: '#FF9500' },
        'layby': { name: 'Layby', icon: 'calendar-plus', color: '#34C759' }
    };

    const selectedPaymentMethod = paymentMethods[formData.paymentMethod];

    const calculateItemTotal = (item) => {
        const basePrice = parseFloat(item.price) || 0;
        const customFee = item.customColor ? 100 : 0;
        return (basePrice + customFee) * item.quantity;
    };

    const actualSubtotal = subtotal || (cart?.items?.reduce((sum, item) => sum + calculateItemTotal(item), 0) || 0);
    const deliveryCost = delivery?.cost || 0;
    const actualTotal = actualSubtotal + deliveryCost;

    const handlePrint = () => window.print();

    return (
        <div className="Receipt">
            <div className="Receipt__container">
                
                {/* Top Bar - Minimal */}
                <div className="Receipt__topbar">
                    <div className="Receipt__topbar-left">
                        <div className="Receipt__status-badge">✓</div>
                        <div>
                            <div className="Receipt__order-id">#{orderNumber}</div>
                            <div className="Receipt__datetime">{formattedDate} {formattedTime}</div>
                        </div>
                    </div>
                    <button className="Receipt__close-btn" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Customer & Delivery Inline */}
                <div className="Receipt__customer-section">
                    <div className="Receipt__customer-block">
                        <div className="Receipt__block-header">
                            <i className="fas fa-user"></i>
                            <span>Customer</span>
                        </div>
                        <div className="Receipt__block-content">
                            <div className="Receipt__customer-name">{formData.firstName} {formData.lastName}</div>
                            <div className="Receipt__customer-contact">{formData.phone}</div>
                        </div>
                    </div>

                    <div className="Receipt__delivery-block">
                        <div className="Receipt__block-header">
                            <i className="fas fa-truck"></i>
                            <span>Delivery</span>
                        </div>
                        <div className="Receipt__block-content">
                            <div className="Receipt__delivery-text">{formData.suburb}, {formData.city}</div>
                            <div className="Receipt__delivery-method">
                                {delivery?.name} · {delivery?.time} · R{deliveryCost}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Badge */}
                <div className="Receipt__payment-badge" style={{ '--payment-color': selectedPaymentMethod?.color }}>
                    <i className={`fas fa-${selectedPaymentMethod?.icon}`}></i>
                    {selectedPaymentMethod?.name}
                </div>

                {/* Items Grid */}
                <div className="Receipt__items-header">
                    <div className="Receipt__items-title">Items · {cart?.items?.length || 0}</div>
                    <div className="Receipt__items-subtotal">R{actualSubtotal.toFixed(2)}</div>
                </div>

                {!cart?.items || cart.items.length === 0 ? (
                    <div className="Receipt__empty">No items in order</div>
                ) : (
                    <div className="Receipt__items-grid">
                        {cart.items.map((item, index) => (
                            <div key={index} className="Receipt__item">
                                <div className="Receipt__item-info">
                                    <div className="Receipt__item-name">{item.name}</div>
                                    <div className="Receipt__item-details">
                                        {item.color && <span className="Receipt__detail">{item.color}</span>}
                                        {item.size && <span className="Receipt__detail">{item.size}</span>}
                                        {item.customColor && <span className="Receipt__detail custom">Custom</span>}
                                    </div>
                                </div>
                                <div className="Receipt__item-meta">
                                    <div className="Receipt__item-quantity">×{item.quantity}</div>
                                    <div className="Receipt__item-price">R{calculateItemTotal(item).toFixed(2)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Payment Details - Compact */}
                <div className="Receipt__payment-details">
                    {formData.paymentMethod === 'bank-transfer' && (
                        <div className="Receipt__bank-transfer">
                            <div className="Receipt__payment-label">Send R{actualTotal.toFixed(2)} to:</div>
                            <div className="Receipt__bank-info">
                                <span>Capitec</span>
                                <span className="Receipt__account">1764824367</span>
                                <span className="Receipt__reference">Ref: #{orderNumber}</span>
                            </div>
                        </div>
                    )}

                    {formData.paymentMethod === 'capitec' && (
                        <div className="Receipt__bank-transfer">
                            <div className="Receipt__payment-label">Send R{actualTotal.toFixed(2)} to:</div>
                            <div className="Receipt__bank-info">
                                <span className="Receipt__account">0712345678</span>
                                <span className="Receipt__reference">Ref: #{orderNumber}</span>
                            </div>
                        </div>
                    )}

                    {formData.paymentMethod === 'payshap' && (
                        <div className="Receipt__bank-transfer">
                            <div className="Receipt__payment-label">PayShap R{actualTotal.toFixed(2)} to:</div>
                            <div className="Receipt__bank-info">
                                <span className="Receipt__account">0712345678</span>
                                <span className="Receipt__reference">Ref: #{orderNumber}</span>
                            </div>
                        </div>
                    )}

                    {formData.paymentMethod === 'layby' && (
                        <div className="Receipt__layby-info">
                            <div className="Receipt__payment-label">Layby · R{actualTotal.toFixed(2)}</div>
                            <div className="Receipt__layby-details">
                                <div>Deposit: R{(actualTotal * 0.2).toFixed(2)}</div>
                                <div>3× R{((actualTotal * 0.8) / 3).toFixed(2)}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Totals */}
                <div className="Receipt__totals">
                    <div className="Receipt__total-row">
                        <span>Subtotal</span>
                        <span>R{actualSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="Receipt__total-row">
                        <span>Delivery</span>
                        <span>R{deliveryCost.toFixed(2)}</span>
                    </div>
                    <div className="Receipt__total-final">
                        <span>Total</span>
                        <span>R{actualTotal.toFixed(2)}</span>
                    </div>
                </div>

                {/* Barcode Section */}
                <div className="Receipt__barcode-section">
                    <div className="Receipt__barcode-container">
                        <Barcode
                            value={orderNumber}
                            format="CODE128"
                            width={1.2}
                            height={40}
                            fontSize={12}
                            background="transparent"
                            lineColor="#1d1d1f"
                            margin={0}
                            displayValue={false}
                        />
                        <div className="Receipt__barcode-number">{orderNumber}</div>
                    </div>
                    
                    <div className="Receipt__contact-info">
                        <div className="Receipt__contact-item">
                            <i className="fas fa-phone"></i>
                            071 234 5678
                        </div>
                        <div className="Receipt__contact-item">
                            <i className="fas fa-envelope"></i>
                            pabalaaesthetics@gmail.com
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="Receipt__footer">
                    <button className="Receipt__btn Receipt__btn-print" onClick={handlePrint}>
                        <i className="fas fa-print"></i>
                        Print Receipt
                    </button>
                    <button className="Receipt__btn Receipt__btn-email" onClick={() => alert(`Receipt sent to ${formData.email}`)}>
                        <i className="fas fa-paper-plane"></i>
                        Email Receipt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptSlip;