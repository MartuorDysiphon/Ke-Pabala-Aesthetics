import React, { useState, useMemo } from 'react';
import IphoneModal from '../../components/IphoneModal/IphoneModal';
import './iphone.css';

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
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('newest');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const iphoneCategories = [
        'All', 'Latest', 'Pro Models', 'Plus Models', 'Budget Friendly'
    ];

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' }
    ];

    const iphoneProducts = [
        {
            id: 1,
            name: "iPhone 12",
            price: 8999.99,
            originalPrice: 14999.99,
            image: Iphone12,
            category: "Latest",
            storage: "128GB",
            color: "Black",
            condition: "Excellent",
            batteryHealth: "92%",
            discount: 40
        },
        {
            id: 2,
            name: "iPhone 11 Pro",
            price: 7999.99,
            originalPrice: 12999.99,
            image: Iphone11Pro,
            category: "Pro Models",
            storage: "256GB",
            color: "Midnight Green",
            condition: "Very Good",
            batteryHealth: "88%",
            discount: 38
        },
        {
            id: 3,
            name: "iPhone 11",
            price: 6499.99,
            originalPrice: 10999.99,
            image: Iphone11,
            category: "Latest",
            storage: "128GB",
            color: "Purple",
            condition: "Good",
            batteryHealth: "85%",
            discount: 41
        },
        {
            id: 4,
            name: "iPhone XR",
            price: 4999.99,
            originalPrice: 8999.99,
            image: IphoneXR,
            category: "Budget Friendly",
            storage: "64GB",
            color: "Product Red",
            condition: "Good",
            batteryHealth: "82%",
            discount: 44
        },
        {
            id: 5,
            name: "iPhone X",
            price: 5499.99,
            originalPrice: 9999.99,
            image: IphoneX,
            category: "Pro Models",
            storage: "64GB",
            color: "Space Gray",
            condition: "Fair",
            batteryHealth: "78%",
            discount: 45
        },
        {
            id: 6,
            name: "iPhone 8 Plus",
            price: 4299.99,
            originalPrice: 7999.99,
            image: Iphone8Plus,
            category: "Plus Models",
            storage: "64GB",
            color: "Gold",
            condition: "Good",
            batteryHealth: "80%",
            discount: 46
        },
        {
            id: 7,
            name: "iPhone 8",
            price: 3699.99,
            originalPrice: 6999.99,
            image: Iphone8,
            category: "Budget Friendly",
            storage: "64GB",
            color: "Silver",
            condition: "Very Good",
            batteryHealth: "86%",
            discount: 47
        },
        {
            id: 8,
            name: "iPhone 7 Plus",
            price: 3199.99,
            originalPrice: 5999.99,
            image: Iphone7Plus,
            category: "Plus Models",
            storage: "32GB",
            color: "Rose Gold",
            condition: "Fair",
            batteryHealth: "75%",
            discount: 47
        },
        {
            id: 9,
            name: "iPhone 7",
            price: 2799.99,
            originalPrice: 5499.99,
            image: Iphone7,
            category: "Budget Friendly",
            storage: "32GB",
            color: "Jet Black",
            condition: "Good",
            batteryHealth: "79%",
            discount: 49
        }
    ];

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = selectedCategory === 'All' 
            ? [...iphoneProducts] 
            : iphoneProducts.filter(product => product.category === selectedCategory);

        switch (sortBy) {
            case 'newest':
                return filtered.sort((a, b) => b.id - a.id);
            case 'price-low':
                return filtered.sort((a, b) => a.price - b.price);
            case 'price-high':
                return filtered.sort((a, b) => b.price - a.price);
            default:
                return filtered;
        }
    }, [selectedCategory, sortBy]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="iphones-page">
            <div className="container">
                <div className="category-header">
                    <h1 className="section-title">Premium Refurbished iPhones</h1>
                    <p className="page-subtitle">Certified pre-owned iPhones with warranty</p>
                </div>

                {/* Simple Filter Bar */}
                <div className="iphone-filters">
                    <div className="category-chips">
                        {iphoneCategories.map(category => (
                            <button
                                key={category}
                                className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Results Info */}
                <div className="results-info">
                    <span>{filteredAndSortedProducts.length} iPhones</span>
                </div>

                {/* Ultra Minimal iPhone Grid */}
                <div className="iphone-grid">
                    {filteredAndSortedProducts.map(iphone => (
                        <div key={iphone.id} className="iphone-card" onClick={() => handleProductClick(iphone)}>
                            <div className="iphone-card__image">
                                <img src={iphone.image} alt={iphone.name} />
                                <div className="discount-badge">-{iphone.discount}%</div>
                            </div>
                            
                            <div className="iphone-card__content">
                                <h3 className="iphone-card__name">{iphone.name}</h3>
                                <div className="iphone-card__storage">{iphone.storage}</div>
                                <div className="iphone-card__pricing">
                                    <div className="current-price">R{iphone.price.toFixed(2)}</div>
                                    <div className="original-price">R{iphone.originalPrice.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedProduct && (
                    <IphoneModal
                        product={selectedProduct}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                    />
                )}

                {filteredAndSortedProducts.length === 0 && (
                    <div className="no-products">
                        <i className="fas fa-mobile-alt"></i>
                        <h3>No iPhones found</h3>
                        <p>Try selecting a different category</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Iphones;