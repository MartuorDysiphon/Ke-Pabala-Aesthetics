// curlyModal.jsx - EXACT HAIRMODAL STYLE (WITH WORKING CART)
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useCart } from '../../../context/CartContext'; // Make sure this path is correct
import './curlyModal.css';

const CurlyModal = ({ product, isOpen, onClose }) => {
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedLength, setSelectedLength] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { addToCart } = useCart(); // Get addToCart from context
    const modalRef = useRef();

    // Color definitions - EXACT HairModal color structure
    const colorOptions = useMemo(() => ({
        '1B': { bg: '#1a1a1a', name: 'Natural Black', standard: true },
        'Black': { bg: '#000000', name: 'Jet Black', standard: true },
        '#4': { bg: '#5d4037', name: 'Dark Brown', standard: false },
        'Brown': { bg: '#8B4513', name: 'Chocolate Brown', standard: false },
        'Piano': { bg: '#2c3e50', name: 'Piano Black', standard: false },
        'Maroon': { bg: '#800000', name: 'Burgundy', standard: false },
        '1/4': { bg: '#7d5d3b', name: 'Honey Blonde', standard: false },
        '#350': { bg: '#d2691e', name: 'Copper', standard: false },
        '99j': { bg: '#b8860b', name: 'Golden Brown', standard: false }
    }), []);

    // Get wig type like HairModal
    const getWigType = useCallback(() => {
        const name = product?.name?.toLowerCase() || '';
        if (name.includes('human')) return 'Human Hair Wig';
        if (name.includes('synthetic')) return 'Synthetic Wig';
        if (name.includes('lace')) return 'Lace Front Wig';
        return 'Human Hair Wig';
    }, [product?.name]);

    // Wig specs like HairModal
    const wigSpecs = useMemo(() => ({
        'Human Hair Wig': {
            material: '100% Human Hair',
            density: '130% Medium Density',
            cap: 'Lace Front + Adjustable',
            lifespan: '1-2 Years'
        },
        'Synthetic Wig': {
            material: 'Premium Synthetic',
            density: '120% Light Density',
            cap: 'Basic Cap + Adjustable',
            lifespan: '4-6 Months'
        },
        'Lace Front Wig': {
            material: 'Human Hair Lace',
            density: '150% High Density',
            cap: 'Full Lace Front',
            lifespan: '1-2 Years'
        }
    }), []);

    const wigType = getWigType();
    const specs = wigSpecs[wigType] || wigSpecs['Human Hair Wig'];

    // Initialize selections
    useEffect(() => {
        if (product && isOpen) {
            if (product.availableColors?.length > 0) {
                const standardColor = product.availableColors.find(c => colorOptions[c]?.standard);
                setSelectedColor(standardColor || product.availableColors[0]);
            }
            if (product.lengths?.length > 0) {
                setSelectedLength(product.lengths[0].length);
            }
            setCurrentImageIndex(0);
            setSelectedQuantity(1);
        }
    }, [product, isOpen, colorOptions]);

    // Get available colors
    const availableColors = useMemo(() => {
        if (!product?.availableColors) return [];
        return product.availableColors
            .map(color => ({
                code: color,
                ...colorOptions[color]
            }))
            .filter(Boolean);
    }, [product?.availableColors, colorOptions]);

    // Price calculations
    const getLengthPrice = useCallback(() => {
        if (!selectedLength || !product?.lengths) {
            return parseFloat(product?.price) || 0;
        }
        const lengthData = product.lengths.find(l => l.length === selectedLength);
        return lengthData?.price || parseFloat(product?.price) || 0;
    }, [selectedLength, product?.lengths, product?.price]);

    const isPremiumColor = useCallback(() => {
        return !colorOptions[selectedColor]?.standard;
    }, [selectedColor, colorOptions]);

    const calculateTotalPrice = useCallback(() => {
        const lengthPrice = getLengthPrice();
        const colorPremium = isPremiumColor() ? 100 : 0;
        return (lengthPrice + colorPremium) * selectedQuantity;
    }, [getLengthPrice, isPremiumColor, selectedQuantity]);

    // Handle add to cart - EXACT HairModal pattern with working cart
    const handleAddToCart = () => {
        if (!selectedLength || !selectedColor) return;

        const finalProductName = `${product.name} - ${colorOptions[selectedColor]?.name || selectedColor} - ${selectedLength}"`;
        
        // Create cart item
        const cartItem = {
            ...product,
            displayName: finalProductName,
            price: calculateTotalPrice().toFixed(2),
            selectedColor: colorOptions[selectedColor]?.name || selectedColor,
            selectedLength: `${selectedLength}"`,
            isPremiumColor: isPremiumColor(),
            quantity: selectedQuantity,
            image: product.images?.[0] || product.image
        };

        // Actually add to cart using the context
        addToCart(cartItem, selectedQuantity);
        
        // Show success message
        alert(`Added to cart!\n${cartItem.displayName}\nR${calculateTotalPrice().toFixed(2)}`);
        
        // Close modal
        onClose();
    };

    // Image navigation
    const goToPreviousImage = () => {
        if (!product?.images?.length) return;
        setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1);
    };

    const goToNextImage = () => {
        if (!product?.images?.length) return;
        setCurrentImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1);
    };

    if (!isOpen || !product) return null;

    return (
        <div className="curly-modal-overlay" onClick={onClose}>
            <div className="curly-modal-container" ref={modalRef} onClick={(e) => e.stopPropagation()}>
                {/* Close Button - EXACT HairModal */}
                <button className="modal-close-btn" onClick={onClose}>✕</button>

                {/* Main Content - EXACT HairModal grid */}
                <div className="modal-main-content">
                    {/* Left - Product Image - EXACT HairModal */}
                    <div className="modal-visual-section">
                        <div className="product-image-container">
                            <img 
                                src={product.images?.[currentImageIndex] || product.image} 
                                alt={product.name}
                                className="product-main-image"
                            />
                            <div className="product-badge">{wigType}</div>
                            
                            {/* Simple navigation like HairModal */}
                            {product.images?.length > 1 && (
                                <div className="image-navigation">
                                    <button className="nav-btn" onClick={(e) => { e.stopPropagation(); goToPreviousImage(); }}>←</button>
                                    <span className="image-counter">{currentImageIndex + 1}/{product.images.length}</span>
                                    <button className="nav-btn" onClick={(e) => { e.stopPropagation(); goToNextImage(); }}>→</button>
                                </div>
                            )}
                        </div>

                        {/* Simple thumbnails */}
                        {product.images?.length > 1 && (
                            <div className="thumbnail-grid">
                                {product.images.map((img, index) => (
                                    <button key={index} className={`thumbnail-item ${currentImageIndex === index ? 'active' : ''}`} onClick={() => setCurrentImageIndex(index)}>
                                        <img src={img} alt={`View ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right - Product Info - EXACT HairModal */}
                    <div className="modal-info-section">
                        {/* Header - EXACT HairModal */}
                        <div className="product-header-section">
                            <h1 className="product-title-main">{product.name}</h1>
                            <div className="product-category-tags">
                                <span className="category-label">{product.category || 'Premium Hair'}</span>
                                {product.subcategory && <span className="subcategory-label">• {product.subcategory}</span>}
                            </div>
                        </div>

                        {/* Price Summary - EXACT HairModal */}
                        <div className="price-summary-card">
                            <div className="price-total-section">
                                <span className="total-label">Total</span>
                                <span className="total-amount">R{calculateTotalPrice().toFixed(2)}</span>
                            </div>
                            <div className="price-details">
                                <div className="price-detail-item">
                                    <span>Length</span>
                                    <span>{selectedLength || '-'}" • R{getLengthPrice().toFixed(2)}</span>
                                </div>
                                {isPremiumColor() && (
                                    <div className="price-detail-item premium">
                                        <span>Premium Color</span>
                                        <span>+R100</span>
                                    </div>
                                )}
                                <div className="price-detail-item">
                                    <span>Quantity</span>
                                    <span>{selectedQuantity}x</span>
                                </div>
                            </div>
                        </div>

                        {/* Specs like HairModal */}
                        <div className="price-summary-card">
                            <div className="price-detail-item">
                                <span>Material</span>
                                <span>{specs.material}</span>
                            </div>
                            <div className="price-detail-item">
                                <span>Density</span>
                                <span>{specs.density}</span>
                            </div>
                            <div className="price-detail-item">
                                <span>Cap</span>
                                <span>{specs.cap}</span>
                            </div>
                            <div className="price-detail-item">
                                <span>Lifespan</span>
                                <span>{specs.lifespan}</span>
                            </div>
                        </div>

                        {/* Quantity - EXACT HairModal */}
                        <div className="selection-card">
                            <h3 className="selection-title">Quantity</h3>
                            <div className="quantity-selector">
                                <button className="qty-btn" onClick={() => setSelectedQuantity(prev => Math.max(1, prev - 1))}>−</button>
                                <span className="qty-value">{selectedQuantity}</span>
                                <button className="qty-btn" onClick={() => setSelectedQuantity(prev => prev + 1)}>+</button>
                            </div>
                        </div>

                        {/* Length - EXACT HairModal */}
                        {product.lengths?.length > 0 && (
                            <div className="selection-card">
                                <div className="selection-header">
                                    <h3 className="selection-title">Length</h3>
                                    <span className="selection-count">{product.lengths.length} options</span>
                                </div>
                                <div className="length-selection-grid">
                                    {product.lengths.map((item) => (
                                        <button key={item.length} className={`length-selection-option ${selectedLength === item.length ? 'selected' : ''}`} onClick={() => setSelectedLength(item.length)}>
                                            <span className="length-value-display">{item.length}"</span>
                                            <span className="length-price-display">R{item.price}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Color - EXACT HairModal circles */}
                        {availableColors.length > 0 && (
                            <div className="selection-card">
                                <div className="selection-header">
                                    <h3 className="selection-title">Color</h3>
                                    <span className="premium-color-note">Premium +R100</span>
                                </div>
                                <div className="color-selection-grid">
                                    {availableColors.map((color) => (
                                        <button key={color.code} className={`color-selection-option ${selectedColor === color.code ? 'selected' : ''}`} onClick={() => setSelectedColor(color.code)} title={`${color.name}${!color.standard ? ' +R100' : ''}`}>
                                            <span className="color-option-visual" style={{ backgroundColor: color.bg }} />
                                            {!color.standard && <span className="color-premium-tag">+</span>}
                                            {selectedColor === color.code && <span className="color-selected-indicator">✓</span>}
                                        </button>
                                    ))}
                                </div>
                                <div className="color-option-label" style={{ fontSize: '11px', color: '#86868b', marginTop: '8px', textAlign: 'center' }}>
                                    {selectedColor && colorOptions[selectedColor]?.standard ? 'Standard color' : <span style={{ color: '#f0c040' }}>Premium color +R100</span>}
                                </div>
                            </div>
                        )}

                        {/* Add to Cart - EXACT HairModal */}
                        <button className="add-to-cart-button-main" onClick={handleAddToCart} disabled={!selectedLength || !selectedColor}>
                            Add to Cart • R{calculateTotalPrice().toFixed(2)}
                        </button>

                        {/* Guarantee - EXACT HairModal */}
                        <div className="guarantee-info">
                            <span className="guarantee-badge">✓ 30-Day Returns</span>
                            <span className="guarantee-badge">✓ Free Adjustments</span>
                            <span className="guarantee-badge">✓ Quality Guaranteed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurlyModal;