import './footer.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo/logo.png'; 

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const socialPlatforms = [
        { name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/GirlfriendYaBabe' },
        { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/kgosatsana.ya.koeneng/' },
        { name: 'TikTok', icon: 'fab fa-tiktok', url: 'https://www.tiktok.com/@kgosatsanayakoeneng0' }
    ];

    return (
        <footer className="footer">
            <div className="footer__core">
                <div className="footer__brand">
                    <Link to="/" className="footer__logo-link">
                        <img 
                            src={Logo} 
                            alt="Ke Pabala Aesthetics" 
                            className="footer__logo-img"
                        />
                    </Link>
                    <p className="footer__tagline">
                        Curated quality in hair, technology, and denim.
                    </p>
                </div>

                <div className="footer__nav-group">
                    <nav className="footer__nav">
                        <span className="footer__nav-heading">Shop</span>
                        <a href="/hair">Hair</a>
                        <a href="/iphones">iPhones</a>
                        <a href="/jeans">Jeans</a>
                    </nav>
                    <nav className="footer__nav">
                        <span className="footer__nav-heading">Support</span>
                        <a href="/contactus">Contact</a>
                        <a href="/shippingreturns">Shipping</a>
                        <a href="/faq">FAQ</a>
                    </nav>
                </div>

                <div className="footer__subscribe">
                    <span className="footer__nav-heading">Stay Updated</span>
                    <p>Receive exclusive offers and styling insights.</p>
                    <form className="subscribe__form">
                        <input
                            type="email"
                            placeholder="Your email"
                            aria-label="Email for newsletter"
                            required
                        />
                        <button type="submit" aria-label="Subscribe">
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </form>
                </div>
            </div>

            <div className="footer__base">
                <div className="footer__copyright">
                    <p>&copy; {currentYear} Ke Pabala Aesthetics. All rights reserved.</p>
                </div>
                <div className="footer__base-social">
                    {socialPlatforms.map((platform) => (
                        <a
                            key={platform.name}
                            href={platform.url}
                            aria-label={`Follow us on ${platform.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="base-social__icon"
                        >
                            <i className={platform.icon}></i>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;