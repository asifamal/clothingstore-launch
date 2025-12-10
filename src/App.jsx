import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Countdown from './Countdown';
import IntroOverlay from './IntroOverlay';
import './index.css';

function App() {
  const [introFinished, setIntroFinished] = useState(() => {
    // Check local storage to see when the intro was last shown

    const lastSeen = localStorage.getItem('intro_last_seen');
    const now = Date.now();
    const cooldown = 2 * 60 * 1000; // 2 minutes in milliseconds

    // If seen recently (within cooldown), skip intro
    if (lastSeen && (now - parseInt(lastSeen, 10) < cooldown)) {
      return true;
    }

    // Otherwise, we will show it, so update the timestamp now
    localStorage.setItem('intro_last_seen', now.toString());

    return false;
  });

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for extra smoothness
      smoothWheel: true,
      smoothTouch: false, // Default is usually false for touch devices to keep native feel, but can be true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {!introFinished && <IntroOverlay onComplete={() => setIntroFinished(true)} />}

      <div className="background-wrapper">
        <img src="/bg.png" alt="City Skyline" className="background-image" />
        <div className="overlay"></div>
      </div>

      <div className={`container ${introFinished ? 'animate-in' : ''}`}>
        <div className="brand-name">
          NOTED.
        </div>

        <div className="subheading">
          OUR NEW COLLECTION IS LAUNCHING SOON
        </div>

        <h1 className="headline">
          The Future is Coming
        </h1>

        <Countdown />


      </div>
    </>
  );
}

export default App;
