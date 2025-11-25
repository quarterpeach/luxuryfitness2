import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './Memberships.css';

const Memberships = () => {
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subscribing, setSubscribing] = useState(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        fetchMemberships();
    }, []);

    const fetchMemberships = async () => {
        try {
            const response = await api.get('/memberships');
            setMemberships(response.data.memberships);
        } catch (error) {
            console.error('Error fetching memberships:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = async (membershipId) => {
        if (!isAuthenticated) {
            window.location.href = '/login';
            return;
        }

        setSubscribing(membershipId);
        try {
            await api.post('/memberships/subscribe', { membership_id: membershipId });
            alert('Successfully subscribed! Check your dashboard.');
            window.location.href = '/dashboard';
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to subscribe');
        } finally {
            setSubscribing(null);
        }
    };
 

    const getMembershipImage = (tier) => {
        const images = {
            'basic': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop&q=80',
            'standard': 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=400&fit=crop&q=80',
            'elite': 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&h=400&fit=crop&q=80'
        };
        return images[tier] || images['basic'];
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="memberships-page">
            <div className="membership-hero" style={{ backgroundImage: "url('/assets/images/membership-hero.png')" }}>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        MEMBERSHIP
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        START YOUR JOURNEY WITH US
                    </motion.p>
                </div>
            </div>

            <section className="section plans-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-subtitle">FIND THE PERFECT PLAN FOR YOURSELF</span>
                        <h2>CHOOSE YOUR ACCESS</h2>
                    </div>

                    <div className="memberships-grid">
                        {memberships?.map((membership, index) => (
                            <motion.div
                                key={membership.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15 }}
                                className={`membership-card ${membership.tier === 'elite' ? 'featured' : ''}`}
                            >
                                {membership?.tier === 'elite' && (
                                    <div className="featured-badge">MOST POPULAR</div>
                                )}

                                <div className="membership-image"
                                    style={{
                                        backgroundImage: `url(${getMembershipImage(membership.tier)})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <div className="image-overlay"></div>
                                </div>

                                <div className="card-header">
                                    <h3>{membership?.name}</h3>
                                    <div className="price-container">
                                        <span className="currency">USD</span>
                                        <span className="amount">{membership?.price}</span>
                                        <span className="period">/mo</span>
                                    </div>
                                    <p className="description">{membership?.description}</p>
                                </div>

                                {/* <div className="card-features">
                                    {JSON.parse(membership.features)?.map((feature, idx) => (
                                        <div key={idx} className="feature-item">
                                            <FiCheck className="check-icon" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div> */}

                                <div className="card-footer">
                                    <button
                                        onClick={() => handleSubscribe(membership?.id)}
                                        className={`btn ${membership.tier === 'elite' ? 'btn-primary' : 'btn-outline'} w-full`}
                                        disabled={subscribing === membership?.id}
                                    >
                                        {subscribing === membership.id ? 'Processing...' : 'Join Now'}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Memberships;
