// JeansModal.jsx
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './JeansModal.css';

const JeansModal = ({ product, isOpen, onClose }) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const sizeOptions = ['28', '30', '32', '34', '36', '38'];
    const colorOptions = ['Dark Blue', 'Medium Blue', 'Light Blue', 'Black', 'Grey'];

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            alert('Please select size and color');
            return;
        }

        const finalProductName = `${product.name} - ${selectedColor} - Size ${selectedSize}`;
        
        addToCart(
            {
                ...product,
                displayName: finalProductName
            },
            selectedColor,
            selectedSize,
            quantity
        );

        // Reset form
        setSelectedSize('');
        setSelectedColor('');
        setQuantity(1);
        
        // Close modal
        onClose();
        alert('Jeans added to cart!');
    };

    const calculateTotalPrice = () => {
        const basePrice = parseFloat(product.price);
        return basePrice * quantity;
    };

    if (!isOpen) return null;

    return (
        <div className="jpmodal-overlay" onClick={onClose}>
            <div className="jpmodal-content" onClick={(e) => e.stopPropagation()}>
                <button className="jpmodal-close" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>

                <div className="jpmodal-body">
                    <div className="jpmodal-image">
                        <img src={product.image} alt={product.name} />
                    </div>

                    <div className="jpmodal-details">
                        <h2 className="jpmodal-title">{product.name}</h2>
                        <p className="jpmodal-category">{product.category}</p>
                        <p className="jpmodal-description">{product.description}</p>

                        <div className="jpmodal-price-section">
                            <span className="jpmodal-price">R{product.price}</span>
                            <div className="jpmodal-total-price">
                                Total: R{calculateTotalPrice().toFixed(2)}
                            </div>
                        </div>

                        <div className="jpmodal-options-section">
                            {/* Size Selection */}
                            <div className="jpmodal-option-group">
                                <label className="jpmodal-option-label">Size</label>
                                <div className="jpmodal-size-options">
                                    {sizeOptions.map(size => (
                                        <button
                                            key={size}
                                            className={`jpmodal-size-option ${selectedSize === size ? 'selected' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Selection */}
                            <div className="jpmodal-option-group">
                                <label className="jpmodal-option-label">Color</label>
                                <div className="jpmodal-color-options">
                                    {colorOptions.map(color => (
                                        <button
                                            key={color}
                                            className={`jpmodal-color-option ${selectedColor === color ? 'selected' : ''}`}
                                            onClick={() => setSelectedColor(color)}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selection */}
                            <div className="jpmodal-option-group">
                                <label className="jpmodal-option-label">Quantity</label>
                                <div className="jpmodal-quantity-selector">
                                    <button 
                                        className="jpmodal-quantity-btn"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        -
                                    </button>
                                    <span className="jpmodal-quantity-display">{quantity}</span>
                                    <button 
                                        className="jpmodal-quantity-btn"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="jpmodal-actions">
                            <button 
                                className="jpmodal-add-to-cart-btn"
                                onClick={handleAddToCart}
                                disabled={!selectedSize || !selectedColor}
                            >
                                <i className="fas fa-shopping-cart"></i>
                                Add to Cart - R{calculateTotalPrice().toFixed(2)}
                            </button>
                        </div>

                        <div className="jpmodal-features">
                            <h4>Features:</h4>
                            <ul>
                                <li>✓ Premium Denim Fabric</li>
                                <li>✓ Comfortable Stretch</li>
                                <li>✓ Quality Stitching</li>
                                <li>✓ Modern Fit</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JeansModal;