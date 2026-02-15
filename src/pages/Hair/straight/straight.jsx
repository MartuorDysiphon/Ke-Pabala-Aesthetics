// StraightHair.jsx
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import StraightHairModal from '../../../components/HairModal/straightModal/straightModal';
import './straight.css';

// Import all images
import singleDrawn1 from '../../../assets/Hair/Single Drawn/Single Drawn 1.jpeg';
import singleDrawn2 from '../../../assets/Hair/Single Drawn/Single Drawn 2.jpeg';
import singleDrawn3 from '../../../assets/Hair/Single Drawn/Single Drawn 3.jpeg';
import singleDrawn4 from '../../../assets/Hair/Single Drawn/Single Drawn 4.jpeg';
import singleDrawn5 from '../../../assets/Hair/Single Drawn/Single Drawn 5.jpeg';
import singleDrawn6 from '../../../assets/Hair/Single Drawn/Single Drawn 6.jpeg';
import singleDrawn7 from '../../../assets/Hair/Single Drawn/Single Drawn 7.jpeg';
import singleDrawn8 from '../../../assets/Hair/Single Drawn/Single Drawn 8.jpeg';
import singleDrawn9 from '../../../assets/Hair/Single Drawn/Single Drawn 9.jpeg';
import singleDrawn10 from '../../../assets/Hair/Single Drawn/Single Drawn 10.jpeg';

import doubleDrawn1 from '../../../assets/Hair/Double Drawn/Double Drawn 1.jpeg';
import doubleDrawn2 from '../../../assets/Hair/Double Drawn/Double Drawn 2.jpeg';
import doubleDrawn3 from '../../../assets/Hair/Double Drawn/Double Drawn 3.jpeg';
import doubleDrawn4 from '../../../assets/Hair/Double Drawn/Double Drawn 4.jpeg';
import doubleDrawn5 from '../../../assets/Hair/Double Drawn/Double Drawn 5.jpeg';

import kinky1 from '../../../assets/Hair/Kinky/Kinky 1.jpeg';
import kinky2 from '../../../assets/Hair/Kinky/Kinky 2.jpeg';
import kinky3 from '../../../assets/Hair/Kinky/Kinky 3.jpeg';
import kinky4 from '../../../assets/Hair/Kinky/Kinky 4.jpeg';
import kinky5 from '../../../assets/Hair/Kinky/Kinky 5.jpeg';

import superDD1 from '../../../assets/Hair/Super Double Drawn/Super Double Drawn 1.jpeg';
import superDD2 from '../../../assets/Hair/Super Double Drawn/Super Double Drawn 2.jpeg';
import superDD3 from '../../../assets/Hair/Super Double Drawn/Super Double Drawn 3.jpeg';
import superDD4 from '../../../assets/Hair/Super Double Drawn/Super Double Drawn 4.jpeg';
import superDD5 from '../../../assets/Hair/Super Double Drawn/Super Double Drawn 5.jpeg';
import superDD6 from '../../../assets/Hair/Super Double Drawn/Super Double Drawn 6.jpeg';
import superDD7 from '../../../assets/Hair/Super Double Drawn/Super Double Drawn Choc 1.jpeg';
import superDD8 from '../../../assets/Hair/Super Double Drawn/Super Double Drawn Choc 2.jpeg';
import superDD9 from '../../../assets/Hair/Super Double Drawn/Super Double Drawn Choc 3.jpeg';
import superDD10 from '../../../assets/Hair/Super Double Drawn/Super Double Drawn Choc 4.jpeg';
import superDD11 from '../../../assets/Hair/Super Double Drawn/Super Double Drawn Choc 5.jpeg';

import lindyChoc1 from '../../../assets/Hair/Lindy Choc/Lindy Choc 1.jpeg';
import lindyChoc2 from '../../../assets/Hair/Lindy Choc/Lindy Choc 2.jpeg';
import lindyChoc3 from '../../../assets/Hair/Lindy Choc/Lindy Choc 3.jpeg';
import lindyChoc4 from '../../../assets/Hair/Lindy Choc/Lindy Choc 4.jpeg';

