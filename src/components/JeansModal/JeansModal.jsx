import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './JeansModal.css';

const JeansModal = ({ product, isOpen, onClose }) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    // Premium jeans size options
    const sizeOptions = [
        { size: '28', label: '28' },
        { size: '29', label: '29' },
        { size: '30', label: '30' },
        { size: '31', label: '31' },
        { size: '32', label: '32' },
        { size: '33', label: '33' },
        { size: '34', label: '34' },
        { size: '36', label: '36' },
        { size: '38', label: '38' }
    ];

    // Premium jeans specifications
    const jeansSpecs = {
        "Premium Denim": {
            fabric: '100% Premium Cotton',
            weight: '12 oz Selvedge',
            wash: 'Stone Washed',
            stretch: '2% Elastane'
        },
        "Designer Jeans": {
            fabric: '98% Cotton, 2% Elastane',
            weight: '11 oz Japanese Denim',
            wash: 'Rinsed',
            stretch: 'Premium Stretch'
        },
        "Raw Denim": {
            fabric: '100% Raw Selvedge',
            weight: '14 oz Unsanforized',
            wash: 'Unwashed',
            stretch: 'No Stretch'
        },
        "Slim Fit": {
            fabric: '99% Cotton, 1% Elastane',
            weight: '10.5 oz',
            wash: 'Light Wash',
            stretch: 'Comfort Stretch'
        }
    };

    const specs = jeansSpecs[product.category] || jeansSpecs["Premium Denim"];

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select size');
            return;
        }

        const finalProductName = `${product.name} - Size ${selectedSize}`;
        
        addToCart(
            {
                ...product,
                displayName: finalProductName,
                selectedSize: selectedSize
            },
            quantity
        );

        setSelectedSize('');
        setQuantity(1);
        onClose();
        alert('Added to cart!');
    };

    const calculateTotalPrice = () => {
        const basePrice = parseFloat(product.price);
        return basePrice * quantity;
    };

    if (!isOpen) return null;

    return (
        <div className="JM-overlay" onClick={onClose}>
            <div className="JM-content" onClick={(e) => e.stopPropagation()}>
                <button className="JM-close" onClick={onClose} aria-label="Close">
                    ✕
                </button>

                <div className="JM-body">
                    <div className="JM-image">
                        <img 
                            src={product.image} 
                            alt={product.name}
                            className="JM-img"
                        />
                    </div>

                    <div className="JM-info">
                        <div className="JM-header">
                            <h1>{product.name}</h1>
                            <p>Premium Denim Collection</p>
                        </div>

                        <div className="JM-specs">
                            <div className="JM-spec-item">
                                <span className="JM-spec-label">Fabric</span>
                                <span className="JM-spec-value">{specs.fabric}</span>
                            </div>
                            <div className="JM-spec-item">
                                <span className="JM-spec-label">Weight</span>
                                <span className="JM-spec-value">{specs.weight}</span>
                            </div>
                            <div className="JM-spec-item">
                                <span className="JM-spec-label">Wash</span>
                                <span className="JM-spec-value">{specs.wash}</span>
                            </div>
                            <div className="JM-spec-item">
                                <span className="JM-spec-label">Stretch</span>
                                <span className="JM-spec-value">{specs.stretch}</span>
                            </div>
                        </div>

                        <div className="JM-price-section">
                            <div className="JM-base-price">R{product.price}</div>
                            <div className="JM-total-price">
                                Total: <span>R{calculateTotalPrice().toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="JM-options-section">
                            {/* Size Selection */}
                            <div className="JM-option-group">
                                <div className="JM-option-label">Size (Waist)</div>
                                <div className="JM-size-options">
                                    {sizeOptions.map((option, index) => (
                                        <button
                                            key={index}
                                            className={`JM-size-option ${
                                                selectedSize === option.size ? 'JM-selected' : ''
                                            }`}
                                            onClick={() => setSelectedSize(option.size)}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selection */}
                            <div className="JM-option-group">
                                <div className="JM-option-label">Quantity</div>
                                <div className="JM-quantity-selector">
                                    <button 
                                        className="JM-qty-btn JM-minus"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>
                                    <span className="JM-qty-value">{quantity}</span>
                                    <button 
                                        className="JM-qty-btn JM-plus"
                                        onClick={() => setQuantity(quantity + 1)}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button 
                            className={`JM-add-to-cart-btn ${
                                !selectedSize ? 'JM-disabled' : ''
                            }`}
                            onClick={handleAddToCart}
                            disabled={!selectedSize}
                        >
                            Add to Cart • R{calculateTotalPrice().toFixed(2)}
                        </button>

                        <div className="JM-quality-info">
                            <span className="JM-quality-badge">✓ Premium Denim</span>
                            <span className="JM-quality-badge">✓ Quality Stitching</span>
                            <span className="JM-quality-badge">✓ Modern Design</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JeansModal;