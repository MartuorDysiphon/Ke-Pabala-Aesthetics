import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './IphoneModal.css';

const IphoneModal = ({ product, isOpen, onClose }) => {
    const [selectedStorage, setSelectedStorage] = useState(product.storage);
    const [selectedColor, setSelectedColor] = useState(product.color);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const storageOptions = [
        { value: '32GB', price: 0 },
        { value: '64GB', price: 500 },
        { value: '128GB', price: 1000 },
        { value: '256GB', price: 1500 },
        { value: '512GB', price: 2000 }
    ];

    const colorOptions = ['Black', 'Space Gray', 'Silver', 'Gold', 'Rose Gold', 'Product Red', 'Blue', 'Purple'];

    const currentPrice = product.price + storageOptions.find(s => s.value === selectedStorage)?.price;

    const handleAddToCart = () => {
        addToCart(
            {
                ...product,
                displayName: `${product.name} ${selectedStorage} ${selectedColor}`,
                price: currentPrice
            },
            selectedColor,
            selectedStorage,
            quantity
        );
        onClose();
        alert('iPhone added to cart!');
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="iphone-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>

                <div className="iphone-modal__content">
                    <div className="iphone-modal__image">
                        <img src={product.image} alt={product.name} />
                    </div>

                    <div className="iphone-modal__details">
                        <div className="modal-header">
                            <h2>{product.name}</h2>
                            <span className="model">{product.model}</span>
                        </div>

                        <div className="pricing-section">
                            <div className="current-price">R{currentPrice.toFixed(2)}</div>
                            <div className="original-price">R{product.originalPrice.toFixed(2)}</div>
                            <div className="savings">Save {product.discount}%</div>
                        </div>

                        <div className="specs-grid">
                            <div className="spec-item">
                                <i className="fas fa-microchip"></i>
                                <span>{product.specs.chip}</span>
                            </div>
                            <div className="spec-item">
                                <i className="fas fa-display"></i>
                                <span>{product.specs.display}</span>
                            </div>
                            <div className="spec-item">
                                <i className="fas fa-camera"></i>
                                <span>{product.specs.camera}</span>
                            </div>
                            <div className="spec-item">
                                <i className="fas fa-battery-full"></i>
                                <span>{product.batteryHealth} Battery</span>
                            </div>
                        </div>

                        <div className="options-section">
                            <div className="option-group">
                                <label>Storage</label>
                                <div className="storage-options">
                                    {storageOptions.map(option => (
                                        <button
                                            key={option.value}
                                            className={`storage-option ${selectedStorage === option.value ? 'active' : ''}`}
                                            onClick={() => setSelectedStorage(option.value)}
                                        >
                                            {option.value}
                                            {option.price > 0 && <span>+R{option.price}</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="option-group">
                                <label>Color</label>
                                <div className="color-options">
                                    {colorOptions.map(color => (
                                        <button
                                            key={color}
                                            className={`color-option ${selectedColor === color ? 'active' : ''}`}
                                            onClick={() => setSelectedColor(color)}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="option-group">
                                <label>Quantity</label>
                                <div className="quantity-selector">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                                </div>
                            </div>
                        </div>

                        <div className="features-list">
                            <h4>Key Features</h4>
                            <div className="features">
                                {product.features.map((feature, index) => (
                                    <div key={index} className="feature">
                                        <i className="fas fa-check"></i>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="btn btn--primary add-to-cart" onClick={handleAddToCart}>
                            <i className="fas fa-shopping-cart"></i>
                            Add to Cart - R{(currentPrice * quantity).toFixed(2)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IphoneModal;