// Iphones.jsx
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import IphoneModal from '../../components/IphoneModal/IphoneModal';
import './iphone.css';

// Import images
import Iphone7 from '../../assets/Iphones/iphone 7.jpg';
import Iphone7Plus from '../../assets/Iphones/iphone 7 plus.jpg';
import Iphone8 from '../../assets/Iphones/iphone 8.jpg';
import Iphone8Plus from '../../assets/Iphones/iphone 8 plus.jpg';
import IphoneX from '../../assets/Iphones/iphone x.jpg';
import IphoneXR from '../../assets/Iphones/iphone xr.jpg';
import Iphone11 from '../../assets/Iphones/iphone 11.jpg';
import Iphone11Pro from '../../assets/Iphones/iphone 11 pro.jpg';
import Iphone12 from '../../assets/Iphones/iphone 12.jpg';

const Iphones = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const [selectedSeries, setSelectedSeries] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    
    // Get query parameters
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('product');

    const preOwnedIphones = useMemo(() => [
        // iPhone 7 - Single card, multiple storage options in modal
        {
            id: 1,
            name: "iPhone 7",
            baseName: "iPhone 7",
            price: 2500, // Starting price for 32GB Pre-Owned
            image: Iphone7,
            category: "iPhone",
            series: "7",
            condition: "Pre-Owned",
            color: "Black",
            status: "Available",
            modelYear: "2016",
            defaultStorage: "32GB"
        },
        // iPhone 7 Plus - Single card
        {
            id: 2,
            name: "iPhone 7 Plus",
            baseName: "iPhone 7 Plus",
            price: 3050, // Starting price for 32GB Pre-Owned
            image: Iphone7Plus,
            category: "iPhone",
            series: "7",
            condition: "Pre-Owned",
            color: "Rose Gold",
            status: "Available",
            modelYear: "2016",
            defaultStorage: "32GB"
        },
        // iPhone 8 - Single card
        {
            id: 3,
            name: "iPhone 8",
            baseName: "iPhone 8",
            price: 2950, // 64GB Pre-Owned
            image: Iphone8,
            category: "iPhone",
            series: "8",
            condition: "Pre-Owned",
            color: "Space Gray",
            status: "Available",
            modelYear: "2017",
            defaultStorage: "64GB"
        },
        // iPhone 8 Plus - Single card
        {
            id: 4,
            name: "iPhone 8 Plus",
            baseName: "iPhone 8 Plus",
            price: 3600, // 64GB Pre-Owned
            image: Iphone8Plus,
            category: "iPhone",
            series: "8",
            condition: "Pre-Owned",
            color: "Gold",
            status: "Available",
            modelYear: "2017",
            defaultStorage: "64GB"
        },
        // iPhone X - Single card
        {
            id: 5,
            name: "iPhone X",
            baseName: "iPhone X",
            price: 3900, // 64GB Pre-Owned
            image: IphoneX,
            category: "iPhone",
            series: "X",
            condition: "Pre-Owned",
            color: "Silver",
            status: "Available",
            modelYear: "2017",
            defaultStorage: "64GB"
        },
        // iPhone XR - Single card
        {
            id: 6,
            name: "iPhone XR",
            baseName: "iPhone XR",
            price: 4100, // Starting price for 64GB Pre-Owned
            image: IphoneXR,
            category: "iPhone",
            series: "XR",
            condition: "Pre-Owned",
            color: "Coral",
            status: "Available",
            modelYear: "2018",
            defaultStorage: "64GB"
        },
        // iPhone 11 - Single card
        {
            id: 7,
            name: "iPhone 11",
            baseName: "iPhone 11",
            price: 5100, // Starting price for 64GB Pre-Owned
            image: Iphone11,
            category: "iPhone",
            series: "11",
            condition: "Pre-Owned",
            color: "Purple",
            status: "Available",
            modelYear: "2019",
            defaultStorage: "64GB"
        },
        // iPhone 11 Pro - Single card
        {
            id: 8,
            name: "iPhone 11 Pro",
            baseName: "iPhone 11 Pro",
            price: 6400, // 64GB Pre-Owned
            image: Iphone11Pro,
            category: "iPhone",
            series: "11",
            condition: "Pre-Owned",
            color: "Midnight Green",
            status: "Low Stock",
            modelYear: "2019",
            defaultStorage: "64GB"
        },
        // iPhone 12 - Single card
        {
            id: 9,
            name: "iPhone 12",
            baseName: "iPhone 12",
            price: 6800, // Starting price for 64GB Pre-Owned
            image: Iphone12,
            category: "iPhone",
            series: "12",
            condition: "Pre-Owned",
            color: "Black",
            status: "Available",
            modelYear: "2020",
            defaultStorage: "64GB"
        }
    ], []);

    // Auto-open modal based on query parameter
    useEffect(() => {
        if (productId) {
            // Extract numeric ID from "iphone-1", "iphone-2", etc.
            const numericId = parseInt(productId.replace('iphone-', ''));
            const product = preOwnedIphones.find(p => p.id === numericId);
            if (product) {
                setSelectedProduct(product);
                setIsModalOpen(true);
            }
        }
    }, [productId, preOwnedIphones]);

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'name-asc', label: 'Name: A to Z' }
    ];

    const seriesOptions = [
        { value: 'all', label: 'All Series' },
        { value: '12', label: 'Series 12' },
        { value: '11', label: 'Series 11' },
        { value: 'XR', label: 'Series XR' },
        { value: 'X', label: 'Series X' },
        { value: '8', label: 'Series 8' },
        { value: '7', label: 'Series 7' }
    ];

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...preOwnedIphones];
        
        if (selectedSeries !== 'all') {
            filtered = filtered.filter(product => product.series === selectedSeries);
        }

        switch (sortBy) {
            case 'price-low':
                return filtered.sort((a, b) => a.price - b.price);
            case 'price-high':
                return filtered.sort((a, b) => b.price - a.price);
            case 'name-asc':
                return filtered.sort((a, b) => a.baseName.localeCompare(b.baseName));
            case 'newest':
            default:
                return filtered.sort((a, b) => b.modelYear - a.modelYear || a.baseName.localeCompare(b.baseName));
        }
    }, [preOwnedIphones, selectedSeries, sortBy]);

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
            window.history.replaceState({}, '', '/iphones');
        }
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div className="ip-page">
            <div className="ip-container">
                <div className="category-header">
                    <h1 className="section-title">iPhone Collection</h1>
                </div>

                {/* COMPACT SINGLE LINE SUBHEADER */}
                <div className="ip-subheader">
                    {/* LEFT: Filter Buttons */}
                    <div className="ip-filter-buttons">
                        {seriesOptions.map(series => (
                            <button
                                key={series.value}
                                className={`ip-filter-btn ${selectedSeries === series.value ? 'ip-active' : ''}`}
                                onClick={() => setSelectedSeries(series.value)}
                            >
                                {series.label}
                            </button>
                        ))}
                    </div>
                    
                    {/* RIGHT: Sort Dropdown */}
                    <div className="ip-sort-wrapper">
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="ip-sort"
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
                <div className="ip-results-info">
                    <span className="ip-results-count">{filteredAndSortedProducts.length} iPhone Models</span>
                </div>

                {/* Product Grid - Now showing 9 unique iPhone models */}
                <div className="ip-grid">
                    {filteredAndSortedProducts.map(iphone => (
                        <div 
                            key={iphone.id} 
                            className="ip-card"
                        >
                            <div 
                                className="ip-image ip-clickable"
                                onClick={(e) => handleImageClick(iphone.image, iphone.name, e)}
                            >
                                <img src={iphone.image} alt={iphone.baseName} />
                                <div className="ip-overlay">
                                    <span className="ip-zoom">🔍</span>
                                </div>
                            </div>
                            <div className="ip-details">
                                <h3 className="ip-name">{iphone.baseName}</h3>
                                <div className="ip-meta">
                                    <span className="ip-storage">Starting at R{iphone.price.toFixed(2)}</span>
                                    <span className="ip-condition">{iphone.defaultStorage} • {iphone.condition}</span>
                                </div>
                                <div className="ip-price-row">
                                    <span className="ip-price"> R{iphone.price.toFixed(2)}</span>
                                    <button 
                                        className="ip-cart-btn"
                                        onClick={() => handleProductClick(iphone)}
                                    >
                                        <i className="fas fa-shopping-cart"></i> Buy
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Product Details Modal */}
                {selectedProduct && (
                    <IphoneModal
                        product={selectedProduct}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                    />
                )}

                {/* Full Screen Image Modal */}
                {isImageModalOpen && selectedImage && (
                    <div className="ip-image-modal" onClick={closeImageModal}>
                        <div className="ip-image-content" onClick={(e) => e.stopPropagation()}>
                            <button className="ip-close-modal" onClick={closeImageModal}>
                                ×
                            </button>
                            <div className="ip-fullscreen-container">
                                <img 
                                    src={selectedImage.src} 
                                    alt={selectedImage.name} 
                                    className="ip-fullscreen-image"
                                />
                            </div>
                            <div className="ip-image-info">
                                <h3>{selectedImage.name}</h3>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {filteredAndSortedProducts.length === 0 && (
                    <div className="ip-empty">
                        <h3>No iPhones found</h3>
                        <p>Try selecting a different series</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Iphones;