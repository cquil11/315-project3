import React, { useContext } from 'react';
import { ThemeContext } from '../../../App';
import './Footer.css';
const Footer = () => {
    const {theme}  = useContext(ThemeContext)
    return (
        <footer className={theme === 'light' ? 'footer-style': 'footer-style-dark'}>
            <p><small>All picture rights reserved by Chick-Fil-A, the rest is Team 1 ©</small></p>
        </footer>
    );
};

export default Footer;