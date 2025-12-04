// Iphones.jsx
import { useState, useMemo } from 'react';
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

    const iphoneProducts = useMemo(() => [
        {
            id: 1,
            name: "iPhone 12",
            price: 8999.99,
            image: Iphone12,
            category: "iPhone",
            storage: "128GB/256GB",
            series: "12",
            condition: "Refurbished",
            featured: true,
            color: "Black",
            status: "Available"
        },
        {
            id: 2,
            name: "iPhone 11 Pro",
            price: 7399.99,
            image: Iphone11Pro,
            category: "iPhone",
            storage: "64GB/256GB/512GB",
            series: "11",
            condition: "Excellent",
            color: "Midnight Green",
            status: "Available"
        },
        {
            id: 3,
            name: "iPhone 11",
            price: 6399.99,
            image: Iphone11,
            category: "iPhone",
            storage: "64GB/128GB",
            series: "11",
            condition: "Good",
            color: "Purple",
            status: "Available"
        },
        {
            id: 4,
            name: "iPhone XR",
            price: 5299.99,
            image: IphoneXR,
            category: "iPhone",
            storage: "64GB/128GB",
            series: "XR",
            condition: "Good",
            color: "Coral",
            status: "Low Stock"
        },
        {
            id: 5,
            name: "iPhone X",
            price: 4899.99,
            image: IphoneX,
            category: "iPhone",
            storage: "64GB/256GB",
            series: "X",
            condition: "Fair",
            color: "Silver",
            status: "Available"
        },
        {
            id: 6,
            name: "iPhone 8 Plus",
            price: 4199.99,
            image: Iphone8Plus,
            category: "iPhone",
            storage: "64GB/256GB",
            series: "8",
            condition: "Good",
            color: "Gold",
            status: "Available"
        },
        {
            id: 7,
            name: "iPhone 8",
            price: 3799.99,
            image: Iphone8,
            category: "iPhone",
            storage: "64GB/256GB",
            series: "8",
            condition: "Fair",
            color: "Space Gray",
            status: "Low Stock"
        },
        {
            id: 8,
            name: "iPhone 7 Plus",
            price: 3299.99,
            image: Iphone7Plus,
            category: "iPhone",
            storage: "32GB/128GB",
            series: "7",
            condition: "Fair",
            color: "Rose Gold",
            status: "Available"
        },
        {
            id: 9,
            name: "iPhone 7",
            price: 2899.99,
            image: Iphone7,
            category: "iPhone",
            storage: "32GB/128GB",
            series: "7",
            condition: "Fair",
            status: "Available"
        }
    ], []);

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
        let filtered = [...iphoneProducts];
        
        if (selectedSeries !== 'all') {
            filtered = filtered.filter(product => product.series === selectedSeries);
        }

        switch (sortBy) {
            case 'price-low':
                return filtered.sort((a, b) => a.price - b.price);
            case 'price-high':
                return filtered.sort((a, b) => b.price - a.price);
            case 'name-asc':
                return filtered.sort((a, b) => a.name.localeCompare(b.name));
            case 'newest':
            default:
                return filtered.sort((a, b) => b.id - a.id);
        }
    }, [iphoneProducts, selectedSeries, sortBy]);

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
                    <span className="ip-results-count">{filteredAndSortedProducts.length} iPhones</span>
                </div>

                {/* Product Grid */}
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
                                <img src={iphone.image} alt={iphone.name} />
                                <div className="ip-type">
                                    <span className={`ip-tag ${iphone.status === 'Low Stock' ? 'ip-low-stock' : 'ip-available'}`}>
                                        {iphone.status}
                                    </span>
                                </div>
                                {iphone.featured && (
                                    <div className="ip-featured">
                                        <span>Featured</span>
                                    </div>
                                )}
                                <div className="ip-overlay">
                                    <span className="ip-zoom">🔍</span>
                                </div>
                            </div>
                            <div className="ip-details">
                                <h3 className="ip-name">{iphone.name}</h3>
                                <div className="ip-meta">
                                    <span className="ip-storage">{iphone.storage}</span>
                                    <span className="ip-condition">{iphone.condition}</span>
                                </div>
                                <div className="ip-price-row">
                                    <span className="ip-price">R{iphone.price.toFixed(2)}</span>
                                    <button 
                                        className="ip-cart-btn"
                                        onClick={() => handleProductClick(iphone)}
                                    >
                                        Add to Cart
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