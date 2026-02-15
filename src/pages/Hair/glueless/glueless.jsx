// glueless.jsx - COMPACT MONOCHROMATIC 100vh WITH FONT AWESOME
import React, { useState, useEffect } from "react";
import "./glueless.css";

function Glueless() {
    const [timeLeft, setTimeLeft] = useState({
        days: 30,
        hours: 12,
        minutes: 45,
        seconds: 30
    });

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format numbers with leading zeros
    const formatNumber = (num) => {
        return num.toString().padStart(2, '0');
    };

    return (
        <div className="glueless__container">
            {/* Font Awesome CDN */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            
            {/* Main Content */}
            <div className="glueless__content">
                {/* Badge */}
                <div className="glueless__badge">
                    <i className="fas fa-clock" style={{ marginRight: '8px' }}></i>
                    COMING SOON
                </div>

                {/* Title */}
                <h1 className="glueless__title">
                    GLUELESS
                    <span>WIGS & FRONTALS</span>
                </h1>

                {/* Description */}
                <p className="glueless__description">
                    No adhesive. No damage. Just pure perfection.
                </p>

                {/* Countdown Timer */}
                <div className="glueless__countdown">
                    <div className="glueless__countdown-item">
                        <div className="glueless__countdown-value">{formatNumber(timeLeft.days)}</div>
                        <div className="glueless__countdown-label">Days</div>
                    </div>
                    <div className="glueless__countdown-item">
                        <div className="glueless__countdown-value">{formatNumber(timeLeft.hours)}</div>
                        <div className="glueless__countdown-label">Hours</div>
                    </div>
                    <div className="glueless__countdown-item">
                        <div className="glueless__countdown-value">{formatNumber(timeLeft.minutes)}</div>
                        <div className="glueless__countdown-label">Minutes</div>
                    </div>
                    <div className="glueless__countdown-item">
                        <div className="glueless__countdown-value">{formatNumber(timeLeft.seconds)}</div>
                        <div className="glueless__countdown-label">Seconds</div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="glueless__features">
                    <div className="glueless__feature">
                        <i className="fas fa-ban glueless__feature-icon"></i>
                        <h3 className="glueless__feature-title">No Glue</h3>
                    </div>
                    <div className="glueless__feature">
                        <i className="fas fa-bolt glueless__feature-icon"></i>
                        <h3 className="glueless__feature-title">Instant Install</h3>
                    </div>
                    <div className="glueless__feature">
                        <i className="fas fa-eye glueless__feature-icon"></i>
                        <h3 className="glueless__feature-title">Natural Look</h3>
                    </div>
                    <div className="glueless__feature">
                        <i className="fas fa-sync-alt glueless__feature-icon"></i>
                        <h3 className="glueless__feature-title">Versatile</h3>
                    </div>
                </div>

                {/* Newsletter Section */}
                <form 
                    action="https://formspree.io/f/mlgwbwnw" 
                    method="POST"
                    className="glueless__newsletter"
                >
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email address" 
                        aria-label="Email for Glueless Notifications"
                        className="glueless__newsletter-input"
                    />
                    <button type="submit" className="glueless__newsletter-button">
                        <i className="fas fa-bell" style={{ marginRight: '8px' }}></i>
                        Notify Me
                    </button>
                </form>

                {/* Social Links */}
                <div className="glueless__social">
                    <button className="glueless__social-link" aria-label="Instagram">
                        <i className="fab fa-instagram"></i>
                    </button>
                    <button className="glueless__social-link" aria-label="Facebook">
                        <i className="fab fa-facebook-f"></i>
                    </button>
                    <button className="glueless__social-link" aria-label="TikTok">
                        <i className="fab fa-tiktok"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Glueless;