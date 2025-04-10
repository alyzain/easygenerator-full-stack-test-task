import { JSX } from 'react';
import '../styles/components/footer.css';

const Footer = (): JSX.Element => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>Easygenerator Awesome Authentication App</p>
                <p>© 2025 All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;