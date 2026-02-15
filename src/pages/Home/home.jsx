import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProductModal from '../../components/HairModal/HairModal';
import IphoneModal from '../../components/IphoneModal/IphoneModal';
import JeansModal from '../../components/JeansModal/JeansModal'; // Added JeansModal import
import './home.css';

import HeroIMG from '../../assets/Logo/hero.png';

// Hair product images
import Blondie from '../../assets/Hair/blondie.jpg';
import Straight1 from '../../assets/Hair/straight1.jpg';

// iPhone product images
import Iphone12 from '../../assets/Iphones/iphone 12.jpg';
import IphoneXR from '../../assets/Iphones/iphone xr.jpg';

// Jean product images - Updated to new products
import Jean2 from '../../assets/Jeans/jean (4).jpeg'; // Zara Misty Blue Skirt
import Jean5 from '../../assets/Jeans/jean (5).jpeg'; // Zara Denim Jacket

const Home = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedIphone, setSelectedIphone] = useState(null);
    const [isHairModalOpen, setIsHairModalOpen] = useState(false);
    const [isIphoneModalOpen, setIsIphoneModalOpen] = useState(false);
    const [isJeansModalOpen, setIsJeansModalOpen] = useState(false); // Added Jeans modal state

    const featuredProducts = [
        // Hair Products
        {   id: 1, 
            name: "Sun-Kissed Blondie", 
            price: 1349.99, 
            image: Blondie, 
            category: "Straight", 
            type: "hair",
            subtype: "human",
            length: "24-26 inches" ,
            description: "Premium quality double drawn human hair"
        },
        {   id: 2, 
            name: "Silky Straight", 
            price: 929.99, 
            image: Straight1, 
            category: "Straight", 
            type: "hair",
            subtype: "human",
            length: "20-22 inches",
            description: "Volume-boosting Straight hair"
        },
        // iPhone Products
        {
            id: 3,
            name: "iPhone 12",
            price: "8999.99",
            image: Iphone12,
            category: "iPhone",
            type: "iphone",
            storage: "128GB/256GB",
            series: "12",
            condition: "Refurbished",
            color: "Black",
            status: "Available",
            featured: true
        },
        {
            id: 4,
            name: "iPhone XR",
            price: "5299.99",
            image: IphoneXR,
            category: "iPhone",
            type: "iphone",
            storage: "64GB/128GB",
            series: "XR",
            condition: "Good",
            color: "Coral",
            status: "Low Stock"
        },
        // Jeans Products - UPDATED
        {
            id: 5,
            name: "Zara Misty Blue Skirt",
            price: 399.99,
            image: Jean2,
            category: "Denim Skirt",
            type: "jean",
            subcategory: "A-Line",
            description: "A relaxed A-line denim skirt in a soft misty blue wash, featuring a midi length and side slits for effortless movement.",
            featured: true
        },
        {
            id: 6,
            name: "Zara Denim Jacket",
            price: 449.99,
            image: Jean5,
            category: "Denim Jacket",
            type: "jean",
            subcategory: "Oversized",
            description: "An oversized washed denim jacket with a relaxed fit, raw hem details, and a versatile medium wash for layered styling.",
            featured: true
        }
    ];

    const openProductModal = (product) => {
        if (product.type === 'iphone') {
            setSelectedIphone(product);
            setIsIphoneModalOpen(true);
        } else if (product.type === 'jean') {
            setSelectedProduct(product);
            setIsJeansModalOpen(true); // Use Jeans modal for jeans products
        } else {
            setSelectedProduct(product);
            setIsHairModalOpen(true);
        }
    };

    const closeProductModal = () => {
        setIsHairModalOpen(false);
        setIsIphoneModalOpen(false);
        setIsJeansModalOpen(false); // Close jeans modal too
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
                                    <div className="Home__featured-category">{product.category}</div>
                                    {product.featured && (
                                        <div className="Home__featured-badge">Featured</div>
                                    )}
                                    {product.status === 'Low Stock' && (
                                        <div className="Home__lowstock-badge">Low Stock</div>
                                    )}
                                </div>
                                <div className="Home__featured-content">
                                    <h3 className="Home__featured-title">{product.name}</h3>
                                    {product.type === 'hair' && (
                                        <p className="Home__featured-details">{product.length}</p>
                                    )}
                                    {product.type === 'iphone' && (
                                        <p className="Home__featured-details">{product.storage} · {product.color}</p>
                                    )}
                                    {product.type === 'jean' && (
                                        <p className="Home__featured-details">{product.description}</p>
                                    )}
                                    <div className="Home__featured-footer">
                                        <span className="Home__featured-price">R{product.price}</span>
                                        <button 
                                            className="Home__featured-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openProductModal(product);
                                            }}
                                        >
                                            <i className="fas fa-shopping-cart"></i> Buy
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