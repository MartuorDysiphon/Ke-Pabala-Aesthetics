// Jeans.jsx - Styled Like Hair & iPhone Collections with JN Prefix
import React, { useState, useMemo } from 'react';
import JeansModal from '../../components/JeansModal/JeansModal';
import './jeans.css';

import Jean1 from '../../assets/Jeans/jean1.avif';
import Jean2 from '../../assets/Jeans/jean2.avif';
import Jean3 from '../../assets/Jeans/jean3.png';
import Jean4 from '../../assets/Jeans/jean4.webp';
import Jean5 from '../../assets/Jeans/jean5.png';
import Jean6 from '../../assets/Jeans/jean6.png';

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
            name: "Midnight Riser",
            price: 899.99,
            image: Jean1,
            category: "Slim Fit",
            description: "Premium dark wash with comfortable stretch",
            featured: true
        },
        {
            id: 2,
            name: "Urban Classic",
            price: 759.99,
            image: Jean2,
            category: "Straight Fit",
            description: "Vintage blue with authentic distressing"
        },
        {
            id: 3,
            name: "Shadow Slim",
            price: 829.99,
            image: Jean3,
            category: "Skinny Fit",
            description: "Black denim with superior flexibility"
        },
        {
            id: 4,
            name: "Vintage Fade",
            price: 689.99,
            image: Jean4,
            category: "Relaxed Fit",
            description: "Light wash with classic comfort"
        },
        {
            id: 5,
            name: "Executive Denim",
            price: 949.99,
            image: Jean5,
            category: "Tapered Fit",
            description: "Dark indigo for professional styling"
        },
        {
            id: 6,
            name: "Raw Edge",
            price: 779.99,
            image: Jean6,
            category: "Baggy Straight",
            description: "Unfinished hem with modern cut"
        }
    ], []);

    const sortOptions = [
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'name-asc', label: 'Name: A to Z' },
        { value: 'name-desc', label: 'Name: Z to A' }
    ];

    const categories = [
        { value: 'all', label: 'All Styles' },
    ];

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
                        {categories.map(category => (
                            <button
                                key={category.value}
                                className={`JN-filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.value)}
                            >
                                {category.label}
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
                    <span className="JN-results-count">{filteredAndSortedProducts.length} jeans</span>
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
                        <h3>No jeans found</h3>
                        <p>Try selecting a different category</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jeans;