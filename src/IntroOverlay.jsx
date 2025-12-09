import React, { useState, useEffect } from 'react';
import './intro.css';

const phrases = [
    "NOTED.",
    "Redefining Luxury.",
    "Launching Soon."
];

const IntroOverlay = () => {
    const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
    const [textVisible, setTextVisible] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(true);
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        let timeoutId;

        // Total duration calculations (Speeded up)
        const fadeDuration = 500; // 0.5s (was 0.8)
        const holdDuration = 1000; // 1s (was 1.2)
        const pauseBetween = 100; // 0.1s (was 0.2)

        const playSequence = async () => {
            // Small initial delay
            await new Promise(r => setTimeout(r, 500));

            for (let i = 0; i < phrases.length; i++) {
                // Set text
                setCurrentPhrase(phrases[i]);

                // Fade In
                setTextVisible(true);
                await new Promise(r => setTimeout(r, fadeDuration + holdDuration));

                // Fade Out
                setTextVisible(false);
                await new Promise(r => setTimeout(r, fadeDuration + pauseBetween));
            }

            // Fade out overlay
            setOverlayVisible(false);

            // Unmount after overlay fade finishes
            await new Promise(r => setTimeout(r, 1500));
            setMounted(false);
        };

        playSequence();

        return () => {
            // Cleanup if unmounted prematurely
        };
    }, []);

    if (!mounted) return null;

    return (
        <div className={`intro-overlay ${!overlayVisible ? 'hidden' : ''}`}>
            <div className={`intro-text ${textVisible ? 'visible' : ''}`}>
                {currentPhrase}
            </div>
        </div>
    );
};

export default IntroOverlay;
