// Jeans.jsx - Styled Like Hair & iPhone Collections with JN Prefix
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
    const [sortBy, setSortBy] = useState('price-low');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const jeansProducts = useMemo(() => [
        {
            id: 1,
            name: "H&M Ashwood Jeans",
            price: 299.99,
            image: Jean1,
            category: "Slim Fit",
            description: "Stonewashed slim-fit jeans with a modern ash grey finish, offering a clean, tailored silhouette for everyday sophistication.",
            featured: true
        },
        {
            id: 2,
            name: "Zara Misty Blue Skirt",
            price: 399.99,
            image: Jean2,
            category: "A-Line",
            description: "A relaxed A-line denim skirt in a soft misty blue wash, featuring a midi length and side slits for effortless movement.",
            featured: true
        },
        {
            id: 3,
            name: "Grey Threads Jean",
            price: 289.99,
            image: Jean3,
            category: "Straight Fit",
            description: "Classic straight-leg jeans in a deep ocean blue, designed with a mid-rise waist and durable construction for timeless style.",
            featured: true
        },
        {
            id: 4,
            name: "Trueblue Skinny Jean",
            price: 299.99,
            image: Jean4,
            category: "Skinny Fit",
            description: "High-stretch skinny jeans in a rich true blue indigo, providing a second-skin fit with exceptional comfort and shape retention.",
            featured: true
        },
        {
            id: 5,
            name: "Zara Denim Jacket",
            price: 449.99,
            image: Jean5,
            category: "Oversized",
            description: "An oversized washed denim jacket with a relaxed fit, raw hem details, and a versatile medium wash for layered styling.",
            featured: true
        }
    ], []);

    const sortOptions = [
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'name-asc', label: 'Name: A to Z' },
        { value: 'name-desc', label: 'Name: Z to A' }
    ];

    // Extract unique categories for filter buttons
    const uniqueCategories = useMemo(() => {
        const categories = jeansProducts.map(product => product.category);
        return ['all', ...new Set(categories)];
    }, [jeansProducts]);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...jeansProducts];
        
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        switch (sortBy) {
            case 'price-low':
                return filtered.sort((a, b) => a.price - b.price);
            case 'price-high':
                return filtered.sort((a, b) => b.price - a.price);
            case 'name-desc':
                return filtered.sort((a, b) => b.name.localeCompare(a.name));
            case 'name-asc':
            default:
                return filtered.sort((a, b) => a.name.localeCompare(b.name));
        }
    }, [jeansProducts, selectedCategory, sortBy]);

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
        <div className="JN-page">
            <div className="JN-container">
                {/* HEADER SECTION */}
                <div className="category-header">
                    <h1 className="section-title">Premium Denim Collection</h1>
                </div>

                {/* COMPACT SINGLE LINE SUBHEADER */}
                <div className="JN-subheader">
                    {/* LEFT: Filter Buttons */}
                    <div className="JN-filter-buttons">
                        {uniqueCategories.map(category => (
                            <button
                                key={category}
                                className={`JN-filter-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category === 'all' ? 'All Styles' : category}
                            </button>
                        ))}
                    </div>
                    
                    {/* RIGHT: Sort Dropdown */}
                    <div className="JN-sort-wrapper">
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="JN-sort"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results */}
                <div className="JN-results-info">
                    <span className="JN-results-count">{filteredAndSortedProducts.length} items</span>
                </div>

                {/* Product Grid */}
                <div className="JN-grid">
                    {filteredAndSortedProducts.map(jean => (
                        <div 
                            key={jean.id} 
                            className="JN-card"
                        >
                            <div 
                                className="JN-image JN-clickable"
                                onClick={(e) => handleImageClick(jean.image, jean.name, e)}
                            >
                                <img src={jean.image} alt={jean.name} />
                                {jean.category && (
                                    <div className="JN-type">
                                        <span className="JN-tag">{jean.category}</span>
                                    </div>
                                )}
                                {jean.featured && (
                                    <div className="JN-featured">
                                        <span>Featured</span>
                                    </div>
                                )}
                                <div className="JN-overlay">
                                    <span className="JN-zoom">🔍</span>
                                </div>
                            </div>
                            <div className="JN-details">
                                <h3 className="JN-name">{jean.name}</h3>
                                <div className="JN-meta">
                                    <span className="JN-category">{jean.category}</span>
                                    <span className="JN-price">R{jean.price.toFixed(2)}</span>
                                </div>
                                <button 
                                    className="JN-action"
                                    onClick={() => handleProductClick(jean)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Product Details Modal */}
                {selectedProduct && (
                    <JeansModal
                        product={selectedProduct}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                    />
                )}

                {/* Full Screen Image Modal */}
                {isImageModalOpen && selectedImage && (
                    <div className="JN-image-modal" onClick={closeImageModal}>
                        <div className="JN-image-content" onClick={(e) => e.stopPropagation()}>
                            <button className="JN-close-modal" onClick={closeImageModal}>
                                ×
                            </button>
                            <div className="JN-fullscreen-container">
                                <img 
                                    src={selectedImage.src} 
                                    alt={selectedImage.name} 
                                    className="JN-fullscreen-image"
                                />
                            </div>
                            <div className="JN-image-info">
                                <h3>{selectedImage.name}</h3>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {filteredAndSortedProducts.length === 0 && (
                    <div className="JN-empty">
                        <h3>No items found</h3>
                        <p>Try selecting a different category</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jeans;