const StraightHair = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('product');

    const straightHairProducts = useMemo(() => [
        // SINGLE DRAWN: One product with 10 variation images
        {
            id: 'single-drawn',
            name: "Single Drawn Virgin Hair Collection",
            baseName: "Single Drawn Hair",
            price: 1250.00,
            images: [singleDrawn1, singleDrawn2, singleDrawn3, singleDrawn4, singleDrawn5, 
                    singleDrawn6, singleDrawn7, singleDrawn8, singleDrawn9, singleDrawn10],
            category: "Single Drawn",
            subcategory: "Single Drawn",
            lengths: ["18 inches", "20 inches", "22 inches", "24 inches", "26 inches"],
            textures: ["Silky Straight", "Bone Straight", "Natural Straight", "Super Straight", "Body Wave"],
            origins: ["Brazilian", "Peruvian", "Malaysian", "Indian", "Mongolian", "Cambodian"],
            qualities: ["Virgin Hair", "Remy Hair"],
            colors: ["Natural Black", "Jet Black", "Dark Brown"],
            description: "Our premium Single Drawn hair collection features carefully selected strands with minimal thickness variation. Each bundle is 100% virgin human hair.",
            hasBadge: true,
            status: "Available"
        },

        // DOUBLE DRAWN: One product with 5 variation images
        {
            id: 'double-drawn',
            name: "Double Drawn Premium Collection",
            baseName: "Double Drawn Hair",
            price: 1850.00,
            images: [doubleDrawn1, doubleDrawn2, doubleDrawn3, doubleDrawn4, doubleDrawn5],
            category: "Double Drawn",
            subcategory: "Double Drawn",
            lengths: ["20 inches", "22 inches", "24 inches", "26 inches", "28 inches"],
            textures: ["Silky Straight", "Bone Straight", "Natural Straight", "Super Straight"],
            origins: ["Brazilian", "Peruvian", "Malaysian", "Indian", "Mongolian"],
            qualities: ["Virgin Hair", "Remy Hair"],
            colors: ["Jet Black", "Natural Black", "Dark Brown"],
            description: "Double Drawn hair features superior thickness consistency with more uniform strands, offering fuller volume and luxurious density.",
            hasBadge: false,
            status: "Available"
        },

        // KINKY: One product with 5 variation images
        {
            id: 'kinky',
            name: "Kinky Straight & Curly Collection",
            baseName: "Kinky Hair",
            price: 1750.00,
            images: [kinky1, kinky2, kinky3, kinky4, kinky5],
            category: "Kinky",
            subcategory: "Kinky",
            lengths: ["18 inches", "20 inches", "22 inches", "24 inches", "26 inches"],
            textures: ["Kinky Straight", "Kinky Curly", "Kinky Wave"],
            origins: ["Brazilian", "Peruvian", "Malaysian", "Indian", "Mongolian"],
            qualities: ["Virgin Hair", "Remy Hair"],
            colors: ["Natural Black", "Jet Black", "Dark Brown"],
            description: "Our Kinky collection offers natural-looking texture with beautiful curls and waves, perfect for afro-textured styles and voluminous looks.",
            hasBadge: false,
            status: "Available"
        },

        // SUPER DD: One product with 11 variation images
        {
            id: 'super-dd',
            name: "Super Double Drawn Luxury Collection",
            baseName: "Super DD Hair",
            price: 2450.00,
            images: [superDD1, superDD2, superDD3, superDD4, superDD5, superDD6, 
                    superDD7, superDD8, superDD9, superDD10, superDD11],
            category: "Super DD",
            subcategory: "Super DD",
            lengths: ["22 inches", "24 inches", "26 inches", "28 inches", "30 inches"],
            textures: ["Silky Straight", "Bone Straight", "Chocolate Straight"],
            origins: ["Brazilian", "Peruvian", "Malaysian", "Indian", "Mongolian"],
            qualities: ["Virgin Hair", "Remy Hair"],
            colors: ["Natural Black", "Jet Black", "Dark Brown", "Chocolate Brown"],
            description: "Super Double Drawn represents the highest quality with maximum thickness consistency. Perfect for luxury installations and runway looks.",
            hasBadge: false,
            status: "Available"
        },

        // LINDY CHOC: One product with 4 variation images
        {
            id: 'lindy-choc',
            name: "Lindy Chocolate Exclusive Collection",
            baseName: "Lindy Chocolate Hair",
            price: 3250.00,
            images: [lindyChoc1, lindyChoc2, lindyChoc3, lindyChoc4],
            category: "Lindy Choc",
            subcategory: "Lindy Choc",
            lengths: ["22 inches", "24 inches", "26 inches", "28 inches"],
            textures: ["Chocolate Straight"],
            origins: ["Brazilian", "Peruvian", "Malaysian", "Mongolian"],
            qualities: ["Luxury Virgin"],
            colors: ["Chocolate Brown"],
            description: "Our exclusive Lindy Chocolate collection features rich chocolate brown tones with silky smooth texture. Limited edition luxury hair.",
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
        setShuffledProducts(shuffleArray(straightHairProducts));
    }, [straightHairProducts]);

    useEffect(() => {
        if (productId) {
            const product = straightHairProducts.find(p => p.id === productId);
            if (product) {
                setSelectedProduct(product);
                setIsModalOpen(true);
            }
        }
    }, [productId, straightHairProducts]);

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'name-asc', label: 'Name: A to Z' }
    ];

    const categoryOptions = [
        { value: 'all', label: 'All Hair' },
        { value: 'Single Drawn', label: 'Single Drawn' },
        { value: 'Double Drawn', label: 'Double Drawn' },
        { value: 'Kinky', label: 'Kinky' },
        { value: 'Super DD', label: 'Super DD' },
        { value: 'Lindy Choc', label: 'Lindy Choc' }
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
            window.history.replaceState({}, '', '/straight-hair');
        }
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setSelectedImage(null);
        setCurrentImageIndex(0);
    };

    return (
        <div className="sh-page">
            <div className="sh-container">
                <div className="sh-category-header">
                    <h1 className="sh-section-title">Premium Straight Hair</h1>
                </div>

                <div className="sh-subheader">
                    <div className="sh-filter-buttons">
                        {categoryOptions.map(category => (
                            <button
                                key={category.value}
                                className={`sh-filter-btn ${selectedCategory === category.value ? 'sh-active' : ''}`}
                                onClick={() => setSelectedCategory(category.value)}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                    
                    <div className="sh-sort-wrapper">
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sh-sort"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="sh-results-info">
                    <span className="sh-results-count">{filteredAndSortedProducts.length} Hair Collections</span>
                </div>

                <div className="sh-grid">
                    {filteredAndSortedProducts.map(hair => (
                        <div key={hair.id} className="sh-card">
                            {hair.hasBadge && (
                                <div className="sh-badge">Single Drawn</div>
                            )}
                            
                            <div className="sh-image">
                                <div 
                                    className="sh-image-container sh-clickable"
                                    onClick={() => {
                                        setSelectedProduct(hair);
                                        setSelectedImage({ src: hair.images[0], name: hair.name });
                                        setCurrentImageIndex(0);
                                        setIsImageModalOpen(true);
                                    }}
                                >
                                    <img src={hair.images[0]} alt={hair.baseName} />
                                    <div className="sh-overlay">
                                        <span className="sh-zoom">🔍</span>
                                    </div>
                                </div>
                                <div className="sh-image-counter">
                                    <span className="sh-counter-text">
                                        {hair.images.length} photos • Click to view gallery
                                    </span>
                                </div>
                            </div>
                            
                            <div className="sh-details">
                                <h3 className="sh-name">{hair.baseName}</h3>
                                <div className="sh-meta">
                                    <span className="sh-type">{hair.category}</span>
                                    <span className="sh-length">{hair.images.length} Variations</span>
                                </div>
                                <div className="sh-price-row">
                                    <span className="sh-price"> R{hair.price.toFixed(2)}</span>
                                    <button 
                                        className="sh-cart-btn"
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
                    <StraightHairModal
                        product={selectedProduct}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                    />
                )}

                {isImageModalOpen && selectedImage && selectedProduct && (
                    <div className="sh-image-modal" onClick={closeImageModal}>
                        <div className="sh-image-content" onClick={(e) => e.stopPropagation()}>
                            <button className="sh-close-modal" onClick={closeImageModal}>
                                ×
                            </button>
                            
                            {/* Navigation Arrows */}
                            {selectedProduct.images.length > 1 && (
                                <>
                                    <button 
                                        className="sh-nav-button sh-prev-button"
                                        onClick={prevImage}
                                    >
                                        ‹
                                    </button>
                                    <button 
                                        className="sh-nav-button sh-next-button"
                                        onClick={nextImage}
                                    >
                                        ›
                                    </button>
                                </>
                            )}
                            
                            <div className="sh-fullscreen-container">
                                <img 
                                    src={selectedImage.src} 
                                    alt={`${selectedImage.name} - ${currentImageIndex + 1} of ${selectedProduct.images.length}`} 
                                    className="sh-fullscreen-image"
                                />
                            </div>
                            
                            <div className="sh-image-info">
                                <h3>{selectedImage.name}</h3>
                                <div className="sh-image-counter-modal">
                                    <span className="sh-counter-text-modal">
                                        {currentImageIndex + 1} / {selectedProduct.images.length}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Thumbnail Strip */}
                            {selectedProduct.images.length > 1 && (
                                <div className="sh-thumbnail-strip">
                                    {selectedProduct.images.map((img, index) => (
                                        <div 
                                            key={index}
                                            className={`sh-thumbnail ${index === currentImageIndex ? 'sh-thumbnail-active' : ''}`}
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
                    <div className="sh-empty">
                        <h3>No hair collections found</h3>
                        <p>Try selecting a different category</p>
                    </div>
                )}
            </div>

            <div className="seo-content" style={{ display: 'none' }} aria-hidden="true">
                <h2>Premium Straight Hair Extensions South Africa</h2>
                <p>Browse our premium hair collections with multiple variation images. Each collection includes gallery viewing to see all available styles, colors, and lengths.</p>
            </div>
        </div>
    );
};

export default StraightHair;