import React, { useState } from 'react';
import './support.css';

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState('general');
    const [openItems, setOpenItems] = useState({});

    const toggleItem = (id) => {
        setOpenItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const faqCategories = {
        general: [
            {
                id: 'gen-1',
                question: 'What are your business hours?',
                answer: 'We are open Monday to Friday from 8:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 4:00 PM. We are closed on Sundays and public holidays.'
            },
            {
                id: 'gen-2',
                question: 'Do you have a physical store?',
                answer: 'Currently we operate as an online store only. This allows us to keep our prices competitive while maintaining the highest quality standards.'
            },
            {
                id: 'gen-3',
                question: 'How can I track my order?',
                answer: 'Once your order is shipped, you will receive a tracking number via email and SMS. You can use this number to track your package on our website or the courier\'s website.'
            }
        ],
        products: [
            {
                id: 'prod-1',
                question: 'Are your hair products 100% human hair?',
                answer: 'Yes, all our hair products are made from 100% premium human hair. We source the highest quality hair that can be styled, colored, and treated just like natural hair.'
            },
            {
                id: 'prod-2',
                question: 'Can I color or bleach the hair?',
                answer: 'Yes, our hair can be colored and bleached. However, we recommend consulting with a professional stylist and performing a strand test first. Custom colored pieces cannot be returned.'
            },
            {
                id: 'prod-3',
                question: 'What is the difference between Double Drawn and SDD hair?',
                answer: 'Double Drawn hair has had shorter strands removed once, creating a fuller look. SDD (Super Double Drawn) has been processed twice, removing even more shorter strands for maximum fullness and minimal shedding.'
            },
            {
                id: 'prod-4',
                question: 'Do you offer custom hair colors?',
                answer: 'Yes, we offer custom coloring services for an additional R100. Please allow 2-3 extra business days for custom colored orders.'
            }
        ],
        orders: [
            {
                id: 'order-1',
                question: 'How long does order processing take?',
                answer: 'Orders are processed within 24-48 hours after payment confirmation. Custom items may take 2-3 additional business days.'
            },
            {
                id: 'order-2',
                question: 'Can I modify or cancel my order?',
                answer: 'Orders can be modified or cancelled within 2 hours of placement. After this period, orders enter processing and cannot be changed. Contact us immediately if you need to make changes.'
            },
            {
                id: 'order-3',
                question: 'Do you offer international shipping?',
                answer: 'Currently we only ship within South Africa. We are working on expanding our shipping options in the future.'
            }
        ],
        payments: [
            {
                id: 'pay-1',
                question: 'What payment methods do you accept?',
                answer: 'We accept Bank Transfer, Capitec to Capitec, PayShap, and offer Layby payment plans. All payments are secure and processed without storing your banking details.'
            },
            {
                id: 'pay-2',
                question: 'How does the Layby payment plan work?',
                answer: 'Layby allows you to pay for your order over 3 months. A 20% deposit is required to start, followed by monthly payments. Your items are reserved until final payment is made.'
            },
            {
                id: 'pay-3',
                question: 'When will my payment be confirmed?',
                answer: 'Bank transfers are confirmed within 24 hours. Capitec to Capitec and PayShap payments are confirmed almost instantly. You will receive email confirmation once payment is verified.'
            }
        ],
        shipping: [
            {
                id: 'ship-1',
                question: 'What are your shipping options and costs?',
                answer: 'We offer Standard (R60, 7-9 days), Express (R110, 3-5 days), and Priority (R200, 1-2 days) shipping. All options include tracking and insurance.'
            },
            {
                id: 'ship-2',
                question: 'Do you ship to PO Boxes?',
                answer: 'Yes, we ship to PO Boxes via the South African Post Office. However, for faster and more reliable delivery, we recommend using a physical address with our courier services.'
            },
            {
                id: 'ship-3',
                question: 'What if I\'m not home when delivery arrives?',
                answer: 'The courier will attempt delivery twice. After two failed attempts, your package will be held at the nearest depot for collection. You will receive notification with collection details.'
            }
        ],
        returns: [
            {
                id: 'ret-1',
                question: 'What is your return policy?',
                answer: 'We offer a 14-day return policy from delivery date. Items must be unused, in original condition with tags attached, and in original packaging.'
            },
            {
                id: 'ret-2',
                question: 'How long do refunds take?',
                answer: 'Refunds are processed within 5-7 business days after we receive and inspect the returned items. The refund will be issued to the original payment method.'
            },
            {
                id: 'ret-3',
                question: 'Who pays for return shipping?',
                answer: 'For returns due to our error or defective products, we cover return shipping costs. For change-of-mind returns, customers are responsible for return shipping costs.'
            }
        ]
    };

    const categories = [
        { id: 'general', name: 'General', icon: 'info-circle' },
        { id: 'products', name: 'Products', icon: 'tshirt' },
        { id: 'orders', name: 'Orders', icon: 'shopping-bag' },
        { id: 'payments', name: 'Payments', icon: 'credit-card' },
        { id: 'shipping', name: 'Shipping', icon: 'truck' },
        { id: 'returns', name: 'Returns', icon: 'undo' }
    ];

    return (
        <div className="faq-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-title">Frequently Asked Questions</h1>
                    <p className="page-subtitle">Find answers to common questions about our products and services</p>
                </div>

                <div className="faq-content">
                    <div className="faq-sidebar">
                        <div className="category-filters">
                            <h3>Categories</h3>
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(category.id)}
                                >
                                    <i className={`fas fa-${category.icon}`}></i>
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        <div className="support-cta">
                            <h4>Still need help?</h4>
                            <p>Can't find the answer you're looking for? Our support team is here to help.</p>
                            <button className="btn btn-accent">
                                <i className="fas fa-envelope"></i>
                                Contact Support
                            </button>
                        </div>
                    </div>

                    <div className="faq-main">
                        <div className="faq-category">
                            <h2 className="faq-category-title">
                                <i className={`fas fa-${categories.find(c => c.id === activeCategory)?.icon}`}></i>
                                {categories.find(c => c.id === activeCategory)?.name} Questions
                            </h2>
                            
                            <div className="faq-items">
                                {faqCategories[activeCategory]?.map(item => (
                                    <div key={item.id} className="faq-item">
                                        <button 
                                            className="faq-question"
                                            onClick={() => toggleItem(item.id)}
                                        >
                                            <span>{item.question}</span>
                                            <i className={`fas fa-chevron-${openItems[item.id] ? 'up' : 'down'}`}></i>
                                        </button>
                                        {openItems[item.id] && (
                                            <div className="faq-answer">
                                                <p>{item.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="quick-help">
                            <h3>Quick Help Resources</h3>
                            <div className="help-links">
                                <a href="/shippingreturns" className="help-link">
                                    <i className="fas fa-shipping-fast"></i>
                                    Shipping & Delivery Info
                                </a>
                                <a href="/paymentmethods" className="help-link">
                                    <i className="fas fa-credit-card"></i>
                                    Payment Methods
                                </a>
                                <a href="/contactus" className="help-link">
                                    <i className="fas fa-headset"></i>
                                    Contact Customer Service
                                </a>
                                {/* <a href="/track-order" className="help-link">
                                    <i className="fas fa-map-marker-alt"></i>
                                    Track Your Order
                                </a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;