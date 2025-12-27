// Jeans.jsx - Compact & Responsive
import React, { useState, useEffect, useMemo } from 'react';
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

    const jeansProducts = useMemo(() => [
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
    ], []); // Empty dependency array ensures this only initializes once

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
    }, [productId, jeansProducts]);

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

                {/* SEO: Hidden Semantic Content & Structured Data */}
                <div className="seo-content" style={{ display: 'none' }} aria-hidden="true">
                    <h2>Trendy Denim Jeans, Jackets & Skirts for Men and Women</h2>
                    <p>Shop the latest <strong>designer jeans</strong>, <strong>denim jackets</strong>, and <strong>fashion skirts</strong> from brands like <strong>H&M</strong> and <strong>Zara</strong>. Find <strong>skinny fit</strong>, <strong>straight leg</strong>, <strong>boyfriend jeans</strong>, and <strong>oversized denim jackets</strong> in all sizes. Affordable <strong>denim clothing online</strong> with delivery across South Africa.</p>
                    <ul>
                        <li><strong>Premium Denim Fabric</strong> - Stretch, comfort, durable washes.</li>
                        <li><strong>Latest Fashion Trends</strong> - Stonewash, ripped, raw hem, high-waist.</li>
                        <li><strong>Free Returns & Exchanges</strong> - Hassle-free sizing guarantee.</li>
                    </ul>
                </div>
                <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "itemListElement": jeansProducts.map((product, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "item": {
                            "@type": "Product",
                            "name": product.name,
                            "image": window.location.origin + product.image,
                            "description": product.description,
                            "brand": { "@type": "Brand", "name": product.name.includes("H&M") ? "H&M" : "Zara" },
                            "offers": {
                                "@type": "Offer",
                                "priceCurrency": "ZAR",
                                "price": product.price,
                                "availability": "https://schema.org/InStock",
                                "seller": { "@type": "Organization", "name": "YourBrandName" }
                            }
                        }
                    }))
                })}
                </script>
            </div>
        </div>
    );
};

export default Jeans;