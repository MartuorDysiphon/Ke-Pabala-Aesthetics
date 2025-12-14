import React, { useState } from 'react';
import './support.css';

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState('general');
    const [openItems, setOpenItems] = useState({});

    const toggleItem = (id) => {
        setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const faqData = {
        general: [
            { id: 'gen-1', q: 'What are your business hours?', a: 'We are open Monday to Friday from 8:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 4:00 PM. We are closed on Sundays and public holidays.' },
            { id: 'gen-2', q: 'Do you have a physical store?', a: 'Currently we operate as an online store only. This allows us to keep our prices competitive while maintaining the highest quality standards.' },
            { id: 'gen-3', q: 'How can I track my order?', a: "Once your order is shipped, you will receive a tracking number via email and SMS. You can use this number to track your package on our website or the courier's website." }
        ],
        products: [
            { id: 'prod-1', q: 'Are your hair products 100% human hair?', a: 'Yes, all our hair products are made from 100% premium human hair. We source the highest quality hair that can be styled, colored, and treated just like natural hair.' },
            { id: 'prod-2', q: 'Can I color or bleach the hair?', a: 'Yes, our hair can be colored and bleached. However, we recommend consulting with a professional stylist and performing a strand test first. Custom colored pieces cannot be returned.' },
            { id: 'prod-3', q: 'What is the difference between Double Drawn and SDD hair?', a: 'Double Drawn hair has had shorter strands removed once, creating a fuller look. SDD (Super Double Drawn) has been processed twice, removing even more shorter strands for maximum fullness and minimal shedding.' }
        ],
        orders: [
            { id: 'order-1', q: 'How long does order processing take?', a: 'Orders are processed within 24-48 hours after payment confirmation. Custom items may take 2-3 additional business days.' },
            { id: 'order-2', q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 2 hours of placement. After this period, orders enter processing and cannot be changed. Contact us immediately if you need to make changes.' },
            { id: 'order-3', q: 'Do you offer international shipping?', a: 'Currently we only ship within South Africa. We are working on expanding our shipping options in the future.' }
        ]
    };

    const categories = [
        { id: 'general', name: 'General', icon: 'info-circle' },
        { id: 'products', name: 'Products', icon: 'tshirt' },
        { id: 'orders', name: 'Orders', icon: 'shopping-bag' }
    ];

    return (
        <div className="support-page">
            <div className="support-container">
                <div className="support-header">
                    <h1 className="support-title">Frequently Asked Questions</h1>
                    <p className="support-subtitle">Find answers to common questions about our products and services</p>
                </div>

                <div className="faq-layout">
                    <div className="faq-sidebar">
                        <div className="faq-categories">
                            <h3>Categories</h3>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat.id)}
                                >
                                    <i className={`fas fa-${cat.icon}`}></i>
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="faq-main">
                        <div className="support-card">
                            <h2 className="faq-category-title">
                                <i className={`fas fa-${categories.find(c => c.id === activeCategory)?.icon}`}></i>
                                {categories.find(c => c.id === activeCategory)?.name} Questions
                            </h2>
                            
                            <div className="faq-items">
                                {faqData[activeCategory]?.map(item => (
                                    <div key={item.id} className="faq-item">
                                        <button 
                                            className="faq-question"
                                            onClick={() => toggleItem(item.id)}
                                        >
                                            <span>{item.q}</span>
                                            <i className={`fas fa-chevron-${openItems[item.id] ? 'up' : 'down'}`}></i>
                                        </button>
                                        {openItems[item.id] && (
                                            <div className="faq-answer">
                                                <p>{item.a}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="quick-links">
                            <h3>Quick Help Resources</h3>
                            <div className="links-grid">
                                <a href="/shippingreturns" className="link-item">
                                    <i className="fas fa-shipping-fast"></i>
                                    Shipping Info
                                </a>
                                <a href="/contactus" className="link-item">
                                    <i className="fas fa-headset"></i>
                                    Contact Support
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;