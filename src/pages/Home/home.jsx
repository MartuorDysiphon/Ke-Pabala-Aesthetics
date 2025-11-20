import { Link } from 'react-router-dom';
import './home.css';

import Blondie from '../../assets/Home/blondie.jpg';
import SddBabyCurls from '../../assets/Home/sdd baby curls.jpg';
import Iphone11Pro from '../../assets/Home/iphone 11 pro.jpg';
import DonorHair from '../../assets/Hair/donor1.jpg';
import CurlyHair from '../../assets/Hair/curly1.jpg';
import SddCurls from '../../assets/Hair/sdd baby curls.jpg';
import Iphone from '../../assets/Iphones/iphone xr.jpg';

const Home = () => {
    return (
        <>
            <section className="hero">
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1>Curated Quality, Defined Style.</h1>
                        <p>Discover the perfect blend of technology and fashion. Ke Pabala Aesthetics brings you premium human hair, the latest iPhones, and designer denim all in one place.</p>
                        <Link to="/hair" className="btn btn-accent">Explore the Trends</Link>
                    </div>
                    <div className="hero-image-wrapper">
                        <div className="hero__img">
                            <img src={Blondie} alt="Fashion showcase" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="categories" id="categories">
                <div className="container">
                    <h2 className="section-title">Shop By Category</h2>
                    <div className="category-grid">
                        <Link to="/hair" className="category-card">
                            <div className="category-image" style={{ backgroundColor: '#c4a287', height: '100%' }}>
                                <img src={SddBabyCurls} alt="Luxury Hair" />
                            </div>
                            <div className="category-card-content">
                                <h3>Luxury Hair</h3>
                                <p>100% Human Hair, Various Textures</p>
                            </div>
                        </Link>
                        <Link to="/iphones" className="category-card">
                            <div className="category-image" style={{ backgroundColor: '#a3c9b8', height: '100%' }}>
                                <img src={Iphone11Pro} alt="Latest iPhones" />
                            </div>
                            <div className="category-card-content">
                                <h3>Latest iPhones</h3>
                                <p>Unlocked & Certified Refurbished</p>
                            </div>
                        </Link>
                        <Link to="/jeans" className="category-card">
                            <div className="category-image">
                                <div style={{ backgroundColor: '#2a2a2a', height: '100%' }}></div>
                            </div>
                            <div className="category-card-content">
                                <h3>Designer Jeans</h3>
                                <p>From Classic to Trend-Setting Fits</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="Home__products">
                <div className="container">
                    <h2 className="section-title">Featured This Week</h2>
                    <div className="Home__product-grid">
                        <div className="Home__product-card">
                            <div className="Home__product-img">
                                <img src={DonorHair} alt="Matladi Donor Hair" />
                            </div>
                            <div className="Home__product-info">
                                <h3 className="Home__product-title">Matladi Donor Hair</h3>
                                <p className="Home__product-price">From R1189.99</p>
                            </div>
                        </div>
                        <div className="Home__product-card">
                            <div className="Home__product-img">
                                <img src={CurlyHair} alt="Faith Wave Curls" />
                            </div>
                            <div className="Home__product-info">
                                <h3 className="Home__product-title">Faith Wave Curls</h3>
                                <p className="Home__product-price">From R619.99</p>
                            </div>
                        </div>
                        <div className="Home__product-card">
                            <div className="Home__product-img">
                                <img src={SddCurls} alt="SDD Baby Curls" />
                            </div>
                            <div className="Home__product-info">
                                <h3 className="Home__product-title">SDD Baby Curls</h3>
                                <p className="Home__product-price">From R899.99</p>
                            </div>
                        </div>
                        <div className="Home__product-card">
                            <div className="Home__product-img">
                                <img src={Iphone} alt="iPhone 11 Pro" />
                            </div>
                            <div className="Home__product-info">
                                <h3 className="Home__product-title">iPhone 11 Pro</h3>
                                <p className="Home__product-price">From R6399.99</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;