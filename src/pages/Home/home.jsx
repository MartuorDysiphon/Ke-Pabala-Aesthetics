// home.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProductModal from '../../components/ProductModal/ProductModal';
import './home.css';

import Blondie from '../../assets/Home/blondie.jpg';
import SddBabyCurls from '../../assets/Home/sdd baby curls.jpg';
import Iphone11Pro from '../../assets/Home/iphone 11 pro.jpg';
import JeanHm from '../../assets/Home/jean hm.avif';

import DonorHair from '../../assets/Hair/donor1.jpg';
import CurlyHair from '../../assets/Hair/curly1.jpg';
import SddCurls from '../../assets/Hair/sdd baby curls.jpg';
import Iphone from '../../assets/Iphones/iphone xr.jpg';

const Home = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const featuredProducts = [
        {
            id: 1,
            name: "Matladi Donor Hair",
            price: "1189.99",
            image: DonorHair,
            category: "Luxury Hair",
            length: "Various Lengths"
        },
        {
            id: 2,
            name: "Faith Wave Curls",
            price: "619.99",
            image: CurlyHair,
            category: "Luxury Hair",
            length: "Various Lengths"
        },
        {
            id: 3,
            name: "SDD Baby Curls",
            price: "899.99",
            image: SddCurls,
            category: "Luxury Hair",
            length: "Various Lengths"
        },
        {
            id: 4,
            name: "iPhone 11 Pro",
            price: "6399.99",
            image: Iphone,
            category: "iPhone",
            length: "64GB/256GB"
        }
    ];

    const openProductModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeProductModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <>
            <section className="hero">
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1>Curated Quality, Defined Style.</h1>
                        <p>Discover the perfect blend of technology and fashion. Ke Pabala Aesthetics brings you premium human hair, the latest iPhones, and designer denim all in one place.</p>
                        <Link to="/hair" className="btn btn-accent">Explore the Trends</Link>
                    </div>
                    <div className="hero-image-wrapper">
                        <div className="hero__img">
                            <img src={Blondie} alt="Fashion showcase" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="categories" id="categories">
                <div className="container">
                    <h2 className="section-title">Shop By Category</h2>
                    <div className="category-grid">
                        <Link to="/hair" className="category-card">
                            <div className="category-image" style={{ backgroundColor: '#c4a287', height: '100%' }}>
                                <img src={SddBabyCurls} alt="Luxury Hair" />
                            </div>
                            <div className="category-card-content">
                                <h3>Luxury Hair</h3>
                                <p>100% Human Hair, Various Textures</p>
                            </div>
                        </Link>
                        <Link to="/iphones" className="category-card">
                            <div className="category-image" style={{ backgroundColor: '#a3c9b8', height: '100%' }}>
                                <img src={Iphone11Pro} alt="Latest iPhones" />
                            </div>
                            <div className="category-card-content">
                                <h3>Latest iPhones</h3>
                                <p>Unlocked & Certified Refurbished</p>
                            </div>
                        </Link>
                        <Link to="/jeans" className="category-card">
                            <div className="category-image">
                                <div style={{ backgroundColor: '#2a2a2a', height: '100%' }}>
                                    <img src={JeanHm} alt="Latest Jeans" />
                                </div>
                            </div>
                            <div className="category-card-content">
                                <h3>Designer Jeans</h3>
                                <p>From Classic to Trend-Setting Fits</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="Home__products" id='Home__products'>
                <div className="container">
                    <h2 className="section-title">Featured This Week</h2>
                    <div className="Home__product-grid">
                        {featuredProducts.map(product => (
                            <div 
                                key={product.id} 
                                className="Home__product-card"
                                onClick={() => openProductModal(product)}
                            >
                                <div className="Home__product-img">
                                    <img src={product.image} alt={product.name} />
                                    <button 
                                        className="Home__add-to-cart-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openProductModal(product);
                                        }}
                                        aria-label={`Add ${product.name} to cart`}
                                    >
                                        <i className="fas fa-shopping-cart"></i>
                                    </button>
                                </div>
                                <div className="Home__product-info">
                                    <h3 className="Home__product-title">{product.name}</h3>
                                    <p className="Home__product-price">From R{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={closeProductModal}
                />
            )}
        </>
    );
};

export default Home;