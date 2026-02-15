import React from 'react';
import { useNavigate } from 'react-router-dom';
import './hair.css';

import StraightCover from '../../assets/Hair/covers/straight cover.jpeg';
import CurlsCover from '../../assets/Hair/covers/curly cover.jpeg';
import GluelessCover from '../../assets/Hair/covers/glueless cover.jpeg';

const HairGateway = () => {
    const navigate = useNavigate();

    // Main hair type categories
    const hairTypeCategories = [
        {
            id: 'straight',
            title: 'Straight Hair',
            description: 'Sleek, smooth, timeless extensions for polished sophistication.',
            coverImage: StraightCover,
            colorTheme: '#667eea'
        },
        {
            id: 'curly',
            title: 'Curls & Waves',
            description: 'Bouncy curls, natural waves, and textured styles for dynamic movement.',
            coverImage: CurlsCover,
            colorTheme: '#f093fb'
        },
        {
            id: 'glueless',
            title: 'Glueless Wigs',
            description: 'Easy-wear, breathable wigs with no adhesive. Effortless elegance.',
            coverImage: GluelessCover,
            colorTheme: '#4facfe'
        }
    ];

    const handleHairTypeClick = (route) => {
        navigate(route);
    };

    return (
        <div className="hair-gateway-page">
            <div className="container">
                {/* Page Header */}
                <div className="gateway-header">
                    <h1 className="gateway-title">Premium Hair Collection</h1>
                    <p className="gateway-subtitle">Select a hair type to explore our curated collections</p>
                </div>

                {/* Hair Type Grid */}
                <div className="hairtype-grid">
                    {hairTypeCategories.map(category => (
                        <div 
                            key={category.id}
                            className="hairtype-card"
                            onClick={() => handleHairTypeClick(`/${category.id}`)}
                            style={{ '--theme-color': category.colorTheme }}
                        >
                            <div className="card-visual">
                                <div className="card-gradient"></div>
                                <img 
                                    src={category.coverImage} 
                                    alt={category.title}
                                    className="card-image"
                                    loading="lazy"
                                />
                                <div className="card-overlay"></div>
                            </div>
                            
                            <div className="card-content">
                                <h3 className="card-title">{category.title}</h3>
                                <p className="card-description">{category.description}</p>
                                
                                <div className="card-action">
                                    <button className="explore-button">
                                        <span>Explore Collection</span>
                                        <svg className="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HairGateway;