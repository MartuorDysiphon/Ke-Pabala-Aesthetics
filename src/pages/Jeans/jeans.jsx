// Jeans.jsx - Compact & Responsive
import React, { useState, useMemo } from 'react';
import JeansModal from '../../components/JeansModal/JeansModal';
import './jeans.css';

import Jean1 from '../../assets/Jeans/jean (1).jpeg';
import Jean2 from '../../assets/Jeans/jean (4).jpeg';
import Jean3 from '../../assets/Jeans/jean (3).jpeg';
import Jean4 from '../../assets/Jeans/jean (2).jpeg';
import Jean5 from '../../assets/Jeans/jean (5).jpeg';

const Jeans = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState('default');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const jeansProducts = useMemo(() => [
        {
            id: 1,
            name: "H&M Ashwood Jeans",
            price: 299.99,
            image: Jean1,
            category: "Slim Fit",
            description: "Stonewashed slim-fit jeans with a modern ash grey finish.",
            featured: true
        },
        {
            id: 2,
            name: "Zara Misty Blue Skirt",
            price: 399.99,
            image: Jean2,
            category: "A-Line",
            description: "A-line denim skirt in a soft misty blue wash.",
            featured: true
        },
        {
            id: 3,
            name: "Oceanline Jean",
            price: 289.99,
            image: Jean3,
            category: "Straight Fit",
            description: "Classic straight-leg jeans in deep ocean blue.",
            featured: true
        },
        {
            id: 4,
            name: "Trueblue Skinny Jean",
            price: 299.99,
            image: Jean4,
            category: "Skinny Fit",
            description: "High-stretch skinny jeans in true blue indigo.",
            featured: true
        },
        {
            id: 5,
            name: "Zara Denim Jacket",
            price: 449.99,
            image: Jean5,
            category: "Oversized",
            description: "Oversized denim jacket with raw hem details.",
            featured: true
        }
    ], []);

    const sortOptions = [
        { value: 'default', label: 'Default' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'name-asc', label: 'Name: A to Z' },
        { value: 'name-desc', label: 'Name: Z to A' }
    ];

    const sortedProducts = useMemo(() => {
        const products = [...jeansProducts];
        
        switch (sortBy) {
            case 'price-low':
                return products.sort((a, b) => a.price - b.price);
            case 'price-high':
                return products.sort((a, b) => b.price - a.price);
            case 'name-desc':
                return products.sort((a, b) => b.name.localeCompare(a.name));
            case 'name-asc':
                return products.sort((a, b) => a.name.localeCompare(b.name));
            case 'default':
            default:
                return products;
        }
    }, [jeansProducts, sortBy]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleImageClick = (imageSrc, productName, event) => {
        event.stopPropagation();
        setSelectedImage({ src: imageSrc, name: productName });
        setIsImageModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div className="jeans-page">
            <div className="jeans-container">
                {/* Header - Compact */}
                <div className="jeans-header">
                    <h1 className="jeans-title">Denim Collection</h1>
                    <p className="jeans-subtitle">5 premium pieces</p>
                    
                    {/* Sort Control */}
                    <div className="jeans-sort-control">
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="jeans-sort-select"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Product Grid - 2 columns on phones, 5 on large screens */}
                <div className="jeans-grid">
                    {sortedProducts.map(product => (
                        <div 
                            key={product.id} 
                            className="jeans-card"
                            onClick={() => handleProductClick(product)}
                        >
                            <div 
                                className="jeans-image-container"
                                onClick={(e) => handleImageClick(product.image, product.name, e)}
                            >
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="jeans-image"
                                />
                                
                                {/* Badges */}
                                <div className="jeans-badges">
                                    {product.featured && (
                                        <span className="jeans-badge-featured">Featured</span>
                                    )}
                                    <span className="jeans-badge-category">{product.category}</span>
                                </div>
                                
                                {/* Zoom Overlay */}
                                <div className="jeans-image-overlay">
                                    <span className="jeans-zoom-icon">🔍</span>
                                </div>
                            </div>
                            
                            <div className="jeans-content">
                                <h3 className="jeans-product-name">{product.name}</h3>
                                <p className="jeans-product-description">{product.description}</p>
                                
                                <div className="jeans-product-footer">
                                    <span className="jeans-price">R{product.price.toFixed(2)}</span>
                                    <button 
                                        className="jeans-add-to-cart"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleProductClick(product);
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modals */}
                {selectedProduct && (
                    <JeansModal
                        product={selectedProduct}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                    />
                )}

                {isImageModalOpen && selectedImage && (
                    <div className="jeans-fullscreen-modal" onClick={closeImageModal}>
                        <div className="jeans-modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="jeans-modal-close" onClick={closeImageModal}>
                                ×
                            </button>
                            <div className="jeans-modal-image-container">
                                <img 
                                    src={selectedImage.src} 
                                    alt={selectedImage.name} 
                                    className="jeans-modal-image"
                                />
                            </div>
                            <div className="jeans-modal-info">
                                <h3>{selectedImage.name}</h3>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jeans;