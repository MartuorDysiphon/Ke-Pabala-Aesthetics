// import React from 'react';
// import './Jeans.css';

// // Import jeans images (you can add actual images later)
// import Jeans1 from '../../assets/Jeans/jeans1.jpg';
// import Jeans2 from '../../assets/Jeans/jeans2.jpg';
// import Jeans3 from '../../assets/Jeans/jeans3.jpg';
// import Jeans4 from '../../assets/Jeans/jeans4.jpg';
// import Jeans5 from '../../assets/Jeans/jeans5.jpg';
// import Jeans6 from '../../assets/Jeans/jeans6.jpg';

// const Jeans = () => {
//     const jeansProducts = [
//         {
//             id: 1,
//             name: "Slim Fit Black Denim",
//             price: "R899.99",
//             image: Jeans1,
//             brand: "Levi's",
//             fit: "Slim",
//             color: "Black",
//             size: "28-40"
//         },
//         {
//             id: 2,
//             name: "Vintage Blue Straight",
//             price: "R759.99",
//             image: Jeans2,
//             brand: "Wrangler",
//             fit: "Straight",
//             color: "Light Blue",
//             size: "30-42"
//         },
//         {
//             id: 3,
//             name: "Designer Ripped Jeans",
//             price: "R1299.99",
//             image: Jeans3,
//             brand: "Diesel",
//             fit: "Skinny",
//             color: "Dark Blue",
//             size: "26-38"
//         },
//         {
//             id: 4,
//             name: "Classic Bootcut",
//             price: "R689.99",
//             image: Jeans4,
//             brand: "Lee",
//             fit: "Bootcut",
//             color: "Medium Blue",
//             size: "28-40"
//         },
//         {
//             id: 5,
//             name: "Premium Selvedge",
//             price: "R1599.99",
//             image: Jeans5,
//             brand: "Nudie",
//             fit: "Regular",
//             color: "Raw Denim",
//             size: "30-38"
//         },
//         {
//             id: 6,
//             name: "Stretch Skinny Fit",
//             price: "R819.99",
//             image: Jeans6,
//             brand: "G-Star",
//             fit: "Skinny",
//             color: "Grey",
//             size: "26-36"
//         }
//     ];

//     return (
//         <div className="category-page">
//             <div className="container">
//                 <div className="category-header">
//                     <h1 className="section-title">Designer Jeans</h1>
//                     <p className="page-subtitle">From Classic to Trend-Setting Fits - Premium Denim Collection</p>
//                 </div>

//                 <div className="filters-section">
//                     <div className="filter-group">
//                         <h4>Fit</h4>
//                         <div className="filter-options">
//                             <button className="filter-btn active">All</button>
//                             <button className="filter-btn">Skinny</button>
//                             <button className="filter-btn">Slim</button>
//                             <button className="filter-btn">Straight</button>
//                             <button className="filter-btn">Bootcut</button>
//                         </div>
//                     </div>
//                     <div className="filter-group">
//                         <h4>Brand</h4>
//                         <div className="filter-options">
//                             <button className="filter-btn">All Brands</button>
//                             <button className="filter-btn">Levi's</button>
//                             <button className="filter-btn">Diesel</button>
//                             <button className="filter-btn">Wrangler</button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="product-grid">
//                     {jeansProducts.map(product => (
//                         <div key={product.id} className="product-card">
//                             <div className="product-img">
//                                 <img src={product.image} alt={product.name} />
//                                 <span className="brand-badge">{product.brand}</span>
//                             </div>
//                             <div className="product-info">
//                                 <h3 className="product-title">{product.name}</h3>
//                                 <div className="product-details">
//                                     <span className="detail">Fit: {product.fit}</span>
//                                     <span className="detail">Color: {product.color}</span>
//                                     <span className="detail">Sizes: {product.size}</span>
//                                 </div>
//                                 <p className="product-price">{product.price}</p>
//                                 <div className="product-actions">
//                                     <button className="btn btn-accent">Add to Cart</button>
//                                     <button className="btn btn-outline">View Sizes</button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Jeans;