import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './IphoneModal.css';

const IphoneModal = ({ product, isOpen, onClose }) => {
    const [selectedStorage, setSelectedStorage] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('Fair'); // Default to Fair
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const appleStorageOptions = {
        "iPhone 12": [
            { storage: '64GB', price: 0 },
            { storage: '128GB', price: 300 },
            { storage: '256GB', price: 800 }
        ],
        "iPhone 11 Pro": [
            { storage: '64GB', price: 0 },
            { storage: '256GB', price: 800 },
            { storage: '512GB', price: 1500 }
        ],
        "iPhone 11": [
            { storage: '64GB', price: 0 },
            { storage: '128GB', price: 300 }
        ],
        "iPhone XR": [
            { storage: '64GB', price: 0 },
            { storage: '128GB', price: 300 }
        ],
        "iPhone X": [
            { storage: '64GB', price: 0 },
            { storage: '256GB', price: 800 }
        ],
        "iPhone 8 Plus": [
            { storage: '64GB', price: 0 },
            { storage: '256GB', price: 800 }
        ],
        "iPhone 8": [
            { storage: '64GB', price: 0 },
            { storage: '256GB', price: 800 }
        ],
        "iPhone 7 Plus": [
            { storage: '32GB', price: 0 },
            { storage: '128GB', price: 500 }
        ],
        "iPhone 7": [
            { storage: '32GB', price: 0 },
            { storage: '128GB', price: 500 }
        ]
    };

    const appleColorOptions = {
        "iPhone 12": ['Black', 'White', 'Green', 'Blue', 'Purple', 'Red'],
        "iPhone 11 Pro": ['Midnight Green', 'Space Gray', 'Silver', 'Gold'],
        "iPhone 11": ['Black', 'Green', 'Yellow', 'Purple', 'Red', 'White'],
        "iPhone XR": ['Black', 'White', 'Blue', 'Yellow', 'Coral', 'Red'],
        "iPhone X": ['Space Gray', 'Silver'],
        "iPhone 8 Plus": ['Space Gray', 'Silver', 'Gold', 'Red'],
        "iPhone 8": ['Space Gray', 'Silver', 'Gold', 'Red'],
        "iPhone 7 Plus": ['Black', 'Silver', 'Gold', 'Rose Gold', 'Red', 'Jet Black'],
        "iPhone 7": ['Black', 'Silver', 'Gold', 'Rose Gold', 'Red', 'Jet Black']
    };

    const iphoneSpecs = {
        "iPhone 12": {
            display: '6.1" Super Retina XDR',
            chip: 'A14 Bionic',
            camera: 'Dual 12MP',
            battery: 'Up to 17h'
        },
        "iPhone 11 Pro": {
            display: '5.8" Super Retina XDR',
            chip: 'A13 Bionic',
            camera: 'Triple 12MP',
            battery: 'Up to 18h'
        },
        "iPhone 11": {
            display: '6.1" Liquid Retina HD',
            chip: 'A13 Bionic',
            camera: 'Dual 12MP',
            battery: 'Up to 17h'
        },
        "iPhone XR": {
            display: '6.1" Liquid Retina HD',
            chip: 'A12 Bionic',
            camera: '12MP',
            battery: 'Up to 16h'
        },
        "iPhone X": {
            display: '5.8" Super Retina HD',
            chip: 'A11 Bionic',
            camera: 'Dual 12MP',
            battery: 'Up to 13h'
        },
        "iPhone 8 Plus": {
            display: '5.5" Retina HD',
            chip: 'A11 Bionic',
            camera: 'Dual 12MP',
            battery: 'Up to 14h'
        },
        "iPhone 8": {
            display: '4.7" Retina HD',
            chip: 'A11 Bionic',
            camera: '12MP',
            battery: 'Up to 13h'
        },
        "iPhone 7 Plus": {
            display: '5.5" Retina HD',
            chip: 'A10 Fusion',
            camera: 'Dual 12MP',
            battery: 'Up to 14h'
        },
        "iPhone 7": {
            display: '4.7" Retina HD',
            chip: 'A10 Fusion',
            camera: '12MP',
            battery: 'Up to 13h'
        }
    };

    // conditions
    const conditionOptions = [
        { name: 'New', price: 500, description: 'Brand new, sealed in box' },
        { name: 'Fair', price: 0, description: 'Standard refurbished condition' },
        { name: 'Eco-Friendly', price: -200, description: 'Eco-friendly packaging, minor signs of use' }
    ];

    const storageOptions = appleStorageOptions[product.name] || [{ storage: '64GB', price: 0 }];
    const colorOptions = appleColorOptions[product.name] || ['Space Gray', 'Silver'];
    const specs = iphoneSpecs[product.name] || iphoneSpecs["iPhone 12"];

    const getStoragePrice = () => {
        const option = storageOptions.find(opt => opt.storage === selectedStorage);
        return option ? option.price : 0;
    };

    const getConditionPrice = () => {
        const option = conditionOptions.find(opt => opt.name === selectedCondition);
        return option ? option.price : 0;
    };

    const handleAddToCart = () => {
        if (!selectedStorage || !selectedColor) {
            alert('Please select storage and color');
            return;
        }

        const finalProductName = `${product.name} ${selectedStorage} ${selectedColor} (${selectedCondition})`;
        const totalPrice = parseFloat(product.price) + getStoragePrice() + getConditionPrice();
        
        addToCart(
            {
                ...product,
                displayName: finalProductName,
                price: totalPrice.toString(),
                selectedColor: selectedColor,
                selectedStorage: selectedStorage,
                selectedCondition: selectedCondition,
                conditionPriceAdjustment: getConditionPrice()
            },
            quantity
        );

        setSelectedStorage('');
        setSelectedColor('');
        setSelectedCondition('Fair'); 
        setQuantity(1);
        onClose();
        alert('Added to cart!');
    };

    const calculateTotalPrice = () => {
        const basePrice = parseFloat(product.price);
        const storagePrice = getStoragePrice();
        const conditionPrice = getConditionPrice();
        return (basePrice + storagePrice + conditionPrice) * quantity;
    };

    const getColorHex = (colorName) => {
        const colorMap = {
            'Black': '#000000',
            'White': '#F5F5F7',
            'Green': '#4CD964',
            'Blue': '#007AFF',
            'Purple': '#5856D6',
            'Red': '#FF3B30',
            'Midnight Green': '#5F7170',
            'Space Gray': '#8E8E93',
            'Silver': '#D1D1D6',
            'Gold': '#FFD700',
            'Yellow': '#FFCC00',
            'Coral': '#FF7F50',
            'Rose Gold': '#B76E79',
            'Jet Black': '#1C1C1E'
        };
        return colorMap[colorName] || '#8E8E93';
    };

    if (!isOpen) return null;

    return (
        <div className="iphone-modal-overlay" onClick={onClose}>
            <div className="iphone-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="iphone-modal-close" onClick={onClose} aria-label="Close">
                    ✕
                </button>

                <div className="iphone-modal-body">
                    <div className="iphone-modal-image">
                        <img 
                            src={product.image} 
                            alt={product.name}
                            className="iphone-modal-img"
                        />
                    </div>

                    <div className="iphone-modal-info">
                        <div className="iphone-modal-header">
                            <h1>{product.name}</h1>
                            <p>Apple Certified Refurbished</p>
                        </div>

                        <div className="iphone-modal-specs">
                            <div className="spec-item">
                                <span className="spec-label">Display</span>
                                <span className="spec-value">{specs.display}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Chip</span>
                                <span className="spec-value">{specs.chip}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Camera</span>
                                <span className="spec-value">{specs.camera}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Battery</span>
                                <span className="spec-value">{specs.battery}</span>
                            </div>
                        </div>

                        <div className="iphone-modal-price-section">
                            <div className="base-price">R{product.price}</div>
                            {(selectedStorage || selectedCondition !== 'Fair') && (
                                <div className="total-price">
                                    Total: <span>R{calculateTotalPrice().toFixed(2)}</span>
                                </div>
                            )}
                        </div>

                        <div className="iphone-modal-options-section">
                            {/* Condition */}
                            <div className="option-group">
                                <div className="option-label">Condition</div>
                                <div className="condition-options">
                                    {conditionOptions.map((condition, index) => (
                                        <button
                                            key={index}
                                            className={`condition-option ${
                                                selectedCondition === condition.name ? 'selected' : ''
                                            }`}
                                            onClick={() => setSelectedCondition(condition.name)}
                                            title={condition.description}
                                        >
                                            {condition.name}
                                            {condition.price !== 0 && (
                                                <span className={`price-badge ${condition.price > 0 ? 'positive' : 'negative'}`}>
                                                    {condition.price > 0 ? '+' : ''}R{condition.price}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Storage */}
                            <div className="option-group">
                                <div className="option-label">Storage</div>
                                <div className="storage-options">
                                    {storageOptions.map((option, index) => (
                                        <button
                                            key={index}
                                            className={`storage-option ${
                                                selectedStorage === option.storage ? 'selected' : ''
                                            }`}
                                            onClick={() => setSelectedStorage(option.storage)}
                                        >
                                            {option.storage}
                                            {option.price > 0 && (
                                                <span className="price-badge">+R{option.price}</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="option-group">
                                <div className="option-label">Color</div>
                                <div className="color-options">
                                    {colorOptions.map((color, index) => (
                                        <button
                                            key={index}
                                            className={`color-option ${
                                                selectedColor === color ? 'selected' : ''
                                            }`}
                                            onClick={() => setSelectedColor(color)}
                                            aria-label={`Select ${color}`}
                                            title={color}
                                        >
                                            <span 
                                                className="color-dot"
                                                style={{ backgroundColor: getColorHex(color) }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="option-group">
                                <div className="option-label">Quantity</div>
                                <div className="quantity-selector">
                                    <button 
                                        className="qty-btn minus"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>
                                    <span className="qty-value">{quantity}</span>
                                    <button 
                                        className="qty-btn plus"
                                        onClick={() => setQuantity(quantity + 1)}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button 
                            className={`add-to-cart-btn ${
                                !selectedStorage || !selectedColor ? 'disabled' : ''
                            }`}
                            onClick={handleAddToCart}
                            disabled={!selectedStorage || !selectedColor}
                        >
                            Add to Cart • R{calculateTotalPrice().toFixed(2)}
                        </button>

                        <div className="warranty-info">
                            <span className="warranty-badge">✓ 6-Month Warranty</span>
                            <span className="warranty-badge">✓ 30-Day Returns</span>
                            <span className="warranty-badge">✓ Apple Certified</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IphoneModal;