import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiUsers, FiMapPin } from 'react-icons/fi';
import api from '../api/axios';
import './Classes.css';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await api.get('/classes?upcoming=true');
            setClasses(response.data.classes);
        } catch (error) {
            console.error('Error fetching classes:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDuration = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const duration = (endDate - startDate) / (1000 * 60); // minutes
        return `${duration} min`;
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="classes-page">
            <div className="classes-hero" style={{ backgroundImage: "url('/assets/images/workout-hiit.png')" }}>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        GROUP FITNESS
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        ELEVATE YOUR ENERGY
                    </motion.p>
                </div>
            </div>

            <section className="classes-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-subtitle">WEEKLY SCHEDULE</span>
                        <h2>UPCOMING CLASSES</h2>
                    </div>

                    <div className="classes-grid">
                        {classes.length === 0 ? (
                            <div className="no-results">
                                <p>No upcoming classes scheduled at the moment.</p>
                            </div>
                        ) : (
                            classes.map((classItem, index) => {
                                const spotsLeft = classItem.capacity - classItem.enrolled_count;
                                const isLowSpots = spotsLeft <= 5;

                                return (
                                    <motion.div
                                        key={classItem.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="class-card"
                                    >
                                        <div className="class-header">
                                            <span className="class-type-badge">{classItem.class_type}</span>
                                            {classItem.price && (
                                                <span className="class-price">${classItem.price}</span>
                                            )}
                                        </div>

                                        <div className="class-content">
                                            <h3 className="class-name">{classItem.name}</h3>
                                            <div className="class-trainer">
                                                with {classItem.trainer_name}
                                            </div>

                                            <p className="class-description">{classItem.description}</p>

                                            <div className="class-details">
                                                <div className="detail-item">
                                                    <FiClock className="detail-icon" />
                                                    <span>{formatDate(classItem.start_time)}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <FiMapPin className="detail-icon" />
                                                    <span>{classItem.location || 'Main Studio'}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <FiUsers className="detail-icon" />
                                                    <span>Capacity: {classItem.capacity}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="class-footer">
                                            <div className={`spots-left ${isLowSpots ? 'low' : ''}`}>
                                                {spotsLeft} Spots Left
                                            </div>
                                            <button
                                                className="btn-join"
                                                disabled={spotsLeft === 0}
                                            >
                                                {spotsLeft === 0 ? 'Full' : 'Join Class'}
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Classes;
