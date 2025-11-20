import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductModal from '../../components/ProductModal/ProductModal';
import './hair.css';

import Blondie from '../../assets/Hair/blondie.jpg';
import Curly1 from '../../assets/Hair/curly1.jpg';
import Curly2 from '../../assets/Hair/curly2.jpg';
import Curly3 from '../../assets/Hair/curly3.jpg';
import Curly4 from '../../assets/Hair/curly4.jpg';
import Curly5 from '../../assets/Hair/curly5.jpg';
import Donor1 from '../../assets/Hair/donor1.jpg';
import Donor2 from '../../assets/Hair/donor2.jpg';
import Donor3 from '../../assets/Hair/donor3.jpg';
import DoubleDrawn1 from '../../assets/Hair/double drawn 1.jpg';
import DoubleDrawn2 from '../../assets/Hair/double drawn 2.jpg';
import DoubleDrawn3 from '../../assets/Hair/double drawn 3.jpg';
import DoubleDrawn4 from '../../assets/Hair/double drawn 4.jpg';
import DoubleDrawn5 from '../../assets/Hair/double drawn 5.jpg';
import Glueless1 from '../../assets/Hair/glueless 1.jpg';
import Glueless2 from '../../assets/Hair/glueless 2.jpg';
import Glueless3 from '../../assets/Hair/glueless 3.jpg';
import Glueless4 from '../../assets/Hair/glueless4.jpg';
import Pixie1 from '../../assets/Hair/pexie1.jpg';
import Pixie2 from '../../assets/Hair/pixie2.jpg';
import Pixie3 from '../../assets/Hair/pixie3.jpg';
import SddDonorChocBrown from '../../assets/Hair/sdd donor chocolate brown.jpg';
import SddJerryCurls1 from '../../assets/Hair/sdd jerry cirls1.jpg';
import SddJerryCurls from '../../assets/Hair/sdd jerry curls.jpg';
import SddLindyDonor from '../../assets/Hair/sdd lindy donor.jpg';
import SddPixelCurly from '../../assets/Hair/sdd pixel curly.jpg';
import SddWaterwave from '../../assets/Hair/sdd waterwave.jpg';
import Sdd from '../../assets/Hair/sdd.jpg';
import Straight1 from '../../assets/Hair/straight1.jpg';
import Straight2 from '../../assets/Hair/straight2.jpg';
import Straight3 from '../../assets/Hair/straight3.jpg';
import Straight4 from '../../assets/Hair/straight4.jpg';

