import { useState, useEffect } from 'react';

const Countdown = () => {
    // Set launch date to 30 days from now for demo purposes
    // In a real app, this would be a specific timestamp
    const calculateTimeLeft = () => {
        const difference = +new Date("2026-01-01") - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            // Default fall back or reset
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        // Pad with leading zero
        const value = timeLeft[interval].toString().padStart(2, '0');

        timerComponents.push(
            <div key={interval} className="countdown-item">
                <span className="countdown-value">{value}</span>
                <span className="countdown-label">{interval.toUpperCase()}</span>
            </div>
        );

        // Add separator if not the last item
        if (interval !== 'seconds') {
            timerComponents.push(
                <span key={`${interval}-sep`} className="countdown-separator">:</span>
            )
        }
    });

    return (
        <div className="countdown-container">
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
    );
};

export default Countdown;
