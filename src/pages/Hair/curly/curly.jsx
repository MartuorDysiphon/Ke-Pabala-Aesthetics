// CurlyHair.jsx
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CurlyHairModal from '../../../components/HairModal/curlyModal/curlyModal';
import './curly.css';

// Import all curly hair images
import ddjerry1 from '../../../assets/Hair/curly/ddjerry1.jpeg';
import ddjerry2 from '../../../assets/Hair/curly/ddjerry2.jpeg';
import ddjerry3 from '../../../assets/Hair/curly/ddjerry3.jpeg';

import ddwater1 from '../../../assets/Hair/curly/ddwater1.jpeg';
import ddwater2 from '../../../assets/Hair/curly/ddwater2.jpeg';
import ddwater3 from '../../../assets/Hair/curly/ddwater3.jpeg';
import ddwater4 from '../../../assets/Hair/curly/ddwater4.jpeg';
import ddwater5 from '../../../assets/Hair/curly/ddwater5.jpeg';

import jerry1 from '../../../assets/Hair/curly/jerry1.jpeg';
import jerry2 from '../../../assets/Hair/curly/jerry2.jpeg';
import jerry3 from '../../../assets/Hair/curly/jerry3.jpeg';
import jerry4 from '../../../assets/Hair/curly/jerry4.jpeg';
import jerry5 from '../../../assets/Hair/curly/jerry5.jpeg';
import jerry6 from '../../../assets/Hair/curly/jerry6.jpeg';
import jerry7 from '../../../assets/Hair/curly/jerry7.jpeg';

import sddjerry1 from '../../../assets/Hair/curly/sddjerry1.jpeg';
import sddjerry2 from '../../../assets/Hair/curly/sddjerry2.jpeg';
import sddjerry3 from '../../../assets/Hair/curly/sddjerry3.jpeg';
import sddjerry4 from '../../../assets/Hair/curly/sddjerry4.jpeg';
import sddjerry5 from '../../../assets/Hair/curly/sddjerry5.jpeg';
import sddjerry6 from '../../../assets/Hair/curly/sddjerry6.jpeg';
import sddjerry7 from '../../../assets/Hair/curly/sddjerry7.jpeg';

import sddpixie1 from '../../../assets/Hair/curly/sddpixie1.jpeg';
import sddpixie2 from '../../../assets/Hair/curly/sddpixie2.jpeg';
import sddpixie3 from '../../../assets/Hair/curly/sddpixie3.jpeg';
import sddpixie4 from '../../../assets/Hair/curly/sddpixie4.jpeg';
import sddpixie5 from '../../../assets/Hair/curly/sddpixie5.jpeg';
import sddpixie6 from '../../../assets/Hair/curly/sddpixie6.jpeg';
import sddpixie7 from '../../../assets/Hair/curly/sddpixie7.jpeg';

import sddwater1 from '../../../assets/Hair/curly/sddwater1.jpeg';
import sddwater2 from '../../../assets/Hair/curly/sddwater2.jpeg';
import sddwater3 from '../../../assets/Hair/curly/sddwater3.jpeg';
import sddwater4 from '../../../assets/Hair/curly/sddwater4.jpeg';
import sddwater5 from '../../../assets/Hair/curly/sddwater5.jpeg';

import water1 from '../../../assets/Hair/curly/water1.jpeg';
import water2 from '../../../assets/Hair/curly/water2.jpeg';
import water3 from '../../../assets/Hair/curly/water3.jpeg';
import water4 from '../../../assets/Hair/curly/water4.jpeg';
import water5 from '../../../assets/Hair/curly/water5.jpeg';
import water6 from '../../../assets/Hair/curly/water6.jpeg';

