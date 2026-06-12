/**
 * Bumal Sathsara - Portfolio JavaScript
 * Core features: Typing animation, Responsive mobile menu, Sticky header,
 * Scroll-reveal animations, and Active nav link scroll highlighter.
 */

// ==========================================================================
// GALLERY CONFIGURATION: Add your filenames here when uploading new assets!
// ==========================================================================
const CREATIVE_GALLERY_CONFIG = {
    photographs: [
        'N1.jpeg',
        'N2.jpeg',
        'N3.jpeg'
    ],
    videos: [
        'V1.mp4'
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. STICKY HEADER / NAVBAR BACKGROUND CHANGE
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    
    const toggleStickyHeader = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Initial check on load and on scroll
    toggleStickyHeader();
    window.addEventListener('scroll', toggleStickyHeader);

    /* ==========================================================================
       2. RESPONSIVE MOBILE MENU (HAMBURGER)
       ========================================================================== */
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
        
        // Prevent body scrolling when mobile menu is open
        if (navMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };
    
    hamburger.addEventListener('click', toggleMenu);
    
    // Support keyboard activation for hamburger menu (accessibility)
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    /* ==========================================================================
       3. HERO TYPING ANIMATION
       ========================================================================== */
    const typingElement = document.getElementById('typing-element');
    const titles = [
        "Data Science Undergraduate",
        "AI Engineer",
        "Machine Learning Enthusiast",
        "Video Editor",
        "Content Creator"
    ];
    
    let currentTitleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // time in ms per character type
    
    const type = () => {
        const currentTitle = titles[currentTitleIndex];
        
        if (isDeleting) {
            // Remove character
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion speed
        } else {
            // Add character
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // standard typing speed
        }
        
        // If finished typing the word
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // pause before deleting
        } 
        // If finished deleting the word
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to the next title
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            typingSpeed = 500; // pause before typing next word
        }
        
        setTimeout(type, typingSpeed);
    };
    
    // Start typing animation if element exists
    if (typingElement) {
        setTimeout(type, 1000);
    }

    /* ==========================================================================
       4. SCROLL REVEAL (FADE-IN & SLIDE-UP ANIMATIONS)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserverOptions = {
        root: null, // viewport
        threshold: 0.15, // trigger when 15% of the element is visible
        rootMargin: "0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve once revealed to keep page performance light
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       5. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    const navObserverOptions = {
        root: null,
        // Trigger highlight when section covers a substantial portion of viewport
        rootMargin: "-30% 0px -40% 0px"
    };
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    
                    // Match link href (e.g. #home) with sectionId
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);
    
    sections.forEach(section => {
        navObserver.observe(section);
    });

    /* ==========================================================================
       6. DYNAMIC CREATIVE GALLERY POPULATOR
       ========================================================================== */
    const photographyGallery = document.getElementById('photography-gallery');
    const videosGallery = document.getElementById('videos-gallery');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    // Populate Photography Gallery
    if (photographyGallery && CREATIVE_GALLERY_CONFIG.photographs) {
        CREATIVE_GALLERY_CONFIG.photographs.forEach(filename => {
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'gallery-img-wrapper';
            
            const img = document.createElement('img');
            img.src = `assets/photographs/${filename}`;
            img.alt = 'Nature Photography';
            img.className = 'gallery-img';
            img.loading = 'lazy';
            
            imgWrapper.appendChild(img);
            photographyGallery.appendChild(imgWrapper);
            
            // Open in Lightbox on click
            imgWrapper.addEventListener('click', () => {
                if (lightboxModal && lightboxImg) {
                    lightboxImg.src = img.src;
                    lightboxModal.classList.add('open');
                    document.body.style.overflow = 'hidden'; // Lock scrolling
                }
            });
        });
    }

    // Close Lightbox
    if (lightboxClose && lightboxModal) {
        const closeLightbox = () => {
            lightboxModal.classList.remove('open');
            // Check if mobile menu is also closed before unlocking body scroll
            const navMenu = document.getElementById('nav-menu');
            if (!navMenu || !navMenu.classList.contains('open')) {
                document.body.style.overflow = '';
            }
        };
        
        lightboxClose.addEventListener('click', closeLightbox);
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }

    // Populate Videos Gallery
    if (videosGallery && CREATIVE_GALLERY_CONFIG.videos) {
        CREATIVE_GALLERY_CONFIG.videos.forEach(filename => {
            const videoWrapper = document.createElement('div');
            videoWrapper.className = 'gallery-video-wrapper';
            
            const video = document.createElement('video');
            video.className = 'gallery-video';
            video.controls = true;
            
            const source = document.createElement('source');
            source.src = `assets/videos/${filename}`;
            source.type = 'video/mp4';
            
            video.appendChild(source);
            videoWrapper.appendChild(video);
            videosGallery.appendChild(videoWrapper);
        });
    }
});
