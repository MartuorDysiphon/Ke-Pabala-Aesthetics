import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './ProductModal.css';

const ProductModal = ({ product, isOpen, onClose }) => {
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [customColor, setCustomColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const hairColors = [
        'Standard color', 
    ];

    const hairSizes = ['12-14"', '14-16"', '16-18"', '18-20"', '20-22"', '22-24"', '24-26"', '26-28"'];

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            alert('Please select color and size');
            return;
        }

        const finalColor = selectedColor === 'custom' ? customColor : selectedColor;
        
        addToCart(
            {
                ...product,
                displayName: `${product.name} - ${finalColor} - ${selectedSize}`
            },
            finalColor,
            selectedSize,
            quantity
        );

        // Reset form
        setSelectedColor('');
        setSelectedSize('');
        setCustomColor('');
        setQuantity(1);
        
        // Close modal or show success message
        onClose();
        alert('Product added to cart!');
    };

    const calculateTotalPrice = () => {
        const basePrice = parseFloat(product.price);
        const customColorCost = selectedColor === 'custom' ? 100 : 0;
        return (basePrice + customColorCost) * quantity;
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>

                <div className="modal-body">
                    <div className="modal-image">
                        <img src={product.image} alt={product.name} />
                    </div>

                    <div className="modal-details">
                        <h2 className="modal-title">{product.name}</h2>
                        <p className="modal-category">{product.category} • {product.length}</p>
                        <p className="modal-description">
                            Premium 100% human hair. Double wefted for extra durability. 
                            Can be styled, colored, and treated just like natural hair.
                        </p>

                        <div className="modal-price-section">
                            <span className="modal-price">R{product.price}</span>
                            {selectedColor === 'custom' && (
                                <span className="custom-color-cost">+ R100 for custom color</span>
                            )}
                            <div className="total-price">
                                Total: R{calculateTotalPrice().toFixed(2)}
                            </div>
                        </div>

                        <div className="options-section">
                            {/* Color Selection */}
                            <div className="option-group">
                                <label className="option-label">Color</label>
                                <div className="color-options">
                                    {hairColors.map(color => (
                                        <button
                                            key={color}
                                            className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                                            onClick={() => setSelectedColor(color)}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                    <button
                                        className={`color-option custom ${selectedColor === 'custom' ? 'selected' : ''}`}
                                        onClick={() => setSelectedColor('custom')}
                                    >
                                        Custom Color +R100
                                    </button>
                                </div>
                                {selectedColor === 'custom' && (
                                    <input
                                        type="text"
                                        placeholder="Describe your custom color"
                                        value={customColor}
                                        onChange={(e) => setCustomColor(e.target.value)}
                                        className="custom-color-input"
                                    />
                                )}
                            </div>

                            {/* Size Selection */}
                            <div className="option-group">
                                <label className="option-label">Length</label>
                                <div className="size-options">
                                    {hairSizes.map(size => (
                                        <button
                                            key={size}
                                            className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selection */}
                            <div className="option-group">
                                <label className="option-label">Quantity</label>
                                <div className="quantity-selector">
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-display">{quantity}</span>
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button 
                                className="btn btn-accent add-to-cart-btn"
                                onClick={handleAddToCart}
                                disabled={!selectedColor || !selectedSize || (selectedColor === 'custom' && !customColor)}
                            >
                                Add to Cart - R{calculateTotalPrice().toFixed(2)}
                            </button>
                        </div>

                        <div className="product-features">
                            <h4>Features:</h4>
                            <ul>
                                <li>✓ 100% Virgin Human Hair</li>
                                <li>✓ Double Wefted for Durability</li>
                                <li>✓ Can be Colored & Styled</li>
                                <li>✓ Tangle Free</li>
                                <li>✓ Shedding Resistant</li>
                                <li>✓ 2 Months Warranty</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;