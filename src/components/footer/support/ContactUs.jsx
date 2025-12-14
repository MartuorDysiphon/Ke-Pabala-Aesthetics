import React, { useState } from 'react';
import './support.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Contact form submitted:', formData);
    };

    return (
        <div className="support-page">
            <div className="support-container">
                <div className="support-header">
                    <h1 className="support-title">Contact Us</h1>
                    <p className="support-subtitle">Get in touch with Ke Pabala Aesthetics</p>
                </div>

                <div className="support-grid">
                    <div className="support-card">
                        <h2 className="faq-category-title">
                            <i className="fas fa-envelope"></i>
                            Send us a Message
                        </h2>
                        
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Subject</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="form-select"
                                    required
                                >
                                    <option value="">Select a subject</option>
                                    <option value="product-inquiry">Product Inquiry</option>
                                    <option value="order-support">Order Support</option>
                                    <option value="shipping-query">Shipping Query</option>
                                    <option value="returns">Returns & Exchanges</option>
                                    <option value="wholesale">Wholesale Inquiry</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="form-textarea"
                                    placeholder="Please describe your inquiry in detail..."
                                    required
                                ></textarea>
                            </div>
                            
                            <button type="submit" className="submit-btn">
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div className="support-card">
                        <div className="info-grid">
                            <div className="info-item">
                                <div className="info-icon">
                                    <i className="fas fa-clock"></i>
                                </div>
                                <div className="info-content">
                                    <h3>Business Hours</h3>
                                    <p>Mon-Sun: 8:00 AM - 5:00 PM</p>
                                </div>
                            </div>
                            
                            <div className="info-item">
                                <div className="info-icon">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div className="info-content">
                                    <h3>Email</h3>
                                    <p>pabalaaesthetics@gmail.com</p>
                                </div>
                            </div>
                            
                            <div className="info-item">
                                <div className="info-icon">
                                    <i className="fas fa-phone"></i>
                                </div>
                                <div className="info-content">
                                    <h3>Phone</h3>
                                    <p>071 234 5678</p>
                                </div>
                            </div>
                            
                            <div className="info-item">
                                <div className="info-icon">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="info-content">
                                    <h3>Address</h3>
                                    <p>KPA, Vanderbijlpark, 1900</p>
                                </div>
                            </div>
                        </div>

                        <div className="support-cta" style={{ background: '#f9f9f9', color: '#000', marginTop: '2rem' }}>
                            <h4>Quick Responses</h4>
                            <p>We typically respond to all inquiries within 24 hours during business days.</p>
                            <p>For urgent order issues, please include your order number in the message.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;