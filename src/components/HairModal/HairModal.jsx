import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './HairModal.css';

const ProductModal = ({ product, isOpen, onClose }) => {
    const [selectedColor, setSelectedColor] = useState('Natural Black');
    const [selectedLength, setSelectedLength] = useState(product.length || '20-22 inches');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const colorOptions = [
        { name: 'Natural Black', color: '#1a1a1a', standard: true },
        { name: 'Off Black', color: '#3c3c3e', standard: false },
        { name: 'Dark Brown', color: '#5d4037', standard: false },
        { name: 'Light Brown', color: '#8d6e63', standard: false },
        { name: 'Honey Blonde', color: '#ffd54f', standard: false },
        { name: 'Platinum Blonde', color: '#fff8e1', standard: false },
        { name: 'Burgundy', color: '#880e4f', standard: false },
        { name: 'Auburn', color: '#a52a2a', standard: false },
        { name: 'Rose Gold', color: '#b76e79', standard: false }
    ];

    const lengthPresets = [
        { length: '16 inches', desc: 'Shoulder Length' },
        { length: '20 inches', desc: 'Mid Back' },
        { length: '24 inches', desc: 'Waist Length' },
        { length: '28 inches', desc: 'Hip Length' },
    ];

    const wigSpecs = {
        'Human Hair Wig': {
            material: '100% Human Hair',
            density: '130% Medium Density',
            cap: 'Lace Front + Adjustable',
            lifespan: '1-2 Years with Care'
        },
        'Synthetic Wig': {
            material: 'Premium Synthetic Fiber',
            density: '120% Light Density',
            cap: 'Basic Cap + Adjustable',
            lifespan: '4-6 Months'
        },
        'Lace Front Wig': {
            material: 'Human Hair Lace',
            density: '150% High Density',
            cap: 'Full Lace Front',
            lifespan: '1-2 Years'
        },
        'Full Lace Wig': {
            material: '100% Human Hair',
            density: '180% Ultra Density',
            cap: '360° Lace',
            lifespan: '2+ Years'
        }
    };

    const getWigType = () => {
        const name = product.name.toLowerCase();
        if (name.includes('human hair')) return 'Human Hair Wig';
        if (name.includes('synthetic')) return 'Synthetic Wig';
        if (name.includes('lace front')) return 'Lace Front Wig';
        if (name.includes('full lace')) return 'Full Lace Wig';
        return 'Human Hair Wig';
    };

    const wigType = getWigType();
    const specs = wigSpecs[wigType] || wigSpecs['Human Hair Wig'];

    const handleAddToCart = () => {
        const colorData = colorOptions.find(c => c.name === selectedColor);
        const finalProductName = `${product.name} - ${selectedColor} - ${selectedLength}`;
        
        const totalPrice = calculateTotalPrice();
        
        addToCart(
            {
                ...product,
                displayName: finalProductName,
                price: totalPrice.toFixed(2),
                selectedColor: selectedColor,
                selectedLength: selectedLength,
                isPremiumColor: !colorData.standard
            },
            quantity
        );

        setSelectedColor('Natural Black');
        setSelectedLength('20-22 inches');
        setQuantity(1);
        onClose();
        alert('Added to cart!');
    };

    const calculateTotalPrice = () => {
        const basePrice = parseFloat(product.price);
        const colorData = colorOptions.find(c => c.name === selectedColor);
        const colorCost = !colorData.standard ? 100 : 0;
        return (basePrice + colorCost) * quantity;
    };

    if (!isOpen) return null;

    return (
        <div className="hr-modal-overlay" onClick={onClose}>
            <div className="hr-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="hr-modal-close" onClick={onClose} aria-label="Close">
                    ✕
                </button>

                <div className="hr-modal-body">
                    {/* Left Product img */}
                    <div className="hr-modal-image">
                        <img 
                            src={product.image} 
                            alt={product.name}
                            className="hr-modal-img"
                        />
                        <div className="hr-type-badge">{wigType}</div>
                    </div>

                    {/* Right Product Info */}
                    <div className="hr-modal-info">
                        <div className="hr-modal-header">
                            <h1>{product.name}</h1>
                            <p>Premium Hair Collection</p>
                        </div>

                        <div className="hr-modal-specs">
                            <div className="hr-spec-item">
                                <span className="hr-spec-label">Material</span>
                                <span className="hr-spec-value">{specs.material}</span>
                            </div>
                            <div className="hr-spec-item">
                                <span className="hr-spec-label">Density</span>
                                <span className="hr-spec-value">{specs.density}</span>
                            </div>
                            <div className="hr-spec-item">
                                <span className="hr-spec-label">Cap Construction</span>
                                <span className="hr-spec-value">{specs.cap}</span>
                            </div>
                            <div className="hr-spec-item">
                                <span className="hr-spec-label">Lifespan</span>
                                <span className="hr-spec-value">{specs.lifespan}</span>
                            </div>
                        </div>

                        <div className="hr-modal-price-section">
                            <div className="hr-base-price">R{product.price}</div>
                            {selectedColor && (
                                <div className="hr-total-price">
                                    Total: <span>R{calculateTotalPrice().toFixed(2)}</span>
                                </div>
                            )}
                        </div>

                        <div className="hr-modal-options-section">
                            {/* Color */}
                            <div className="hr-option-group">
                                <div className="hr-option-label">Color</div>
                                <div className="hr-color-options">
                                    {colorOptions.map((color, index) => (
                                        <button
                                            key={index}
                                            className={`hr-color-option ${
                                                selectedColor === color.name ? 'hr-selected' : ''
                                            } ${!color.standard ? 'hr-premium' : ''}`}
                                            onClick={() => setSelectedColor(color.name)}
                                            aria-label={`Select ${color.name}`}
                                            title={`${color.name}${!color.standard ? ' +R100' : ''}`}
                                        >
                                            <span 
                                                className="hr-color-dot"
                                                style={{ backgroundColor: color.color }}
                                            />
                                            {!color.standard && (
                                                <span className="hr-premium-badge">+</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="hr-color-note">
                                    {selectedColor && colorOptions.find(c => c.name === selectedColor)?.standard ? (
                                        'Standard color - No extra charge'
                                    ) : (
                                        <span className="hr-premium-text">Premium color - +R100</span>
                                    )}
                                </div>
                            </div>

                            {/* Length */}
                            <div className="hr-option-group">
                                <div className="hr-option-label">Length</div>
                                <div className="hr-length-options">
                                    {lengthPresets.map((preset, index) => (
                                        <button
                                            key={index}
                                            className={`hr-length-option ${
                                                selectedLength === preset.length ? 'hr-selected' : ''
                                            }`}
                                            onClick={() => setSelectedLength(preset.length)}
                                        >
                                            <div className="hr-length-text">{preset.length}</div>
                                            <div className="hr-length-desc">{preset.desc}</div>
                                        </button>
                                    ))}
                                </div>
                                {selectedLength === 'Custom' && (
                                    <div className="hr-custom-length-input">
                                        <input 
                                            type="text"
                                            value={selectedLength}
                                            onChange={(e) => setSelectedLength(e.target.value)}
                                            placeholder="Enter custom length (e.g., 18-20 inches)"
                                            className="hr-length-input"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Quantity */}
                            <div className="hr-option-group">
                                <div className="hr-option-label">Quantity</div>
                                <div className="hr-quantity-selector">
                                    <button 
                                        className="hr-qty-btn hr-minus"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>
                                    <span className="hr-qty-value">{quantity}</span>
                                    <button 
                                        className="hr-qty-btn hr-plus"
                                        onClick={() => setQuantity(quantity + 1)}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button 
                            className={`hr-add-to-cart-btn ${
                                !selectedColor ? 'hr-disabled' : ''
                            }`}
                            onClick={handleAddToCart}
                            disabled={!selectedColor}
                        >
                            Add to Cart • R{calculateTotalPrice().toFixed(2)}
                        </button>

                        {/* Guarantee */}
                        <div className="hr-guarantee-info">
                            <span className="hr-guarantee-badge">✓ 30-Day Returns</span>
                            <span className="hr-guarantee-badge">✓ Free Adjustments</span>
                            <span className="hr-guarantee-badge">✓ Quality Guaranteed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
