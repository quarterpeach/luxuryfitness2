import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiActivity } from 'react-icons/fi';
import api from '../api/axios';
import './Workouts.css';

const Workouts = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ difficulty: '', category: '' });

    useEffect(() => {
        fetchWorkouts();
    }, [filter]);

    const fetchWorkouts = async () => {
        try {
            const params = new URLSearchParams();
            if (filter.difficulty) params.append('difficulty', filter.difficulty);
            if (filter.category) params.append('category', filter.category);

            const response = await api.get(`/workouts?${params.toString()}`);
            setWorkouts(response.data.workouts);
        } catch (error) {
            console.error('Error fetching workouts:', error);
        } finally {
            setLoading(false);
        }
    };

    const getDifficultyColor = (difficulty) => {
        const colors = {
            beginner: '#10B981',
            intermediate: '#F59E0B',
            advanced: '#EF4444'
        };
        return colors[difficulty] || '#9CA3AF';
    };

    const getWorkoutImage = (category) => {
        const images = {
            'Strength': 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop&q=80',
            'Cardio': 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop&q=80',
            'HIIT': 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&h=600&fit=crop&q=80',
            'Yoga': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop&q=80',
            'Pilates': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop&q=80'
        };
        return images[category] || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop&q=80';
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="workouts-page">
            <div className="workout-hero" style={{ backgroundImage: "url('/assets/images/workout-boxing.png')" }}>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        HIGHLIGHTS
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        DISCOVER YOUR POTENTIAL
                    </motion.p>
                </div>
            </div>

            {/* Highlights Section */}
            <section className="section highlights-section">
                <div className="container">
                    <div className="highlight-grid">
                        <motion.div
                            className="highlight-item"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="highlight-image" style={{ backgroundImage: "url('/assets/images/workout-hiit.png')" }}></div>
                            <div className="highlight-content">
                                <h3>CLASSES</h3>
                                <p>Experience the energy of group fitness with our world-class instructors.</p>
                                <a href="/classes" className="btn-link">EXPLORE CLASSES</a>
                            </div>
                        </motion.div>

                        <motion.div
                            className="highlight-item reverse"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="highlight-image" style={{ backgroundImage: "url('/assets/images/workout-yoga.png')" }}></div>
                            <div className="highlight-content">
                                <h3>MIND & BODY</h3>
                                <p>Find your balance and inner peace with our Yoga and Pilates sessions.</p>
                                <a href="/classes" className="btn-link">FIND PEACE</a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="section programs-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-subtitle">WORKOUT PROGRAMS</span>
                        <h2>TRANSFORM YOUR BODY</h2>
                    </div>

                    {/* Filters */}
                    <div className="filters">
                        <select
                            value={filter.difficulty}
                            onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
                            className="filter-select"
                        >
                            <option value="">All Difficulties</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>

                        <select
                            value={filter.category}
                            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                            className="filter-select"
                        >
                            <option value="">All Categories</option>
                            <option value="Strength">Strength</option>
                            <option value="Cardio">Cardio</option>
                            <option value="HIIT">HIIT</option>
                            <option value="Yoga">Yoga</option>
                            <option value="Pilates">Pilates</option>
                        </select>
                    </div>

                    {/* Workouts Grid */}
                    <div className="workouts-grid">
                        {workouts.length === 0 ? (
                            <div className="no-results">
                                <p>No workouts found. Try adjusting your filters.</p>
                            </div>
                        ) : (
                            workouts.map((workout, index) => (
                                <motion.div
                                    key={workout.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="workout-card"
                                >
                                    <div className="workout-image-wrapper">
                                        <div
                                            className="workout-image"
                                            style={{
                                                backgroundImage: `url(${getWorkoutImage(workout.category)})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        >
                                        </div>
                                        <div className="workout-badge" style={{ background: getDifficultyColor(workout.difficulty) }}>
                                            {workout.difficulty}
                                        </div>
                                    </div>

                                    <div className="workout-content">
                                        {workout.category && (
                                            <span className="workout-category">{workout.category}</span>
                                        )}
                                        <h3>{workout.title}</h3>
                                        <p>{workout.description}</p>

                                        <div className="workout-meta">
                                            <div className="meta-item">
                                                <FiClock size={16} />
                                                <span>{workout.duration_minutes} min</span>
                                            </div>
                                            {workout.trainer_name && (
                                                <div className="meta-item">
                                                    <span className="text-primary">{workout.trainer_name}</span>
                                                </div>
                                            )}
                                        </div>

                                        {workout.is_premium && (
                                            <span className="premium-badge">Premium</span>
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Workouts;
