import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProductModal from '../../components/HairModal/HairModal';
import IphoneModal from '../../components/IphoneModal/IphoneModal';
import JeansModal from '../../components/JeansModal/JeansModal';
import './home.css';

import HeroIMG from '../../assets/Logo/hero.png';

// Hair product imports (from straight.jsx structure)
import singleDrawn1 from '../../assets/Hair/Single Drawn/Single Drawn 1.jpeg';
import superDD1 from '../../assets/Hair/Super Double Drawn/Super Double Drawn 1.jpeg';

// iPhone product imports (from iphones.jsx)
import Iphone12 from '../../assets/Iphones/iphone 12.jpg';
import IphoneXR from '../../assets/Iphones/iphone xr.jpg';

// Jean product imports (from jeans.jsx)
import Jean1 from '../../assets/Jeans/jean (1).jpeg'; // H&M Ashwood Jeans
import Jean2 from '../../assets/Jeans/jean (4).jpeg'; // Zara Misty Blue Skirt

const Home = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedIphone, setSelectedIphone] = useState(null);
    const [isHairModalOpen, setIsHairModalOpen] = useState(false);
    const [isIphoneModalOpen, setIsIphoneModalOpen] = useState(false);
    const [isJeansModalOpen, setIsJeansModalOpen] = useState(false);

    // Featured products - exactly 6 items (2 from each category) with "sale" badges only
    const featuredProducts = [
        // 2 Hair Products (from straight.jsx)
        {
            id: 'single-drawn',
            name: "Single Drawn Virgin Hair Collection",
            baseName: "Single Drawn Hair",
            price: 1250.00,
            image: singleDrawn1,
            category: "Single Drawn",
            type: "hair",
            subtype: "human",
            length: "18-26 inches",
            description: "Premium single drawn virgin hair with natural thickness variation. 100% human hair.",
            imageCount: 10,
            lengths: ["18 inches", "20 inches", "22 inches", "24 inches", "26 inches"],
            textures: ["Silky Straight", "Bone Straight"],
            colors: ["Natural Black", "Jet Black", "Dark Brown"],
            status: "Available"
        },
        {
            id: 'super-dd',
            name: "Super Double Drawn Luxury Collection",
            baseName: "Super DD Hair",
            price: 2450.00,
            image: superDD1,
            category: "Super Double Drawn",
            type: "hair",
            subtype: "human",
            length: "22-30 inches",
            description: "Ultra-luxury super double drawn hair with maximum thickness consistency. Premium quality.",
            imageCount: 11,
            lengths: ["22 inches", "24 inches", "26 inches", "28 inches", "30 inches"],
            textures: ["Silky Straight", "Bone Straight", "Chocolate Straight"],
            colors: ["Natural Black", "Jet Black", "Dark Brown", "Chocolate Brown"],
            status: "Available"
        },
        
        // 2 iPhone Products (from iphones.jsx)
        {
            id: 9,
            name: "iPhone 12",
            baseName: "iPhone 12",
            price: 6800.00,
            image: Iphone12,
            category: "iPhone 12",
            type: "iphone",
            storage: "64GB/128GB/256GB",
            series: "12",
            condition: "Pre-Owned",
            color: "Black",
            status: "Available",
            modelYear: "2020",
            defaultStorage: "64GB",
            description: "5G capable with A14 Bionic chip and Super Retina XDR display. Grade A refurbished.",
            features: ["5G", "A14 Bionic", "OLED Display", "Face ID"]
        },
        {
            id: 6,
            name: "iPhone XR",
            baseName: "iPhone XR",
            price: 4100.00,
            image: IphoneXR,
            category: "iPhone XR",
            type: "iphone",
            storage: "64GB/128GB",
            series: "XR",
            condition: "Pre-Owned",
            color: "Coral",
            status: "Available",
            modelYear: "2018",
            defaultStorage: "64GB",
            description: "Liquid Retina display with advanced Face ID and A12 Bionic chip. Excellent condition.",
            features: ["Liquid Retina", "Face ID", "A12 Bionic", "Dual SIM"]
        },
        
        // 2 Jeans Products (from jeans.jsx)
        {
            id: 2,
            name: "Zara Misty Blue Skirt",
            baseName: "Zara Misty Blue Skirt",
            price: 399.99,
            image: Jean2,
            category: "Denim Skirt",
            type: "jean",
            subcategory: "A-Line",
            fit: "A-Line",
            wash: "Misty Blue",
            description: "A relaxed A-line denim skirt in a soft misty blue wash, featuring a midi length and side slits for effortless movement.",
            material: "100% Cotton Denim",
            features: ["Midi Length", "Side Slits", "A-Line Cut", "Button Front"]
        },
        {
            id: 1,
            name: "H&M Ashwood Jeans",
            baseName: "H&M Ashwood Jeans",
            price: 299.99,
            image: Jean1,
            category: "Denim Jeans",
            type: "jean",
            subcategory: "Slim Fit",
            fit: "Slim Fit",
            wash: "Ash Grey",
            description: "Stonewashed slim-fit jeans with a modern ash grey finish and comfortable stretch fabric.",
            material: "98% Cotton, 2% Elastane",
            features: ["Slim Fit", "Stretch Denim", "5-Pocket Style", "Stonewashed"]
        }
    ];

    const openProductModal = (product) => {
        if (product.type === 'iphone') {
            setSelectedIphone(product);
            setIsIphoneModalOpen(true);
        } else if (product.type === 'jean') {
            setSelectedProduct(product);
            setIsJeansModalOpen(true);
        } else {
            setSelectedProduct(product);
            setIsHairModalOpen(true);
        }
    };

    const closeProductModal = () => {
        setIsHairModalOpen(false);
        setIsIphoneModalOpen(false);
        setIsJeansModalOpen(false);
        setSelectedProduct(null);
        setSelectedIphone(null);
    };

    return (
        <>
            <section className="Home__hero-section">
                <div className="Home__container Home__hero-container">
                    <div className="Home__hero-content">
                        <h1 className="Home__hero-title">Quality You Trust. <br />Style You Wear.</h1>
                        <p className="Home__hero-description">Shop premium human hair with a natural finish, original iPhones tested for performance, and well fitted jeans built for daily wear.</p>
                        <div className="Home__hero-buttons">
                            <Link to="/hair" className="Home__hr-btn Home__hr-btn-primary">Shop Hair</Link>
                            <Link to="/iphones" className="Home__hr-btn Home__hr-btn-secondary">Shop iPhones</Link>
                            <Link to="/jeans" className="Home__hr-btn Home__hr-btn-secondary">Shop Jeans</Link>
                        </div>
                    </div>
                    <div className="Home__hero-image">
                        <img src={HeroIMG} alt="Premium fashion showcase" />
                    </div>
                </div>
            </section>

            <section className="Home__featured-section">
                <div className="Home__container">
                    <div className="Home__section-header">
                        <h2 className="Home__section-title">Featured Products</h2>
                        <p className="Home__section-subtitle">Handpicked from our premium collections</p>
                    </div>
                    <div className="Home__featured-grid">
                        {featuredProducts.map(product => (
                            <div 
                                key={product.id} 
                                className="Home__featured-card"
                                onClick={() => openProductModal(product)}
                            >
                                <div className="Home__featured-image">
                                    <img src={product.image} alt={product.name} />
                                    {/* Only ONE badge - SALE badge */}
                                    <div className="Home__sale-badge">SALE</div>
                                </div>
                                <div className="Home__featured-content">
                                    <h3 className="Home__featured-title">{product.baseName || product.name}</h3>
                                    <p className="Home__featured-details">
                                        {product.type === 'hair' && (
                                            <>
                                                <span className="detail-highlight"><i className="fas fa-ruler"></i> {product.length}</span>
                                                <br />
                                                <span className="detail-meta"><i className="fas fa-palette"></i> {product.colors?.slice(0, 2).join(' • ')}</span>
                                            </>
                                        )}
                                        {product.type === 'iphone' && (
                                            <>
                                                <span className="detail-highlight"><i className="fas fa-memory"></i> {product.storage} • <i className="fas fa-mobile-alt"></i> {product.color}</span>
                                                <br />
                                                <span className="detail-meta"><i className="fas fa-clipboard-check"></i> {product.condition} • {product.modelYear}</span>
                                            </>
                                        )}
                                        {product.type === 'jean' && (
                                            <>
                                                <span className="detail-highlight"><i className="fas fa-tshirt"></i> {product.fit} • {product.wash}</span>
                                                <br />
                                                <span className="detail-meta"><i className="fas fa-tag"></i> {product.material || 'Premium Denim'}</span>
                                            </>
                                        )}
                                    </p>
                                    <div className="Home__featured-footer">
                                        <span className="Home__featured-price">
                                            <i className="fas fa-tag"></i> R{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                                        </span>
                                        <button 
                                            className="Home__featured-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openProductModal(product);
                                            }}
                                        >
                                            <i className="fas fa-shopping-cart"></i>Buy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modals */}
            {selectedProduct && selectedProduct.type === 'hair' && (
                <ProductModal
                    product={selectedProduct}
                    isOpen={isHairModalOpen}
                    onClose={closeProductModal}
                />
            )}
            
            {selectedProduct && selectedProduct.type === 'jean' && (
                <JeansModal
                    product={selectedProduct}
                    isOpen={isJeansModalOpen}
                    onClose={closeProductModal}
                />
            )}
            
            {selectedIphone && (
                <IphoneModal
                    product={selectedIphone}
                    isOpen={isIphoneModalOpen}
                    onClose={closeProductModal}
                />
            )}
        </>
    );
};

export default Home;