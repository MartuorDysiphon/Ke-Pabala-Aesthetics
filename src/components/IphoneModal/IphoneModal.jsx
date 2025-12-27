import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import './IphoneModal.css';

const IphoneModal = ({ product, isOpen, onClose }) => {
    const [selectedCondition, setSelectedCondition] = useState('Pre-Owned');
    const [selectedStorage, setSelectedStorage] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const { addToCart } = useCart();

    // Complete pricing structure based on your list
    const iphonePricing = {
        "iPhone 7": {
            "Pre-Owned": [
                { storage: '32GB', price: 2500 }
            ],
            "New": [
                { storage: '32GB', price: 3000 }
            ]
        },
        "iPhone 7 Plus": {
            "Pre-Owned": [
                { storage: '32GB', price: 3050 },
                { storage: '128GB', price: 3200 }
            ],
            "New": [
                { storage: '128GB', price: 3400 }
            ]
        },
        "iPhone 8": {
            "Pre-Owned": [
                { storage: '64GB', price: 2950 }
            ],
            "New": [
                { storage: '64GB', price: 3400 }
            ]
        },
        "iPhone 8 Plus": {
            "Pre-Owned": [
                { storage: '64GB', price: 3600 }
            ],
            "New": [
                { storage: '64GB', price: 4000 }
            ]
        },
        "iPhone X": {
            "Pre-Owned": [
                { storage: '64GB', price: 3900 }
            ],
            "New": [
                { storage: '64GB', price: 4300 }
            ]
        },
        "iPhone XR": {
            "Pre-Owned": [
                { storage: '64GB', price: 4100 },
                { storage: '128GB', price: 4500 }
            ],
            "New": [
                { storage: '64GB', price: 4500 },
                { storage: '128GB', price: 5000 }
            ]
        },
        "iPhone 11": {
            "Pre-Owned": [
                { storage: '64GB', price: 5100 },
                { storage: '128GB', price: 5550 }
            ],
            "New": [
                { storage: '64GB', price: 5500 },
                { storage: '128GB', price: 6150 }
            ]
        },
        "iPhone 11 Pro": {
            "Pre-Owned": [
                { storage: '64GB', price: 6400 }
            ],
            "New": [
                { storage: '64GB', price: 7400 }
            ]
        },
        "iPhone 12": {
            "Pre-Owned": [
                { storage: '64GB', price: 6800 },
                { storage: '128GB', price: 7000 }
            ],
            "New": [
                { storage: '64GB', price: 6800 },
                { storage: '128GB', price: 7100 }
            ]
        }
    };

    const appleColorOptions = {
        "iPhone 7": ['Black', 'Silver', 'Gold', 'Rose Gold', 'Red', 'Jet Black'],
        "iPhone 7 Plus": ['Black', 'Silver', 'Gold', 'Rose Gold', 'Red', 'Jet Black'],
        "iPhone 8": ['Space Gray', 'Silver', 'Gold', 'Red'],
        "iPhone 8 Plus": ['Space Gray', 'Silver', 'Gold', 'Red'],
        "iPhone X": ['Space Gray', 'Silver'],
        "iPhone XR": ['Black', 'White', 'Blue', 'Yellow', 'Coral', 'Red'],
        "iPhone 11": ['Black', 'Green', 'Yellow', 'Purple', 'Red', 'White'],
        "iPhone 11 Pro": ['Midnight Green', 'Space Gray', 'Silver', 'Gold'],
        "iPhone 12": ['Black', 'White', 'Green', 'Blue', 'Purple', 'Red']
    };

    const iphoneSpecs = {
        "iPhone 7": {
            display: '4.7" Retina HD',
            chip: 'A10 Fusion',
            camera: '12MP',
            battery: 'Up to 13h'
        },
        "iPhone 7 Plus": {
            display: '5.5" Retina HD',
            chip: 'A10 Fusion',
            camera: 'Dual 12MP',
            battery: 'Up to 14h'
        },
        "iPhone 8": {
            display: '4.7" Retina HD',
            chip: 'A11 Bionic',
            camera: '12MP',
            battery: 'Up to 13h'
        },
        "iPhone 8 Plus": {
            display: '5.5" Retina HD',
            chip: 'A11 Bionic',
            camera: 'Dual 12MP',
            battery: 'Up to 14h'
        },
        "iPhone X": {
            display: '5.8" Super Retina HD',
            chip: 'A11 Bionic',
            camera: 'Dual 12MP',
            battery: 'Up to 13h'
        },
        "iPhone XR": {
            display: '6.1" Liquid Retina HD',
            chip: 'A12 Bionic',
            camera: '12MP',
            battery: 'Up to 16h'
        },
        "iPhone 11": {
            display: '6.1" Liquid Retina HD',
            chip: 'A13 Bionic',
            camera: 'Dual 12MP',
            battery: 'Up to 17h'
        },
        "iPhone 11 Pro": {
            display: '5.8" Super Retina XDR',
            chip: 'A13 Bionic',
            camera: 'Triple 12MP',
            battery: 'Up to 18h'
        },
        "iPhone 12": {
            display: '6.1" Super Retina XDR',
            chip: 'A14 Bionic',
            camera: 'Dual 12MP',
            battery: 'Up to 17h'
        }
    };

    const baseModel = product.baseName;
    const conditionOptions = ['Pre-Owned', 'New'];
    const availableStorageOptions = iphonePricing[baseModel]?.[selectedCondition] || [];
    const colorOptions = appleColorOptions[baseModel] || ['Space Gray', 'Silver'];
    const specs = iphoneSpecs[baseModel] || iphoneSpecs["iPhone 12"];

    // Initialize selections
    useEffect(() => {
        if (availableStorageOptions.length > 0 && !selectedStorage) {
            setSelectedStorage(availableStorageOptions[0].storage);
        }
    }, [selectedCondition, availableStorageOptions]);

    useEffect(() => {
        if (colorOptions.length > 0 && !selectedColor) {
            setSelectedColor(colorOptions[0]);
        }
    }, [colorOptions]);

    const getCurrentPrice = () => {
        if (!selectedStorage) return 0;
        const storageOption = availableStorageOptions.find(opt => opt.storage === selectedStorage);
        return storageOption ? storageOption.price : 0;
    };

    const handleAddToCart = () => {
        if (!selectedStorage || !selectedColor) {
            alert('Please select storage and color');
            return;
        }

        const finalProductName = `${baseModel} ${selectedStorage} ${selectedColor} (${selectedCondition})`;
        const totalPrice = getCurrentPrice();
        
        addToCart(
            {
                ...product,
                displayName: finalProductName,
                price: totalPrice.toString(),
                selectedColor: selectedColor,
                selectedStorage: selectedStorage,
                selectedCondition: selectedCondition,
                baseModel: baseModel
            },
            1 // Always add 1 quantity
        );

        onClose();
        alert('Added to cart!');
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

    const getConditionDescription = (condition) => {
        return condition === 'Pre-Owned' 
            ? 'Certified refurbished, excellent condition' 
            : 'Brand new, sealed in original box';
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
                            alt={baseModel}
                            className="iphone-modal-img"
                        />
                    </div>

                    <div className="iphone-modal-info">
                        <div className="iphone-modal-header">
                            <h1>{baseModel}</h1>
                            <p>Apple Certified Devices</p>
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
                            <div className="base-price">R{getCurrentPrice().toFixed(2)}</div>
                            <div className="total-price">
                                Total: <span>R{getCurrentPrice().toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="iphone-modal-options-section">
                            {/* Condition */}
                            <div className="option-group">
                                <div className="option-label">Condition</div>
                                <div className="condition-options">
                                    {conditionOptions.map((condition, index) => {
                                        if (iphonePricing[baseModel]?.[condition]?.length === 0) return null;
                                        
                                        return (
                                            <button
                                                key={index}
                                                className={`condition-option ${
                                                    selectedCondition === condition ? 'selected' : ''
                                                }`}
                                                onClick={() => {
                                                    setSelectedCondition(condition);
                                                    setSelectedStorage('');
                                                }}
                                                title={getConditionDescription(condition)}
                                            >
                                                {condition}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Storage */}
                            <div className="option-group">
                                <div className="option-label">Storage</div>
                                <div className="storage-options">
                                    {availableStorageOptions.map((option, index) => (
                                        <button
                                            key={index}
                                            className={`storage-option ${
                                                selectedStorage === option.storage ? 'selected' : ''
                                            }`}
                                            onClick={() => setSelectedStorage(option.storage)}
                                        >
                                            {option.storage}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color */}
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
                        </div>

                        <button 
                            className={`add-to-cart-btn ${
                                !selectedStorage || !selectedColor ? 'disabled' : ''
                            }`}
                            onClick={handleAddToCart}
                            disabled={!selectedStorage || !selectedColor}
                        >
                            Add to Cart • R{getCurrentPrice().toFixed(2)}
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