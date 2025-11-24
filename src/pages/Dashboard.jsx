import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiCalendar, FiAward, FiActivity } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import './Dashboard.css';

const Dashboard = () => {
    const { user, isAuthenticated } = useAuth();
    const [subscription, setSubscription] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            fetchDashboardData();
        }
    }, [isAuthenticated]);

    const fetchDashboardData = async () => {
        try {
            const [subRes, bookingsRes] = await Promise.all([
                api.get('/memberships/my/subscription'),
                api.get('/bookings/my-bookings')
            ]);
            setSubscription(subRes.data.subscription);
            setBookings(bookingsRes.data.bookings);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="container dashboard-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="dashboard-header"
                >
                    <div>
                        <h1>Welcome back, {user?.first_name}!</h1>
                        <p className="text-gray">Track your fitness journey and manage your memberships</p>
                    </div>
                </motion.div>

                <div className="dashboard-grid">
                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="dashboard-card profile-card"
                    >
                        <div className="card-header">
                            <FiUser className="card-icon" />
                            <h3>Profile Information</h3>
                        </div>
                        <div className="profile-info">
                            <div className="profile-item">
                                <span className="label">Name:</span>
                                <span className="value">{user?.first_name} {user?.last_name}</span>
                            </div>
                            <div className="profile-item">
                                <span className="label">Email:</span>
                                <span className="value">{user?.email}</span>
                            </div>
                            {user?.phone && (
                                <div className="profile-item">
                                    <span className="label">Phone:</span>
                                    <span className="value">{user.phone}</span>
                                </div>
                            )}
                            <div className="profile-item">
                                <span className="label">Role:</span>
                                <span className="value badge badge-gold">{user?.role}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Membership Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="dashboard-card membership-card"
                    >
                        <div className="card-header">
                            <FiAward className="card-icon" />
                            <h3>Active Membership</h3>
                        </div>
                        {subscription ? (
                            <div className="membership-info">
                                <h4>{subscription.name}</h4>
                                <p className="tier-badge badge badge-gold">{subscription.tier.toUpperCase()}</p>
                                <div className="membership-dates">
                                    <div>
                                        <span className="label">Start Date:</span>
                                        <span className="value">{new Date(subscription.start_date).toLocaleDateString()}</span>
                                    </div>
                                    <div>
                                        <span className="label">End Date:</span>
                                        <span className="value">{new Date(subscription.end_date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="membership-status">
                                    <span className={`status-badge ${subscription.status}`}>
                                        {subscription.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="no-membership">
                                <p>No active membership</p>
                                <a href="/memberships" className="btn btn-primary btn-sm">
                                    Browse Memberships
                                </a>
                            </div>
                        )}
                    </motion.div>

                    {/* Bookings Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="dashboard-card bookings-card full-width"
                    >
                        <div className="card-header">
                            <FiCalendar className="card-icon" />
                            <h3>My Bookings</h3>
                        </div>
                        {bookings.length > 0 ? (
                            <div className="bookings-list">
                                {bookings.slice(0, 5).map((booking) => (
                                    <div key={booking.id} className="booking-item">
                                        <div className="booking-type">
                                            <FiActivity />
                                            <span>{booking.booking_type === 'class' ? 'Class' : 'Personal Training'}</span>
                                        </div>
                                        <div className="booking-details">
                                            {booking.class_name && <h4>{booking.class_name}</h4>}
                                            {booking.trainer_name && (
                                                <p className="text-primary">with {booking.trainer_name}</p>
                                            )}
                                            <div className="booking-date">
                                                {new Date(booking.booking_date).toLocaleDateString()} at {booking.start_time}
                                            </div>
                                        </div>
                                        <div className={`booking-status ${booking.status}`}>
                                            {booking.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-bookings">
                                <p>No bookings yet</p>
                                <a href="/classes" className="btn btn-secondary btn-sm">
                                    Browse Classes
                                </a>
                            </div>
                        )}
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="dashboard-card stats-card full-width"
                    >
                        <h3>Quick Stats</h3>
                        <div className="stats-grid">
                            <div className="stat-box">
                                <div className="stat-icon">
                                    <FiCalendar />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-value">{bookings.length}</span>
                                    <span className="stat-label">Total Bookings</span>
                                </div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-icon">
                                    <FiActivity />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-value">{bookings.filter(b => b.status === 'completed').length}</span>
                                    <span className="stat-label">Completed</span>
                                </div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-icon">
                                    <FiAward />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-value">{subscription ? subscription.tier : 'None'}</span>
                                    <span className="stat-label">Membership Tier</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
