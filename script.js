document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. LENIS SMOOTH SCROLL
       ========================================= */
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);


    /* =========================================
       2. CINEMATIC INTRO ANIMATION
       ========================================= */
    const phrases = [
        { text: "Wear Your Identity.", isAccent: false },
        { text: "Launching Soon.", isAccent: true }
    ];

    const introOverlay = document.getElementById('intro-overlay');
    const introText = document.getElementById('intro-text');
    const mainContainer = document.getElementById('main-container');

    // Timings (Balanced)
    const fadeDuration = 1000;
    const holdDuration = 1500;
    const pauseBetween = 200;

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const playIntro = async () => {
        // Initial Delay
        await wait(500);

        for (let i = 0; i < phrases.length; i++) {
            const phrase = phrases[i];
            
            // Set text content
            introText.textContent = phrase.text;
            
            // Handle Accent Class
            if (phrase.isAccent) {
                introText.classList.add('accent-color');
            } else {
                introText.classList.remove('accent-color');
            }

            // Fade In
            introText.classList.add('visible');
            await wait(fadeDuration + holdDuration);

            // Fade Out
            introText.classList.remove('visible');
            await wait(fadeDuration + pauseBetween);
        }

        // Hide Overlay
        introOverlay.classList.add('hidden');

        // Trigger Main Page Animations
        setTimeout(() => {
            mainContainer.classList.add('animate-in');
        }, 200); // Snappy transition

        // Remove overlay from DOM after it fades out to prevent click blocking?
        // Actually CSS pointer-events: none handles interactions, 
        // but we can completely remove it if we want.
        await wait(1500);
        introOverlay.style.display = 'none';
    };

    // Start Intro
    playIntro();


    /* =========================================
       3. COUNTDOWN TIMER
       ========================================= */
    // -----------------------------------------------------------
    // CONFIGURATION: CHANGE TARGET LAUNCH DATE HERE
    // -----------------------------------------------------------
    const targetDate = new Date("2026-01-01T00:00:00").getTime();
    
    const countdownEl = document.getElementById('countdown');

    const updateTimer = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            countdownEl.innerHTML = '<span class="countdown-value">00:00:00:00</span>';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const d = days.toString().padStart(2, '0');
        const h = hours.toString().padStart(2, '0');
        const m = minutes.toString().padStart(2, '0');
        const s = seconds.toString().padStart(2, '0');

        // Render HTML
        countdownEl.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-value">${d}</span>
                <span class="countdown-label">DAYS</span>
            </div>
            <span class="countdown-separator">:</span>
            <div class="countdown-item">
                <span class="countdown-value">${h}</span>
                <span class="countdown-label">HOURS</span>
            </div>
            <span class="countdown-separator">:</span>
            <div class="countdown-item">
                <span class="countdown-value">${m}</span>
                <span class="countdown-label">MINUTES</span>
            </div>
            <span class="countdown-separator">:</span>
            <div class="countdown-item">
                <span class="countdown-value">${s}</span>
                <span class="countdown-label">SECONDS</span>
            </div>
        `;
    };

    // Run immediately and then every second
    updateTimer();
    setInterval(updateTimer, 1000);

});
