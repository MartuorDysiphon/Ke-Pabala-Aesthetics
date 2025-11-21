// Jeans.jsx
import { useState } from 'react';
import JeansModal from '../../components/JeansModal/JeansModal';
import './jeans.css';

import Jean1 from '../../assets/Jeans/jean1.avif';
import Jean2 from '../../assets/Jeans/jean2.avif';
import Jean3 from '../../assets/Jeans/jean3.png';
import Jean4 from '../../assets/Jeans/jean4.webp';
import Jean5 from '../../assets/Jeans/jean5.png';
import Jean6 from '../../assets/Jeans/jean6.png';

const Jeans = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const jeansProducts = [
        {
            id: 1,
            name: "Midnight Riser",
            price: "899.99",
            image: Jean1,
            category: "Slim Fit",
            description: "Premium dark wash with comfortable stretch"
        },
        {
            id: 2,
            name: "Urban Classic",
            price: "759.99",
            image: Jean2,
            category: "Straight Fit",
            description: "Vintage blue with authentic distressing"
        },
        {
            id: 3,
            name: "Shadow Slim",
            price: "829.99",
            image: Jean3,
            category: "Skinny Fit",
            description: "Black denim with superior flexibility"
        },
        {
            id: 4,
            name: "Vintage Fade",
            price: "689.99",
            image: Jean4,
            category: "Relaxed Fit",
            description: "Light wash with classic comfort"
        },
        {
            id: 5,
            name: "Executive Denim",
            price: "949.99",
            image: Jean5,
            category: "Tapered Fit",
            description: "Dark indigo for professional styling"
        },
        {
            id: 6,
            name: "Raw Edge",
            price: "779.99",
            image: Jean6,
            category: "Baggy Straight",
            description: "Unfinished hem with modern cut"
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
        <div className="jp-page">
            <section className="jp-hero">
                <div className="container">
                    <div className="jp-hero-content">
                        <h1>Premium Denim</h1>
                        <p>Curated collection of designer jeans. Perfect fit, premium quality, timeless style.</p>
                    </div>
                </div>
            </section>

            <section className="jp-products">
                <div className="container">
                    <div className="jp-filter-bar">
                        <h2 className="jp-section-title">All Jeans</h2>
                        <div className="jp-stats">
                            <span>{jeansProducts.length} styles available</span>
                        </div>
                    </div>

                    <div className="jp-grid">
                        {jeansProducts.map(jean => (
                            <div 
                                key={jean.id} 
                                className="jp-card"
                                onClick={() => openProductModal(jean)}
                            >
                                <div className="jp-card-image">
                                    <img src={jean.image} alt={jean.name} />
                                    <button 
                                        className="jp-add-to-cart-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openProductModal(jean);
                                        }}
                                        aria-label={`View ${jean.name} details`}
                                    >
                                        <i className="fas fa-shopping-cart"></i>
                                    </button>
                                </div>
                                <div className="jp-card-info">
                                    <h3 className="jp-card-title">{jean.name}</h3>
                                    <p className="jp-card-category">{jean.category}</p>
                                    <p className="jp-card-price">R{jean.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {selectedProduct && (
                <JeansModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={closeProductModal}
                />
            )}
        </div>
    );
};

export default Jeans;