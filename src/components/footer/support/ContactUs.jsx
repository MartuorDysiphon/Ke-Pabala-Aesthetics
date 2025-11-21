import React, { useState } from 'react';
import './support.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Contact form submitted:', formData);
    };

    return (
        <div className="content-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="section-title">Contact Us</h1>
                    <p className="page-subtitle">Get in touch with Ke Pabala Aesthetics</p>
                </div>

                <div className="content-grid">
                    <div className="content-main">
                        <div className="content-card">
                            <h2 className="content-title">
                                <i className="fas fa-envelope"></i>
                                Send us a Message
                            </h2>
                            
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            placeholder="Your full name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Subject *</label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
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
                                    <div className="form-group full-width">
                                        <label>Message *</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            placeholder="Please describe your inquiry in detail..."
                                            rows="6"
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                                
                                <button type="submit" className="btn btn-accent">
                                    <i className="fas fa-paper-plane"></i>
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="content-sidebar">
                        <div className="info-card">
                            <h3 className="info-title">
                                <i className="fas fa-clock"></i>
                                Business Hours
                            </h3>
                            <div className="info-content">
                                <div className="info-row">
                                    <span>Monday - Friday</span>
                                    <span>8:00 AM - 6:00 PM</span>
                                </div>
                                <div className="info-row">
                                    <span>Saturday</span>
                                    <span>9:00 AM - 4:00 PM</span>
                                </div>
                                <div className="info-row">
                                    <span>Sunday</span>
                                    <span>Closed</span>
                                </div>
                            </div>
                        </div>

                        <div className="info-card">
                            <h3 className="info-title">
                                <i className="fas fa-phone"></i>
                                Contact Info
                            </h3>
                            <div className="info-content">
                                <div className="contact-item">
                                    <i className="fas fa-envelope"></i>
                                    <div>
                                        <strong>Email</strong>
                                        <p>info@kepabala.co.za</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <i className="fas fa-phone"></i>
                                    <div>
                                        <strong>Phone</strong>
                                        <p>071 234 5678</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <div>
                                        <strong>Address</strong>
                                        <p>123 Fashion District<br />Johannesburg, 2000</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="info-card">
                            <h3 className="info-title">
                                <i className="fas fa-comments"></i>
                                Quick Responses
                            </h3>
                            <div className="info-content">
                                <p>We typically respond to all inquiries within 24 hours during business days.</p>
                                <p>For urgent order issues, please include your order number in the message.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;