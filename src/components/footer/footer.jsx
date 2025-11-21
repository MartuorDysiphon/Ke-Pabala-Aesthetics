import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col">
                        <h4>Ke Pabala Aesthetics</h4>
                        <p>Your trusted destination for curated quality in hair, technology, and denim.</p>
                    </div>
                    <div className="footer-col">
                        <h4>Shop</h4>
                        <ul className="footer-links">
                            <li><a href="/hair">All Hair</a></li>
                            <li><a href="/iphones">All iPhones</a></li>
                            <li><a href="/jeans">All Jeans</a></li>
                            <li><a href="/">New Arrivals</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Support</h4>
                        <ul className="footer-links">
                            <li><a href="/contactus">Contact Us</a></li>
                            <li><a href="/shippingreturns">Shipping & Returns</a></li>
                            <li><a href="/paymentmethods">Payment Methods</a></li>
                            <li><a href="/faq">FAQ</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Stay Connected</h4>
                        <p>Subscribe for exclusive offers and styling tips.</p>
                        <form style={{ marginTop: '0.5rem' }}>
                            <input 
                                type="email" 
                                placeholder="Your email" 
                                style={{ 
                                    padding: '0.5rem', 
                                    border: 'none', 
                                    borderRadius: '4px', 
                                    width: '70%' 
                                }} 
                            />
                            <button 
                                type="submit" 
                                className="btn" 
                                style={{ 
                                    padding: '0.5rem 1rem', 
                                    marginLeft: '0.5rem' 
                                }}
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>
                <div className="copyright text-center">
                    <p>&copy; 2025 Ke Pabala Aesthetics. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;