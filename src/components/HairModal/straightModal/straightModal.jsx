// straightModal.jsx - LENGTH-BASED PRICING
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useCart } from '../../../context/CartContext';
import './straightModal.css';

const StraightHairModal = ({ product, isOpen, onClose }) => {
    const [selectedLength, setSelectedLength] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const colorOptions = useMemo(() => ({
        'Natural Black': { bg: '#1a1a1a', name: 'Natural Black', premium: false },
        'Jet Black': { bg: '#000000', name: 'Jet Black', premium: false },
        'Dark Brown': { bg: '#5D4037', name: 'Dark Brown', premium: true },
        'Light Brown': { bg: '#8D6E63', name: 'Light Brown', premium: true },
        'Burgundy': { bg: '#800020', name: 'Burgundy', premium: true },
        'Chocolate Brown': { bg: '#7B3F00', name: 'Chocolate', premium: true },
        'Blonde': { bg: '#F5DEB3', name: 'Blonde', premium: true },
        'Honey Blonde': { bg: '#DAA520', name: 'Honey Blonde', premium: true },
        'Auburn': { bg: '#A52A2A', name: 'Auburn', premium: true }
    }), []);

    // Length options with prices
    const lengthOptions = useMemo(() => {
        const basePrice = product?.price || 0;
        return [
            { length: "18 inches", price: basePrice * 0.9 },
            { length: "20 inches", price: basePrice },
            { length: "22 inches", price: basePrice * 1.1 },
            { length: "24 inches", price: basePrice * 1.2 },
            { length: "26 inches", price: basePrice * 1.35 },
            { length: "28 inches", price: basePrice * 1.5 },
            { length: "30 inches", price: basePrice * 1.7 }
        ];
    }, [product?.price]);

    // Initialize selections
    useEffect(() => {
        if (product && isOpen) {
            // Set default length
            if (lengthOptions.length > 0) {
                const defaultLength = product.length || "20 inches";
                setSelectedLength(defaultLength);
            }
            
            // Set default color
            if (product.color) {
                setSelectedColor(product.color);
            } else {
                const standardColor = Object.keys(colorOptions).find(key => !colorOptions[key].premium);
                setSelectedColor(standardColor || 'Natural Black');
            }
            
            setQuantity(1);
        }
    }, [product, isOpen, lengthOptions, colorOptions]);

    // Get available colors from product or use defaults
    const availableColors = useMemo(() => {
        const productColors = product?.availableColors || Object.keys(colorOptions);
        return productColors.map(color => ({
            code: color,
            ...colorOptions[color]
        })).filter(Boolean);
    }, [product?.availableColors, colorOptions]);

    const getSelectedLengthData = useCallback(() => {
        return lengthOptions.find(l => l.length === selectedLength) || lengthOptions[1];
    }, [selectedLength, lengthOptions]);

    // prices
    const getLengthPrice = useCallback(() => {
        const lengthData = getSelectedLengthData();
        return lengthData?.price || product?.price || 0;
    }, [getSelectedLengthData, product?.price]);

    const isPremiumColor = useCallback(() => {
        return colorOptions[selectedColor]?.premium || false;
    }, [selectedColor, colorOptions]);

    const calculateTotalPrice = useCallback(() => {
        const lengthPrice = getLengthPrice();
        const colorPremium = isPremiumColor() ? 100 : 0;
        return (lengthPrice + colorPremium) * quantity;
    }, [getLengthPrice, isPremiumColor, quantity]);

    // add to cart
    const handleAddToCart = () => {
        if (!selectedLength || !selectedColor) return;

        const finalProductName = `${product.name} - ${colorOptions[selectedColor]?.name || selectedColor} - ${selectedLength}`;
        
        const cartItem = {
            ...product,
            id: `${product.id}-${selectedColor}-${selectedLength}`,
            displayName: finalProductName,
            price: calculateTotalPrice().toFixed(2),
            selectedColor: colorOptions[selectedColor]?.name || selectedColor,
            selectedLength: selectedLength,
            isPremiumColor: isPremiumColor(),
            quantity: quantity,
            image: product.images?.[0] || product.image
        };

        addToCart(cartItem, quantity);
        alert(`Added to cart!\n${finalProductName}\nR${calculateTotalPrice().toFixed(2)}`);
        onClose();
    };

    if (!isOpen || !product) return null;

    const totalPrice = calculateTotalPrice();
    const lengthPrice = getLengthPrice();

    return (
        <div className="straight-modal-overlay" onClick={onClose}>
            <div className="straight-modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="straight-modal-close" onClick={onClose}>✕</button>
                
                <div className="straight-modal-body">
                    <div className="straight-modal-image">
                        <img 
                            src={product.images?.[0] || product.image} 
                            alt={product.name}
                            className="straight-modal-img"
                        />
                        <div className="straight-type-badge">Straight Hair</div>
                    </div>

                    {/* Right - Info */}
                    <div className="straight-modal-info">
                        <div className="straight-modal-header">
                            <h2>{product.name}</h2>
                            <p>{product.texture} • {product.category} • {product.origin} Hair</p>
                        </div>

                        <div className="straight-modal-specs">
                            <div className="straight-spec-item">
                                <span className="straight-spec-label">Quality</span>
                                <span className="straight-spec-value">{product.quality}</span>
                            </div>
                            <div className="straight-spec-item">
                                <span className="straight-spec-label">Origin</span>
                                <span className="straight-spec-value">{product.origin}</span>
                            </div>
                            <div className="straight-spec-item">
                                <span className="straight-spec-label">Texture</span>
                                <span className="straight-spec-value">{product.texture}</span>
                            </div>
                            <div className="straight-spec-item">
                                <span className="straight-spec-label">Shedding</span>
                                <span className="straight-spec-value">Minimal</span>
                            </div>
                        </div>

                        <div className="straight-modal-price-section">
                            <div className="straight-base-price">R{lengthPrice.toFixed(2)}</div>
                            <div className="straight-total-price">
                                Total: <span>R{totalPrice.toFixed(2)}</span>
                                {isPremiumColor() && (
                                    <div style={{ fontSize: '11px', color: '#86868b', marginTop: '4px' }}>
                                        Includes: Premium Color (+R100)
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="straight-modal-options-section">
                            <div className="straight-option-group">
                                <div className="straight-option-label">
                                    Color
                                    <span className="straight-premium-text">Premium +R100</span>
                                </div>
                                <div className="straight-color-options">
                                    {availableColors.map((color) => (
                                        <button
                                            key={color.code}
                                            className={`straight-color-option ${selectedColor === color.code ? 'selected' : ''}`}
                                            onClick={() => setSelectedColor(color.code)}
                                            title={`${color.name}${color.premium ? ' +R100' : ''}`}
                                        >
                                            <span 
                                                className="straight-color-dot"
                                                style={{ backgroundColor: color.bg }}
                                            />
                                            {color.premium && (
                                                <span className="straight-premium-badge">+</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="straight-color-note">
                                    {selectedColor && colorOptions[selectedColor]?.premium ? (
                                        <span className="straight-premium-text">Premium color - +R100</span>
                                    ) : (
                                        'Standard color - No extra charge'
                                    )}
                                </div>
                            </div>

                            <div className="straight-option-group">
                                <div className="straight-option-label">
                                    Length
                                    <span className="straight-option-count">{lengthOptions.length} options</span>
                                </div>
                                <div className="straight-length-options">
                                    {lengthOptions.map((option) => (
                                        <button
                                            key={option.length}
                                            className={`straight-length-option ${selectedLength === option.length ? 'selected' : ''}`}
                                            onClick={() => setSelectedLength(option.length)}
                                        >
                                            <span className="straight-length-text">{option.length}</span>
                                            <span className="straight-length-price">R{option.price.toFixed(2)}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="straight-option-group">
                                <div className="straight-option-label">Quantity</div>
                                <div className="straight-quantity-selector">
                                    <button 
                                        className="straight-qty-btn"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                    >
                                        −
                                    </button>
                                    <span className="straight-qty-value">{quantity}</span>
                                    <button 
                                        className="straight-qty-btn"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button 
                            className="straight-add-to-cart-btn"
                            onClick={handleAddToCart}
                            disabled={!selectedLength || !selectedColor}
                        >
                            Add to Cart • R{totalPrice.toFixed(2)}
                        </button>

                        <div className="straight-guarantee-info">
                            <span className="straight-guarantee-badge">✓ 30-Day Returns</span>
                            <span className="straight-guarantee-badge">✓ Free Adjustments</span>
                            <span className="straight-guarantee-badge">✓ Quality Guaranteed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StraightHairModal;