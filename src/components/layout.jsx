import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';

const Layout = () => {
    return (
        <div className="layout">
            <Navbar />
            <main className="layout-main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;