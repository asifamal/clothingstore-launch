import React, { useState, useEffect } from 'react';
import './intro.css';

const phrases = [
    { text: "Wear Your Identity.", isAccent: false },
    { text: "Launching Soon.", isAccent: true }
];

const IntroOverlay = ({ onComplete }) => {
    const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
    const [textVisible, setTextVisible] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(true);
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        let timeoutId;

        // Total duration calculations (Balanced)
        const fadeDuration = 1000; // 1.0s
        const holdDuration = 1500; // 1.5s
        const pauseBetween = 200; // 0.2s

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

            // Trigger "onComplete" almost immediately as the overlay fades for a snappier reveal
            setTimeout(() => {
                if (onComplete) onComplete();
            }, 200);

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
            <div className={`intro-text ${textVisible ? 'visible' : ''} ${currentPhrase.isAccent ? 'accent-color' : ''}`}>
                {currentPhrase.text}
            </div>
        </div>
    );
};

export default IntroOverlay;
