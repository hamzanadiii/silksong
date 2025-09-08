// Device detection and initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    detectDevice();
    setupEventListeners();
    setupCarousel();
    setupVideoPlayer();
    optimizePerformance();
}

// Device Detection
function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const mainCTA = document.getElementById('main-cta');
    const downloadCTA = document.getElementById('download-cta');
    
    let deviceType = 'android'; // default
    
    if (/iphone|ipad|ipod/.test(userAgent)) {
        deviceType = 'ios';
    } else if (/android/.test(userAgent)) {
        deviceType = 'android';
    }
    
    // Apply device-specific styling
    mainCTA.classList.add(deviceType);
    downloadCTA.classList.add(deviceType);
    
    // Update button text based on device
    const ctaTexts = mainCTA.querySelectorAll('.cta-text');
    const downloadTexts = downloadCTA.querySelectorAll('.cta-text');
    
    const buttonText = deviceType === 'ios' ? 'Download for iOS' : 'Download for Android';
    
    ctaTexts.forEach(text => text.textContent = buttonText);
    downloadTexts.forEach(text => text.textContent = buttonText);
}

// Event Listeners
function setupEventListeners() {
    const mainCTA = document.getElementById('main-cta');
    const downloadCTA = document.getElementById('download-cta');
    const heroVideo = document.getElementById('hero-video');
    
    // Hero CTA with loading animation (same as download CTA)
    mainCTA.addEventListener('click', function(e) {
        e.preventDefault();
        showLoadingModal();
    });
    
    // Download CTA with loading animation
    downloadCTA.addEventListener('click', function(e) {
        e.preventDefault();
        showLoadingModal();
    });
    
    // Video fallback handling
    if (heroVideo) {
        heroVideo.addEventListener('error', function() {
            console.log('Video failed to load, using fallback background');
            heroVideo.style.display = 'none';
        });
        
        // Pause video when not in viewport to save battery
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play().catch(e => console.log('Autoplay prevented'));
                } else {
                    heroVideo.pause();
                }
            });
        });
        
        observer.observe(heroVideo);
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            updateCarouselPosition();
        }, 250);
    });
}

// Screenshot Carousel
let currentSlide = 0;
let carouselInterval;
const autoAdvanceDelay = 4000; // 4 seconds

function setupCarousel() {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.screenshot-item');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!track || !items.length) return;
    
    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Touch/swipe support
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', handleTouchStart, { passive: true });
    track.addEventListener('touchmove', handleTouchMove, { passive: true });
    track.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Mouse support for desktop
    track.addEventListener('mousedown', handleMouseStart);
    track.addEventListener('mousemove', handleMouseMove);
    track.addEventListener('mouseup', handleMouseEnd);
    track.addEventListener('mouseleave', handleMouseEnd);
    
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        pauseAutoAdvance();
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    }
    
    function handleTouchEnd() {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - currentX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentSlide < items.length - 1) {
                nextSlide();
            } else if (diffX < 0 && currentSlide > 0) {
                prevSlide();
            }
        }
        
        resumeAutoAdvance();
    }
    
    function handleMouseStart(e) {
        e.preventDefault();
        startX = e.clientX;
        isDragging = true;
        pauseAutoAdvance();
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.clientX;
    }
    
    function handleMouseEnd() {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - currentX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentSlide < items.length - 1) {
                nextSlide();
            } else if (diffX < 0 && currentSlide > 0) {
                prevSlide();
            }
        }
        
        resumeAutoAdvance();
    }
    
    // Auto-advance carousel
    startAutoAdvance();
    
    // Pause auto-advance when user hovers
    track.addEventListener('mouseenter', pauseAutoAdvance);
    track.addEventListener('mouseleave', resumeAutoAdvance);
}

function goToSlide(index) {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.carousel-dot');
    
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    const items = document.querySelectorAll('.screenshot-item');
    if (currentSlide < items.length - 1) {
        goToSlide(currentSlide + 1);
    } else {
        goToSlide(0); // Loop back to first slide
    }
}

function prevSlide() {
    const items = document.querySelectorAll('.screenshot-item');
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    } else {
        goToSlide(items.length - 1); // Loop to last slide
    }
}

