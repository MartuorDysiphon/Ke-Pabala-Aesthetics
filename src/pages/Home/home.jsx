import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProductModal from '../../components/HairModal/HairModal';
import IphoneModal from '../../components/IphoneModal/IphoneModal';
import './home.css';

import HeroIMG from '../../assets/Logo/IMG.jpg';

import HairCategory from '../../assets/Home/sdd baby curls.jpg';
import IphoneCategory from '../../assets/Home/iphone 11 pro.jpg';
import JeanCategory from '../../assets/Home/jean hm.avif';

// Hair product images
import DoubleDrawn2 from '../../assets/Hair/double drawn 2.jpg';
import DoubleDrawn3 from '../../assets/Hair/double drawn 3.jpg';

// iPhone product images
import Iphone12 from '../../assets/Iphones/iphone 12.jpg';
import IphoneXR from '../../assets/Iphones/iphone xr.jpg';

// Jean product images
import Jean6 from '../../assets/Jeans/jean6.png';
import Jean3 from '../../assets/Jeans/jean3.png';

const Home = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedIphone, setSelectedIphone] = useState(null);
    const [isHairModalOpen, setIsHairModalOpen] = useState(false);
    const [isIphoneModalOpen, setIsIphoneModalOpen] = useState(false);

    const categories = [
        {
            id: 1,
            title: "Premium Hair",
            description: "100% Human Hair · All Textures",
            image: HairCategory,
            link: "/hair",
            products: "25+ Products",
            color: "#8B7355"
        },
        {
            id: 2,
            title: "Certified iPhones",
            description: "Refurbished · Unlocked · Apple Certified",
            image: IphoneCategory,
            link: "/iphones",
            products: "15+ Models",
            color: "#1D1D1F"
        },
        {
            id: 3,
            title: "Designer Jeans",
            description: "Premium Denim · Perfect Fit",
            image: JeanCategory,
            link: "/jeans",
            products: "20+ Styles",
            color: "#2C3E50"
        }
    ];

    const featuredProducts = [
        // Hair Products
        {
            id: 1,
            name: "Premium Double Drawn",
            price: "1349.99",
            image: DoubleDrawn2,
            category: "Double Drawn",
            type: "hair",
            subtype: "human",
            length: "24-26 inches",
            description: "Premium quality double drawn human hair"
        },
        {
            id: 2,
            name: "Double Drawn Volume",
            price: "1199.99",
            image: DoubleDrawn3,
            category: "Double Drawn",
            type: "hair",
            subtype: "human",
            length: "20-22 inches",
            description: "Volume-boosting double drawn hair"
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
        // Jean Products
        {
            id: 5,
            name: "Shadow Slim",
            price: "829.99",
            image: Jean3,
            category: "Skinny Fit",
            type: "jean",
            description: "Black denim with superior flexibility"
        },
        {
            id: 6,
            name: "Raw Edge",
            price: "779.99",
            image: Jean6,
            category: "Baggy Straight",
            type: "jean",
            description: "Unfinished hem with modern cut"
        }
    ];

    const openProductModal = (product) => {
        if (product.type === 'iphone') {
            setSelectedIphone(product);
            setIsIphoneModalOpen(true);
        } else {
            setSelectedProduct(product);
            setIsHairModalOpen(true);
        }
    };

    const closeProductModal = () => {
        setIsHairModalOpen(false);
        setIsIphoneModalOpen(false);
        setSelectedProduct(null);
        setSelectedIphone(null);
    };

    return (
        <>
            <section className="hero-section">
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">Curated Quality,<br />Defined Style.</h1>
                        <p className="hero-description">Discover premium human hair, certified iPhones, and designer denim — all curated for those who appreciate exceptional quality.</p>
                        <div className="hero-buttons">
                            <Link to="/hair" className="hr-btn hr-btn-primary">Shop Hair</Link>
                            <Link to="/iphones" className="hr-btn hr-btn-secondary">Shop iPhones</Link>
                            <Link to="/jeans" className="hr-btn hr-btn-secondary">Shop Jeans</Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={HeroIMG} alt="Premium fashion showcase" />
                    </div>
                </div>
            </section>

            <section className="categories-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Shop Collections</h2>
                        <p className="section-subtitle">Explore our premium categories</p>
                    </div>
                    <div className="categories-grid">
                        {categories.map(category => (
                            <Link to={category.link} key={category.id} className="category-card">
                                <div className="category-image">
                                    <img src={category.image} alt={category.title} />
                                    <div className="category-overlay" style={{ backgroundColor: `${category.color}80` }}></div>
                                </div>
                                <div className="category-content">
                                    <div className="category-header">
                                        <h3 className="category-title">{category.title}</h3>
                                        <span className="category-products">{category.products}</span>
                                    </div>
                                    <p className="category-description">{category.description}</p>
                                    <div className="category-footer">
                                        <span className="category-link">Browse Collection</span>
                                        <span className="category-arrow">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="featured-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Products</h2>
                        <p className="section-subtitle">Handpicked from our premium collections</p>
                    </div>
                    <div className="featured-grid">
                        {featuredProducts.map(product => (
                            <div 
                                key={product.id} 
                                className="featured-card"
                                onClick={() => openProductModal(product)}
                            >
                                <div className="featured-image">
                                    <img src={product.image} alt={product.name} />
                                    <div className="featured-category">{product.category}</div>
                                    {product.type === 'iphone' && product.featured && (
                                        <div className="featured-badge">Featured</div>
                                    )}
                                    {product.type === 'iphone' && product.status === 'Low Stock' && (
                                        <div className="lowstock-badge">Low Stock</div>
                                    )}
                                </div>
                                <div className="featured-content">
                                    <h3 className="featured-title">{product.name}</h3>
                                    {product.type === 'hair' && (
                                        <p className="featured-details">{product.length}</p>
                                    )}
                                    {product.type === 'iphone' && (
                                        <p className="featured-details">{product.storage} · {product.color}</p>
                                    )}
                                    {product.type === 'jean' && (
                                        <p className="featured-details">{product.description}</p>
                                    )}
                                    <div className="featured-footer">
                                        <span className="featured-price">R{product.price}</span>
\                                       <button 
                                            className="featured-button"
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
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    isOpen={isHairModalOpen}
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
