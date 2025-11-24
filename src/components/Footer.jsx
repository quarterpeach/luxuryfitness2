import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand Section */}
                    <div className="footer-section">
                        <h3 className="footer-brand">LUXURY<span className="text-primary">FITNESS</span></h3>
                        <p className="footer-description">
                            Experience the epitome of luxury fitness. Transform your body and elevate your lifestyle with our premium wellness programs.
                        </p>
                        <div className="social-links">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FiInstagram size={20} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FiFacebook size={20} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FiTwitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/memberships">Memberships</Link></li>
                            <li><Link to="/workouts">Workouts</Link></li>
                            <li><Link to="/trainers">Trainers</Link></li>
                            <li><Link to="/classes">Classes</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="footer-section">
                        <h4 className="footer-title">Support</h4>
                        <ul className="footer-links">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-section">
                        <h4 className="footer-title">Contact Us</h4>
                        <ul className="footer-contact">
                            <li>
                                <FiMapPin size={16} />
                                <span>123 Luxury Lane, Elite City</span>
                            </li>
                            <li>
                                <FiPhone size={16} />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li>
                                <FiMail size={16} />
                                <span>info@luxuryfitness.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Luxury Fitness. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <span>•</span>
                        <Link to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