const Hair = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('name-asc');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const hairCategories = [
        'All', 'Straight', 'Curly/Wavey', 'Double Drawn', 'SDD', 'Donor', 'Pixie', 'Glueless'
    ];

    const sortOptions = [
        { value: 'name-asc', label: 'Name: A to Z' },
        { value: 'name-desc', label: 'Name: Z to A' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'length-asc', label: 'Length: Short to Long' },
        { value: 'length-desc', label: 'Length: Long to Short' }
    ];

    const hairProducts = [
        {
            id: 1,
            name: "Sun-Kissed Blondie",
            price: 1349.99,
            image: Blondie,
            category: "Straight",
            length: "24-26 inches"
        },
        {
            id: 2,
            name: "Boho Curly Bliss",
            price: 899.99,
            image: Curly1,
            category: "Curly/Wavey",
            length: "20-22 inches"
        },
        {
            id: 3,
            name: "Cascade Curly Layers",
            price: 949.99,
            image: Curly2,
            category: "Curly/Wavey",
            length: "22-24 inches"
        },
        {
            id: 4,
            name: "Springy Ringlets",
            price: 819.99,
            image: Curly3,
            category: "Curly/Wavey",
            length: "18-20 inches"
        },
        {
            id: 5,
            name: "Loose Beach Curls",
            price: 879.99,
            image: Curly4,
            category: "Curly/Wavey",
            length: "20-22 inches"
        },
        {
            id: 6,
            name: "Defined Curly Coils",
            price: 929.99,
            image: Curly5,
            category: "Curly/Wavey",
            length: "22-24 inches"
        },
        {
            id: 7,
            name: "Matladi Premium Donor",
            price: 1489.99,
            image: Donor1,
            category: "Donor",
            length: "26-28 inches"
        },
        {
            id: 8,
            name: "Virgin Donor Hair",
            price: 1399.99,
            image: Donor2,
            category: "Donor",
            length: "24-26 inches"
        },
        {
            id: 9,
            name: "Luxury Donor Weave",
            price: 1599.99,
            image: Donor3,
            category: "Donor",
            length: "28-30 inches"
        },
        {
            id: 10,
            name: "Double Drawn Silk",
            price: 1249.99,
            image: DoubleDrawn1,
            category: "Double Drawn",
            length: "22-24 inches"
        },
        {
            id: 11,
            name: "Premium Double Drawn",
            price: 1349.99,
            image: DoubleDrawn2,
            category: "Double Drawn",
            length: "24-26 inches"
        },
        {
            id: 12,
            name: "Double Drawn Volume",
            price: 1199.99,
            image: DoubleDrawn3,
            category: "Double Drawn",
            length: "20-22 inches"
        },
        {
            id: 13,
            name: "Luxury Double Drawn",
            price: 1449.99,
            image: DoubleDrawn4,
            category: "Double Drawn",
            length: "26-28 inches"
        },
        {
            id: 14,
            name: "Double Drawn Supreme",
            price: 1299.99,
            image: DoubleDrawn5,
            category: "Double Drawn",
            length: "22-24 inches"
        },
        {
            id: 15,
            name: "Glueless Lace Front",
            price: 1649.99,
            image: Glueless1,
            category: "Glueless",
            length: "20-22 inches"
        },
        {
            id: 16,
            name: "Easy Wear Glueless",
            price: 1549.99,
            image: Glueless2,
            category: "Glueless",
            length: "18-20 inches"
        },
        {
            id: 17,
            name: "Glueless HD Lace",
            price: 1749.99,
            image: Glueless3,
            category: "Glueless",
            length: "22-24 inches"
        },
        {
            id: 18,
            name: "Breathable Glueless",
            price: 1599.99,
            image: Glueless4,
            category: "Glueless",
            length: "20-22 inches"
        },
        {
            id: 19,
            name: "Chic Pixie Bob",
            price: 689.99,
            image: Pixie1,
            category: "Pixie",
            length: "12-14 inches"
        },
        {
            id: 20,
            name: "Modern Pixie Cut",
            price: 749.99,
            image: Pixie2,
            category: "Pixie",
            length: "14-16 inches"
        },
        {
            id: 21,
            name: "Textured Pixie",
            price: 719.99,
            image: Pixie3,
            category: "Pixie",
            length: "12-14 inches"
        },
        {
            id: 22,
            name: "SDD Chocolate Brown",
            price: 1099.99,
            image: SddDonorChocBrown,
            category: "SDD",
            length: "20-22 inches"
        },
        {
            id: 23,
            name: "SDD Jerry Curls Pro",
            price: 1149.99,
            image: SddJerryCurls1,
            category: "SDD",
            length: "22-24 inches"
        },
        {
            id: 24,
            name: "SDD Classic Jerry Curls",
            price: 1049.99,
            image: SddJerryCurls,
            category: "SDD",
            length: "20-22 inches"
        },
        {
            id: 25,
            name: "SDD Lindy Donor",
            price: 1249.99,
            image: SddLindyDonor,
            category: "SDD",
            length: "24-26 inches"
        },
        {
            id: 26,
            name: "SDD Pixel Curly",
            price: 999.99,
            image: SddPixelCurly,
            category: "SDD",
            length: "18-20 inches"
        },
        {
            id: 27,
            name: "SDD Water Wave",
            price: 1079.99,
            image: SddWaterwave,
            category: "SDD",
            length: "20-22 inches"
        },
        {
            id: 28,
            name: "SDD Premium Collection",
            price: 1199.99,
            image: Sdd,
            category: "SDD",
            length: "22-24 inches"
        },
        {
            id: 29,
            name: "Silky Straight",
            price: 929.99,
            image: Straight1,
            category: "Straight",
            length: "20-22 inches"
        },
        {
            id: 30,
            name: "Brazilian Straight",
            price: 989.99,
            image: Straight2,
            category: "Straight",
            length: "22-24 inches"
        },
        {
            id: 31,
            name: "Mirror Straight",
            price: 1049.99,
            image: Straight3,
            category: "Straight",
            length: "24-26 inches"
        },
        {
            id: 32,
            name: "Ultra Straight",
            price: 959.99,
            image: Straight4,
            category: "Straight",
            length: "20-22 inches"
        }
    ];

    const getLengthValue = (lengthStr) => {
        const match = lengthStr.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
    };

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = selectedCategory === 'All' 
            ? [...hairProducts] 
            : hairProducts.filter(product => product.category === selectedCategory);

        switch (sortBy) {
            case 'name-asc':
                return filtered.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return filtered.sort((a, b) => b.name.localeCompare(a.name));
            case 'price-low':
                return filtered.sort((a, b) => a.price - b.price);
            case 'price-high':
                return filtered.sort((a, b) => b.price - a.price);
            case 'length-asc':
                return filtered.sort((a, b) => getLengthValue(a.length) - getLengthValue(b.length));
            case 'length-desc':
                return filtered.sort((a, b) => getLengthValue(b.length) - getLengthValue(a.length));
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
        <div className="category-page">
            <div className="container">
                <div className="category-header">
                    <h1 className="section-title">Luxury Hair Collection</h1>
                    <p className="page-subtitle">100% Human Hair in Various Textures and Styles</p>
                </div>

                <div className="subheader-blur">
                    <div className="subheader-content">
                        <div className="categories-section">
                            <h3 className="subheader-title">Categories</h3>
                            <div className="categories-scroll">
                                {hairCategories.map(category => (
                                    <button
                                        key={category}
                                        className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="sorting-section">
                            <h3 className="subheader-title">Sort By</h3>
                            <div className="sort-select-wrapper">
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
                                <i className="fas fa-chevron-down sort-arrow"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="results-info">
                    <p>
                        Showing {filteredAndSortedProducts.length} products
                        {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                    </p>
                </div>

                <div className="product-grid">
                    {filteredAndSortedProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <div className="product-img">
                                <img src={product.image} alt={product.name} />
                                <span className="product-badge">{product.category}</span>
                            </div>
                            <div className="product-info">
                                <h3 className="product-title">{product.name}</h3>
                                <p className="product-length">{product.length}</p>
                                <p className="product-price">R{product.price.toFixed(2)}</p>
                                <div className="product-actions">
                                    <button 
                                        className="btn btn-accent"
                                        onClick={() => handleProductClick(product)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                    />
                )}

                {filteredAndSortedProducts.length === 0 && (
                    <div className="no-products">
                        <i className="fas fa-search"></i>
                        <h3>No products found</h3>
                        <p>Try selecting a different category</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hair;