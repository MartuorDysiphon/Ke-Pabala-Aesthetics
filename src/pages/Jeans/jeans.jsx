// Jeans.jsx - Compact & Responsive
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    
    // Get query parameters
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('product');

    const jeansProducts = [
        {
            id: 1,
            name: "H&M Ashwood Jeans",
            price: 299.99,
            image: Jean1,
            description: "Stonewashed slim-fit jeans with a modern ash grey finish."
        },
        {
            id: 2,
            name: "Zara Misty Blue Skirt",
            price: 399.99,
            image: Jean2,
            description: "A-line denim skirt in a soft misty blue wash."
        },
        {
            id: 3,
            name: "Oceanline Jean",
            price: 289.99,
            image: Jean3,
            description: "Classic straight-leg jeans in deep ocean blue."
        },
        {
            id: 4,
            name: "Trueblue Skinny Jean",
            price: 299.99,
            image: Jean4,
            description: "High-stretch skinny jeans in true blue indigo."
        },
        {
            id: 5,
            name: "Zara Denim Jacket",
            price: 449.99,
            image: Jean5,
            description: "Oversized denim jacket with raw hem details."
        }
    ];

    // Auto-open modal based on query parameter
    useEffect(() => {
        if (productId) {
            // Extract numeric ID from "jeans-1", "jeans-2", etc.
            const numericId = parseInt(productId.replace('jeans-', ''));
            const product = jeansProducts.find(p => p.id === numericId);
            if (product) {
                setSelectedProduct(product);
                setIsModalOpen(true);
            }
        }
    }, [productId]);

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
        // Remove query parameter when closing modal
        if (productId) {
            window.history.replaceState({}, '', '/jeans');
        }
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div className="jeans-page">
            <div className="jeans-container">
                <div className="jeans-header">
                    <h1 className="section-title">Denim Collection</h1>
                </div>

                <div className="jeans-grid">
                    {jeansProducts.map(product => (
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