import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/memberships', label: 'Memberships' },
        { to: '/workouts', label: 'Workouts' },
        { to: '/trainers', label: 'Trainers' },
        { to: '/classes', label: 'Classes' },
    ];

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-logo">
                        <h2 className="logo-text">LUXURY<span className="text-primary">FITNESS</span></h2>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="navbar-links">
                        {navLinks.map((link) => (
                            <Link key={link.to} to={link.to} className="nav-link">
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="navbar-actions">
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="btn btn-ghost btn-sm">
                                    <FiUser /> Dashboard
                                </Link>
                                <button onClick={handleLogout} className="btn btn-primary btn-sm">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-ghost btn-sm">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-primary btn-sm">
                                    Join Now
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mobile-menu-content">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="mobile-nav-link"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="mobile-auth-buttons">
                                {isAuthenticated ? (
                                    <>
                                        <Link
                                            to="/dashboard"
                                            className="btn btn-ghost w-full"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <button onClick={handleLogout} className="btn btn-primary w-full">
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="btn btn-ghost w-full"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="btn btn-primary w-full"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Join Now
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
