import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiStar } from 'react-icons/fi';
import api from '../api/axios';
import './Home.css';

const Home = () => {
    const [memberships, setMemberships] = useState([]);
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        fetchData
    }, []);

    async function fetchData (){
        try {
            const [membershipsRes, trainersRes] = await Promise.all([
                api.get('/memberships'),
                api.get('/trainers')
            ]);
            setMemberships(membershipsRes.data.memberships.slice(0, 3));
            setTrainers(trainersRes.data.trainers.slice(0, 3));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
   

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-text"
                    >
                        <span className="hero-subtitle">ELEVATE YOUR FITNESS</span>
                        <h1 className="hero-title">
                            Where Luxury Meets
                            <span className="text-primary"> Performance</span>
                        </h1>
                        <p className="hero-description">
                            Experience the pinnacle of fitness excellence with our world-class trainers,
                            state-of-the-art facilities, and exclusive wellness programs designed for the elite.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/memberships" className="btn btn-primary btn-lg">
                                Explore Memberships <FiArrowRight />
                            </Link>
                            <Link to="/trainers" className="btn btn-secondary btn-lg">
                                Meet Our Trainers
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section features-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">WHY CHOOSE US</span>
                        <h2>The Ultimate Fitness Experience</h2>
                    </div>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="feature-card"
                            >
                                <div className="feature-icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Memberships Section */}
            <section className="section memberships-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">PRICING PLANS</span>
                        <h2>Choose Your Elite Experience</h2>
                        <p>Select the perfect membership tier for your fitness journey</p>
                    </div>

                    <div className="grid grid-3">
                        {memberships.map((membership, index) => (
                            <motion.div
                                key={membership.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className={`membership-card ${membership.tier === 'elite' ? 'featured' : ''}`}
                            >
                                {membership.tier === 'elite' && (
                                    <div className="featured-badge">MOST POPULAR</div>
                                )}
                                <div className="membership-header">
                                    <h3>{membership.name}</h3>
                                    <div className="membership-price">
                                        <span className="price-currency">$</span>
                                        <span className="price-amount">{membership.price}</span>
                                        <span className="price-period">/month</span>
                                    </div>
                                    <p className="membership-description">{membership.description}</p>
                                </div>
                                <div className="membership-features">
                                    {JSON.parse(membership.features).map((feature, idx) => (
                                        <div key={idx} className="feature-item">
                                            <FiCheck className="check-icon" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link to="/memberships" className="btn btn-primary w-full">
                                    Get Started
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trainers Section */}
            <section className="section trainers-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">EXPERT GUIDANCE</span>
                        <h2>World-Class Trainers</h2>
                        <p>Train with certified professionals dedicated to your success</p>
                    </div>

                    <div className="grid grid-3">
                        {trainers.map((trainer, index) => (
                            <motion.div
                                key={trainer.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="trainer-card"
                            >
                                <div className="trainer-image-wrapper">
                                    <div className="trainer-image-placeholder">
                                        {trainer.first_name[0]}{trainer.last_name[0]}
                                    </div>
                                </div>
                                <div className="trainer-info">
                                    <h3>{trainer.full_name}</h3>
                                    <p className="trainer-specialization">{trainer.specialization}</p>
                                    <div className="trainer-rating">
                                        <FiStar className="star-icon filled" />
                                        <span>{trainer.rating.toFixed(1)}</span>
                                        <span className="text-gray">({trainer.total_sessions} sessions)</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-xl">
                        <Link to="/trainers" className="btn btn-secondary btn-lg">
                            View All Trainers <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="cta-content"
                    >
                        <h2>Ready to Transform Your Life?</h2>
                        <p>Join the elite community and start your journey to peak performance today</p>
                        <Link to="/register" className="btn btn-primary btn-lg">
                            Start Your Free Trial <FiArrowRight />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

const features = [
    {
        icon: '🏆',
        title: 'Elite Facilities',
        description: 'State-of-the-art equipment and luxurious amenities designed for your comfort and performance.'
    },
    {
        icon: '💪',
        title: 'Expert Trainers',
        description: 'Certified professionals with years of experience helping clients achieve extraordinary results.'
    },
    {
        icon: '📊',
        title: 'Personalized Programs',
        description: 'Custom workout and nutrition plans tailored to your unique goals and lifestyle.'
    },
    {
        icon: '🌟',
        title: 'Exclusive Classes',
        description: 'Access to premium group fitness classes and specialized training sessions.'
    },
    {
        icon: '🧘',
        title: 'Wellness Services',
        description: 'Spa, massage therapy, and recovery services to optimize your overall wellbeing.'
    },
    {
        icon: '🎯',
        title: 'Results Driven',
        description: 'Proven methodologies and continuous support to ensure you reach your fitness goals.'
    }
];

export default Home;