function startAutoAdvance() {
    carouselInterval = setInterval(nextSlide, autoAdvanceDelay);
}

function pauseAutoAdvance() {
    clearInterval(carouselInterval);
}

function resumeAutoAdvance() {
    pauseAutoAdvance();
    startAutoAdvance();
}

function updateCarouselPosition() {
    goToSlide(currentSlide);
}

// Video Player
function setupVideoPlayer() {
    const trailer = document.getElementById('game-trailer');
    const playOverlay = document.querySelector('.play-overlay');
    const playButton = document.querySelector('.play-button');
    
    if (!trailer || !playOverlay) return;
    
    playButton.addEventListener('click', function() {
        trailer.play();
        playOverlay.classList.add('hidden');
    });
    
    trailer.addEventListener('play', function() {
        playOverlay.classList.add('hidden');
    });
    
    trailer.addEventListener('pause', function() {
        playOverlay.classList.remove('hidden');
    });
    
    trailer.addEventListener('ended', function() {
        playOverlay.classList.remove('hidden');
    });
}

// Loading Modal and CPA Integration
function showLoadingModal() {
    const modal = document.getElementById('loading-modal');
    const progressBar = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    
    modal.classList.add('active');
    
    // Simulate loading progression
    const messages = [
        "Verifying compatibility and optimizing download...",
        "Preparing secure download link...",
        "Finalizing APK package...",
        "Ready to download!"
    ];
    
    let messageIndex = 0;
    
    const messageInterval = setInterval(() => {
        if (messageIndex < messages.length - 1) {
            messageIndex++;
            loadingText.textContent = messages[messageIndex];
        }
    }, 1000);
    
    // After 3 seconds, trigger CPA locker
    setTimeout(() => {
        clearInterval(messageInterval);
        modal.classList.remove('active');
        triggerCPALocker();
    }, 3500);
}

function triggerCPALocker() {
    // Trigger the LockerPreview content locker
    if (window.lockerPreviewConfig && window.lockerPreviewConfig.url) {
        // Open the locker URL in a new window/tab
        window.open(window.lockerPreviewConfig.url, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
    } else {
        // Fallback - redirect to the locker URL
        window.location.href = 'https://lockerpreview.com/cl/i/rndj5k?preview=1';
    }
}

function startDownload() {
    // This would trigger the actual APK download
    console.log('Starting download...');
    
    // Example: Create download link
    // const downloadLink = document.createElement('a');
    // downloadLink.href = 'path/to/silksong-mobile.apk';
    // downloadLink.download = 'silksong-mobile.apk';
    // downloadLink.click();
}

// Performance Optimizations
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Reduce animations on low-power devices
    if (navigator.hardwareConcurrency <= 2) {
        document.body.classList.add('reduced-motion');
    }
    
    // Optimize scroll performance
    let ticking = false;
    
    function updateScrollEffects() {
        // Add any scroll-based animations here if needed
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }, { passive: true });
    
    // Preload critical assets
    preloadCriticalAssets();
}

function preloadCriticalAssets() {
    // Preload hero video
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        heroVideo.preload = 'metadata';
    }
    
    // Preload first screenshot
    const firstScreenshot = document.querySelector('.screenshot-item img');
    if (firstScreenshot && !firstScreenshot.complete) {
        const img = new Image();
        img.src = firstScreenshot.src;
    }
}

// Analytics and Tracking
function trackEvent(eventName, properties = {}) {
    // Integration with analytics service
    console.log(`Event: ${eventName}`, properties);
    
    // Vercel Analytics integration
    if (typeof window.va !== 'undefined') {
        window.va('track', eventName, properties);
    }
    
    // Example Google Analytics integration:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, properties);
    // }
    
    // Example Facebook Pixel integration:
    // if (typeof fbq !== 'undefined') {
    //     fbq('track', eventName, properties);
    // }
}

// Track important user interactions
document.addEventListener('click', function(e) {
    const target = e.target.closest('[id]');
    if (!target) return;
    
    if (target.id === 'main-cta') {
        trackEvent('hero_cta_click', { position: 'hero' });
    } else if (target.id === 'download-cta') {
        trackEvent('download_cta_click', { position: 'preview' });
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno
    });
});

// Service Worker registration for better performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}