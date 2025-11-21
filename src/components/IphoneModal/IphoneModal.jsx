// IphoneModal.jsx
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './IphoneModal.css';

const IphoneModal = ({ product, isOpen, onClose }) => {
    const [selectedStorage, setSelectedStorage] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    // iPhone specifications database
    const iphoneSpecs = {
        "iPhone 12": {
            storages: ['64GB', '128GB', '256GB'],
            colors: ['Black', 'White', 'Green', 'Blue', 'Purple', 'Product RED'],
            display: '6.1" Super Retina XDR',
            chip: 'A14 Bionic',
            camera: 'Dual 12MP',
            battery: 'Video playback: Up to 17 hours'
        },
        "iPhone 11 Pro": {
            storages: ['64GB', '256GB', '512GB'],
            colors: ['Midnight Green', 'Space Gray', 'Silver', 'Gold'],
            display: '5.8" Super Retina XDR',
            chip: 'A13 Bionic',
            camera: 'Triple 12MP',
            battery: 'Video playback: Up to 18 hours'
        },
        "iPhone 11": {
            storages: ['64GB', '128GB'],
            colors: ['Black', 'Green', 'Yellow', 'Purple', 'Red', 'White'],
            display: '6.1" Liquid Retina HD',
            chip: 'A13 Bionic',
            camera: 'Dual 12MP',
            battery: 'Video playback: Up to 17 hours'
        },
        "iPhone XR": {
            storages: ['64GB', '128GB'],
            colors: ['Black', 'White', 'Blue', 'Yellow', 'Coral', 'Product RED'],
            display: '6.1" Liquid Retina HD',
            chip: 'A12 Bionic',
            camera: '12MP',
            battery: 'Video playback: Up to 16 hours'
        },
        "iPhone X": {
            storages: ['64GB', '256GB'],
            colors: ['Space Gray', 'Silver'],
            display: '5.8" Super Retina HD',
            chip: 'A11 Bionic',
            camera: 'Dual 12MP',
            battery: 'Video playback: Up to 13 hours'
        },
        "iPhone 8 Plus": {
            storages: ['64GB', '256GB'],
            colors: ['Space Gray', 'Silver', 'Gold', 'Product RED'],
            display: '5.5" Retina HD',
            chip: 'A11 Bionic',
            camera: 'Dual 12MP',
            battery: 'Video playback: Up to 14 hours'
        },
        "iPhone 8": {
            storages: ['64GB', '256GB'],
            colors: ['Space Gray', 'Silver', 'Gold', 'Product RED'],
            display: '4.7" Retina HD',
            chip: 'A11 Bionic',
            camera: '12MP',
            battery: 'Video playback: Up to 13 hours'
        },
        "iPhone 7 Plus": {
            storages: ['32GB', '128GB'],
            colors: ['Black', 'Silver', 'Gold', 'Rose Gold', 'Product RED', 'Jet Black'],
            display: '5.5" Retina HD',
            chip: 'A10 Fusion',
            camera: 'Dual 12MP',
            battery: 'Video playback: Up to 14 hours'
        },
        "iPhone 7": {
            storages: ['32GB', '128GB'],
            colors: ['Black', 'Silver', 'Gold', 'Rose Gold', 'Product RED', 'Jet Black'],
            display: '4.7" Retina HD',
            chip: 'A10 Fusion',
            camera: '12MP',
            battery: 'Video playback: Up to 13 hours'
        }
    };

    const conditionOptions = ['Excellent - Like New', 'Good - Minor Signs', 'Fair - Visible Use'];

    const specs = iphoneSpecs[product.name] || {
        storages: ['64GB', '128GB'],
        colors: ['Space Gray', 'Silver'],
        display: 'Retina Display',
        chip: 'A-series Chip',
        camera: '12MP Camera',
        battery: 'All-day battery'
    };

    const handleAddToCart = () => {
        if (!selectedStorage || !selectedColor || !selectedCondition) {
            alert('Please select storage, color, and condition');
            return;
        }

        const finalProductName = `${product.name} - ${selectedStorage} - ${selectedColor} - ${selectedCondition}`;
        
        addToCart(
            {
                ...product,
                displayName: finalProductName
            },
            selectedColor,
            selectedStorage,
            quantity,
            selectedCondition
        );

        // Reset form
        setSelectedStorage('');
        setSelectedColor('');
        setSelectedCondition('');
        setQuantity(1);
        
        // Close modal
        onClose();
        alert('iPhone added to cart!');
    };

    const calculateTotalPrice = () => {
        const basePrice = parseFloat(product.price);
        
        // Add storage upgrade costs
        let storageCost = 0;
        if (selectedStorage === '256GB') storageCost = 800;
        if (selectedStorage === '512GB') storageCost = 1500;
        
        // Add condition discount for lower conditions
        let conditionDiscount = 0;
        if (selectedCondition === 'Good - Minor Signs') conditionDiscount = -300;
        if (selectedCondition === 'Fair - Visible Use') conditionDiscount = -600;
        
        return (basePrice + storageCost + conditionDiscount) * quantity;
    };

    if (!isOpen) return null;

    return (
        <div className="ipmod-overlay" onClick={onClose}>
            <div className="ipmod-content" onClick={(e) => e.stopPropagation()}>
                <button className="ipmod-close" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>

                <div className="ipmod-body">
                    <div className="ipmod-image">
                        <img src={product.image} alt={product.name} />
                    </div>

                    <div className="ipmod-details">
                        <h2 className="ipmod-title">{product.name}</h2>
                        <p className="ipmod-category">Refurbished iPhone • Unlocked</p>

                        <div className="ipmod-specs-grid">
                            <div className="ipmod-spec-item">
                                <span className="ipmod-spec-label">Display</span>
                                <span className="ipmod-spec-value">{specs.display}</span>
                            </div>
                            <div className="ipmod-spec-item">
                                <span className="ipmod-spec-label">Chip</span>
                                <span className="ipmod-spec-value">{specs.chip}</span>
                            </div>
                            <div className="ipmod-spec-item">
                                <span className="ipmod-spec-label">Camera</span>
                                <span className="ipmod-spec-value">{specs.camera}</span>
                            </div>
                            <div className="ipmod-spec-item">
                                <span className="ipmod-spec-label">Battery</span>
                                <span className="ipmod-spec-value">{specs.battery}</span>
                            </div>
                        </div>

                        <div className="ipmod-price-section">
                            <span className="ipmod-price">R{product.price}</span>
                            <div className="ipmod-total-price">
                                Total: R{calculateTotalPrice().toFixed(2)}
                            </div>
                        </div>

                        <div className="ipmod-options-section">
                            {/* Storage Selection */}
                            <div className="ipmod-option-group">
                                <label className="ipmod-option-label">Storage</label>
                                <div className="ipmod-storage-options">
                                    {specs.storages.map(storage => (
                                        <button
                                            key={storage}
                                            className={`ipmod-storage-option ${selectedStorage === storage ? 'selected' : ''}`}
                                            onClick={() => setSelectedStorage(storage)}
                                        >
                                            {storage}
                                            {storage === '256GB' && <span className="ipmod-price-addon">+R800</span>}
                                            {storage === '512GB' && <span className="ipmod-price-addon">+R1500</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Selection */}
                            <div className="ipmod-option-group">
                                <label className="ipmod-option-label">Color</label>
                                <div className="ipmod-color-options">
                                    {specs.colors.map(color => (
                                        <button
                                            key={color}
                                            className={`ipmod-color-option ${selectedColor === color ? 'selected' : ''}`}
                                            onClick={() => setSelectedColor(color)}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Condition Selection */}
                            <div className="ipmod-option-group">
                                <label className="ipmod-option-label">Condition</label>
                                <div className="ipmod-condition-options">
                                    {conditionOptions.map(condition => (
                                        <button
                                            key={condition}
                                            className={`ipmod-condition-option ${selectedCondition === condition ? 'selected' : ''}`}
                                            onClick={() => setSelectedCondition(condition)}
                                        >
                                            {condition}
                                            {condition === 'Good - Minor Signs' && <span className="ipmod-price-discount">-R300</span>}
                                            {condition === 'Fair - Visible Use' && <span className="ipmod-price-discount">-R600</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selection */}
                            <div className="ipmod-option-group">
                                <label className="ipmod-option-label">Quantity</label>
                                <div className="ipmod-quantity-selector">
                                    <button 
                                        className="ipmod-quantity-btn"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        -
                                    </button>
                                    <span className="ipmod-quantity-display">{quantity}</span>
                                    <button 
                                        className="ipmod-quantity-btn"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="ipmod-actions">
                            <button 
                                className="ipmod-add-to-cart-btn"
                                onClick={handleAddToCart}
                                disabled={!selectedStorage || !selectedColor || !selectedCondition}
                            >
                                <i className="fas fa-shopping-cart"></i>
                                Add to Cart - R{calculateTotalPrice().toFixed(2)}
                            </button>
                        </div>

                        <div className="ipmod-features">
                            <h4>What's Included:</h4>
                            <ul>
                                <li>✓ Certified Refurbished iPhone</li>
                                <li>✓ Original Charging Cable</li>
                                <li>✓ 6-Month Warranty</li>
                                <li>✓ 30-Day Return Policy</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IphoneModal;