const CurlyHair = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('product');

    const curlyHairProducts = useMemo(() => [
        {
            id: 'dd-jerry-curls',
            name: "13x4 Jerry Curls Double Drawn",
            baseName: "DD Jerry Curls",
            price: 1150.00,
            images: [ddjerry1, ddjerry2, ddjerry3],
            category: "DD Jerry",
            subcategory: "Double Drawn",
            lengths: [
                { length: "10", price: 1150 },
                { length: "12", price: 1250 },
                { length: "14", price: 1360 },
                { length: "16", price: 1500 },
                { length: "18", price: 1630 }
            ],
            availableColors: ["1B", "Piano"],
            colorPrice: 150,
            description: "Double Drawn Jerry Curls with uniform thickness and beautiful defined curls. Available in 1B and Piano colors.",
            hasBadge: true,
            badgeText: "DD",
            status: "Available"
        },
        {
            id: 'dd-waterwave',
            name: "13x4 Waterwave Double Drawn",
            baseName: "DD Waterwave",
            price: 1150.00,
            images: [ddwater1, ddwater2, ddwater3, ddwater4, ddwater5],
            category: "DD Waterwave",
            subcategory: "Double Drawn",
            lengths: [
                { length: "10", price: 1150 },
                { length: "12", price: 1250 },
                { length: "14", price: 1360 },
                { length: "16", price: 1500 },
                { length: "18", price: 1630 }
            ],
            availableColors: ["1B", "#4", "Piano"],
            colorPrice: 150,
            description: "Double Drawn Waterwave with natural-looking waves and consistent thickness. Perfect for voluminous styles.",
            hasBadge: true,
            badgeText: "DD",
            status: "Available"
        },
        {
            id: 'jerry-curls',
            name: "13x4 Jerry Curls",
            baseName: "Jerry Curls",
            price: 1000.00,
            images: [jerry1, jerry2, jerry3, jerry4, jerry5, jerry6, jerry7],
            category: "Jerry Curls",
            subcategory: "Standard",
            lengths: [
                { length: "10", price: 1000 },
                { length: "12", price: 1100 },
                { length: "14", price: 1210 },
                { length: "16", price: 1340 },
                { length: "18", price: 1480 },
                { length: "20", price: 1580 },
                { length: "22", price: 1680 },
                { length: "24", price: 1980 },
                { length: "26", price: 2180 },
                { length: "28", price: 2480 },
                { length: "30", price: 2780 }
            ],
            availableColors: ["Black", "Piano"],
            colorPrice: 150,
            description: "Classic Jerry Curls with spiral curls pattern. Available in various lengths and colors for versatile styling.",
            hasBadge: false,
            status: "Available"
        },
        {
            id: 'sdd-jerry-curls',
            name: "13x4 SDD Jerry Curls",
            baseName: "SDD Jerry Curls",
            price: 1850.00,
            images: [sddjerry1, sddjerry2, sddjerry3, sddjerry4, sddjerry5, sddjerry6, sddjerry7],
            category: "SDD Jerry",
            subcategory: "Super Double Drawn",
            lengths: [
                { length: "16", price: 1850 },
                { length: "18", price: 1950 },
                { length: "20", price: 2050 },
                { length: "22", price: 2350 },
                { length: "24", price: 2850 },
                { length: "26", price: 3200 },
                { length: "28", price: 3850 },
                { length: "30", price: 4900 }
            ],
            availableColors: ["1B", "#4", "Piano"],
            colorPrice: 150,
            description: "Super Double Drawn Jerry Curls with defined spiral curls and maximum thickness consistency. Luxury quality.",
            hasBadge: true,
            badgeText: "SDD",
            status: "Available"
        },
        {
            id: 'sdd-pixie-curls',
            name: "13x4 SDD Pixie Curls",
            baseName: "SDD Pixie Curls",
            price: 2450.00,
            images: [sddpixie1, sddpixie2, sddpixie3, sddpixie4, sddpixie5, sddpixie6, sddpixie7],
            category: "SDD Pixie",
            subcategory: "Super Double Drawn",
            lengths: [
                { length: "14", price: 1500 },
                { length: "16", price: 1700 },
                { length: "18", price: 1800 },
                { length: "20", price: 1900 },
                { length: "22", price: 2350 },
                { length: "24", price: 2700 },
                { length: "26", price: 3200 },
                { length: "28", price: 3800 },
                { length: "30", price: 4850 }
            ],
            availableColors: ["1B", "Piano", "Brown", "Maroon"],
            colorPrice: 150,
            description: "Super Double Drawn Pixie Curls frontal wig with tight, defined curls. Premium quality with maximum volume.",
            hasBadge: true,
            badgeText: "SDD",
            status: "Available"
        },
        {
            id: 'sdd-waterwave',
            name: "13x4 SDD Water Wave",
            baseName: "SDD Water Wave",
            price: 1550.00,
            images: [sddwater1, sddwater2, sddwater3, sddwater4, sddwater5],
            category: "SDD Waterwave",
            subcategory: "Super Double Drawn",
            lengths: [
                { length: "14", price: 1550 },
                { length: "18", price: 1730 },
                { length: "20", price: 1830 },
                { length: "22", price: 1930 },
                { length: "24", price: 2230 },
                { length: "26", price: 2430 },
                { length: "28", price: 2730 },
                { length: "30", price: 3030 }
            ],
            availableColors: ["1B", "1/4", "Piano"],
            colorPrice: 150,
            description: "Super Double Drawn Water Wave with natural, beachy waves. High-density frontal with superior quality.",
            hasBadge: true,
            badgeText: "SDD",
            status: "Available"
        },
        {
            id: 'waterwave',
            name: "13x4 Waterwave",
            baseName: "Waterwave",
            price: 1480.00,
            images: [water1, water2, water3, water4, water5, water6],
            category: "Waterwave",
            subcategory: "Standard",
            lengths: [
                { length: "18", price: 1480 },
                { length: "20", price: 1580 },
                { length: "22", price: 1680 },
                { length: "24", price: 1980 },
                { length: "26", price: 2180 },
                { length: "28", price: 2480 },
                { length: "30", price: 2780 }
            ],
            availableColors: ["#350", "99j", "1B", "1/4", "Piano"],
            colorPrice: 150,
            description: "Classic Waterwave frontal with natural wave pattern. Versatile styling options for everyday wear.",
            hasBadge: false,
            status: "Available"
        }
    ], []);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const [shuffledProducts, setShuffledProducts] = useState([]);
    useEffect(() => {
        setShuffledProducts(shuffleArray(curlyHairProducts));
    }, [curlyHairProducts]);

    useEffect(() => {
        if (productId) {
            const product = curlyHairProducts.find(p => p.id === productId);
            if (product) {
                setSelectedProduct(product);
                setIsModalOpen(true);
            }
        }
    }, [productId, curlyHairProducts]);

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'name-asc', label: 'Name: A to Z' }
    ];

    const categoryOptions = [
        { value: 'all', label: 'All Curly' },
        { value: 'DD Jerry', label: 'DD Jerry' },
        { value: 'DD Waterwave', label: 'DD Waterwave' },
        { value: 'Jerry Curls', label: 'Jerry Curls' },
        { value: 'SDD Jerry', label: 'SDD Jerry' },
        { value: 'SDD Pixie', label: 'SDD Pixie' },
        { value: 'SDD Waterwave', label: 'SDD Waterwave' },
        { value: 'Waterwave', label: 'Waterwave' }
    ];

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...shuffledProducts];
        
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
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
                return filtered.sort((a, b) => b.price - a.price || a.baseName.localeCompare(b.baseName));
        }
    }, [shuffledProducts, selectedCategory, sortBy]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const nextImage = (event) => {
        event.stopPropagation();
        if (selectedImage && selectedProduct) {
            const nextIndex = (currentImageIndex + 1) % selectedProduct.images.length;
            setSelectedImage({ 
                src: selectedProduct.images[nextIndex], 
                name: selectedProduct.name 
            });
            setCurrentImageIndex(nextIndex);
        }
    };

    const prevImage = (event) => {
        event.stopPropagation();
        if (selectedImage && selectedProduct) {
            const prevIndex = currentImageIndex === 0 
                ? selectedProduct.images.length - 1 
                : currentImageIndex - 1;
            setSelectedImage({ 
                src: selectedProduct.images[prevIndex], 
                name: selectedProduct.name 
            });
            setCurrentImageIndex(prevIndex);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
        if (productId) {
            window.history.replaceState({}, '', '/curly-hair');
        }
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setSelectedImage(null);
        setCurrentImageIndex(0);
    };

    return (
        <div className="ch-page">
            <div className="ch-container">
                <div className="ch-category-header">
                    <h1 className="ch-section-title">Premium Curly Hair</h1>
                    <p className="ch-section-subtitle">13x4 Frontal Wigs with Multiple Length & Color Options</p>
                </div>

                <div className="ch-subheader">
                    <div className="ch-filter-buttons">
                        {categoryOptions.map(category => (
                            <button
                                key={category.value}
                                className={`ch-filter-btn ${selectedCategory === category.value ? 'ch-active' : ''}`}
                                onClick={() => setSelectedCategory(category.value)}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                    
                    <div className="ch-sort-wrapper">
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="ch-sort"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="ch-results-info">
                    <span className="ch-results-count">{filteredAndSortedProducts.length} Curly Collections</span>
                </div>

                <div className="ch-grid">
                    {filteredAndSortedProducts.map(hair => (
                        <div key={hair.id} className="ch-card">
                            {hair.hasBadge && (
                                <div className="ch-badge">{hair.badgeText}</div>
                            )}
                            
                            <div className="ch-image">
                                <div 
                                    className="ch-image-container ch-clickable"
                                    onClick={() => {
                                        setSelectedProduct(hair);
                                        setSelectedImage({ src: hair.images[0], name: hair.name });
                                        setCurrentImageIndex(0);
                                        setIsImageModalOpen(true);
                                    }}
                                >
                                    <img src={hair.images[0]} alt={hair.baseName} />
                                    <div className="ch-overlay">
                                        <span className="ch-zoom">🔍</span>
                                    </div>
                                </div>
                                <div className="ch-image-counter">
                                    <span className="ch-counter-text">
                                        {hair.images.length} photos • Click to view gallery
                                    </span>
                                </div>
                            </div>
                            
                            <div className="ch-details">
                                <h3 className="ch-name">{hair.baseName}</h3>
                                <div className="ch-meta">
                                    <span className="ch-type">{hair.category}</span>
                                    <span className="ch-length">{hair.lengths.length} Lengths</span>
                                </div>
                                <div className="ch-price-row">
                                    <span className="ch-price"> R{hair.price.toFixed(2)}</span>
                                    <button 
                                        className="ch-cart-btn"
                                        onClick={() => handleProductClick(hair)}
                                    >
                                        <i className="fas fa-shopping-cart"></i>Buy
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedProduct && (
                    <CurlyHairModal
                        product={selectedProduct}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                    />
                )}

                {isImageModalOpen && selectedImage && selectedProduct && (
                    <div className="ch-image-modal" onClick={closeImageModal}>
                        <div className="ch-image-content" onClick={(e) => e.stopPropagation()}>
                            <button className="ch-close-modal" onClick={closeImageModal}>
                                ×
                            </button>
                            
                            {/* Navigation Arrows */}
                            {selectedProduct.images.length > 1 && (
                                <>
                                    <button 
                                        className="ch-nav-button ch-prev-button"
                                        onClick={prevImage}
                                    >
                                        ‹
                                    </button>
                                    <button 
                                        className="ch-nav-button ch-next-button"
                                        onClick={nextImage}
                                    >
                                        ›
                                    </button>
                                </>
                            )}
                            
                            <div className="ch-fullscreen-container">
                                <img 
                                    src={selectedImage.src} 
                                    alt={`${selectedImage.name} - ${currentImageIndex + 1} of ${selectedProduct.images.length}`} 
                                    className="ch-fullscreen-image"
                                />
                            </div>
                            
                            <div className="ch-image-info">
                                <h3>{selectedImage.name}</h3>
                                <div className="ch-image-counter-modal">
                                    <span className="ch-counter-text-modal">
                                        {currentImageIndex + 1} / {selectedProduct.images.length}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Thumbnail Strip */}
                            {selectedProduct.images.length > 1 && (
                                <div className="ch-thumbnail-strip">
                                    {selectedProduct.images.map((img, index) => (
                                        <div 
                                            key={index}
                                            className={`ch-thumbnail ${index === currentImageIndex ? 'ch-thumbnail-active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedImage({ src: img, name: selectedProduct.name });
                                                setCurrentImageIndex(index);
                                            }}
                                        >
                                            <img src={img} alt={`Thumbnail ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {filteredAndSortedProducts.length === 0 && (
                    <div className="ch-empty">
                        <h3>No curly hair collections found</h3>
                        <p>Try selecting a different category</p>
                    </div>
                )}
            </div>

            <div className="seo-content" style={{ display: 'none' }} aria-hidden="true">
                <h2>Premium Curly Hair Extensions South Africa</h2>
                <p>Browse our premium curly hair collections with multiple variation images. Each collection includes gallery viewing to see all available styles, colors, and lengths.</p>
            </div>
        </div>
    );
};

export default CurlyHair;