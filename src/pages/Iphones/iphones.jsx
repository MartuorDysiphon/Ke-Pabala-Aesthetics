// Iphones.jsx
import { useState } from 'react';
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
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const iphoneProducts = [
        {
            id: 1,
            name: "iPhone 12",
            price: "8999.99",
            image: Iphone12,
            category: "iPhone",
            length: "128GB/256GB"
        },
        {
            id: 2,
            name: "iPhone 11 Pro",
            price: "7399.99",
            image: Iphone11Pro,
            category: "iPhone",
            length: "64GB/256GB/512GB"
        },
        {
            id: 3,
            name: "iPhone 11",
            price: "6399.99",
            image: Iphone11,
            category: "iPhone",
            length: "64GB/128GB"
        },
        {
            id: 4,
            name: "iPhone XR",
            price: "5299.99",
            image: IphoneXR,
            category: "iPhone",
            length: "64GB/128GB"
        },
        {
            id: 5,
            name: "iPhone X",
            price: "4899.99",
            image: IphoneX,
            category: "iPhone",
            length: "64GB/256GB"
        },
        {
            id: 6,
            name: "iPhone 8 Plus",
            price: "4199.99",
            image: Iphone8Plus,
            category: "iPhone",
            length: "64GB/256GB"
        },
        {
            id: 7,
            name: "iPhone 8",
            price: "3799.99",
            image: Iphone8,
            category: "iPhone",
            length: "64GB/256GB"
        },
        {
            id: 8,
            name: "iPhone 7 Plus",
            price: "3299.99",
            image: Iphone7Plus,
            category: "iPhone",
            length: "32GB/128GB"
        },
        {
            id: 9,
            name: "iPhone 7",
            price: "2899.99",
            image: Iphone7,
            category: "iPhone",
            length: "32GB/128GB"
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
        <div className="iphones-page">
            <section className="iphones-hero">
                <div className="container">
                    <div className="iphones-hero-content">
                        <h1>Premium iPhones</h1>
                        <p>Unlocked & Certified Refurbished. Experience Apple's innovation with our carefully selected iPhones, each professionally restored to perfect condition.</p>
                    </div>
                </div>
            </section>

            <section className="iphones-products">
                <div className="container">
                    <div className="iphones-filter-bar">
                        <h2 className="section-title">All iPhones</h2>
                        <div className="iphones-stats">
                            <span>{iphoneProducts.length} models available</span>
                        </div>
                    </div>

                    <div className="iphones-grid">
                        {iphoneProducts.map(iphone => (
                            <div 
                                key={iphone.id} 
                                className="iphone-card"
                                onClick={() => openProductModal(iphone)}
                            >
                                <div className="iphone-card-image">
                                    <img src={iphone.image} alt={iphone.name} />
                                    <button 
                                        className="iphone-add-to-cart-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openProductModal(iphone);
                                        }}
                                        aria-label={`Add ${iphone.name} to cart`}
                                    >
                                        <i className="fas fa-shopping-cart"></i>
                                    </button>
                                </div>
                                <div className="iphone-card-info">
                                    <h3 className="iphone-card-title">{iphone.name}</h3>
                                    <p className="iphone-card-storage">{iphone.length}</p>
                                    <p className="iphone-card-price">From R{iphone.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {selectedProduct && (
                <IphoneModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={closeProductModal}
                />
            )}
        </div>
    );
};

export default Iphones;