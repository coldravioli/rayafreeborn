// --- SCROLL DEPTH FLOWER ROTATION (OPTIMIZED) ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Create the element if it doesn't exist
    let scrollDepthCircle = document.getElementById('scroll-depth');
    if (!scrollDepthCircle) {
        scrollDepthCircle = document.createElement('div');
        scrollDepthCircle.id = 'scroll-depth';
        document.body.appendChild(scrollDepthCircle);
    }

    // 2. OPTIMIZATION: Use requestAnimationFrame for smooth scrolling
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                // Calculate height here to ensure it's accurate if window resizes
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollRatio = docHeight > 0 ? scrollTop / docHeight : 0;

                const rotation = scrollRatio * 360;
                scrollDepthCircle.style.transform = `rotate(${rotation}deg)`;
                
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // 3. Scroll to top on click
    scrollDepthCircle.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});


// --- PAGE TRANSITIONS (FIXED FOR ANCHORS) ---
document.addEventListener("DOMContentLoaded", function() {

    // 1. INCOMING ANIMATION
    const introBlob = document.querySelector('.nav-intro');
    if (introBlob) {
        setTimeout(() => {
            introBlob.classList.remove('expanded');
        }, 100);
    }

    // 2. OUTGOING ANIMATION
    const transitionOverlay = document.querySelector('.page-transition');
    const navLinks = document.querySelectorAll('.nav ul li a');

    if (!transitionOverlay) return;

    const colors = {
        blue: '#29abe2',
        yellow: '#fcee21',
        pink: '#ed1e79',
        default: '#abbdd1'
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetUrl = this.getAttribute('href');

            // SAFETY CHECK 1: Ignore external links
            if (this.target === "_blank") return;

            // SAFETY CHECK 2: Ignore Anchor Links (The Fix)
            // If the link starts with # (e.g. #about), let CSS handle the smooth scroll
            if (targetUrl.startsWith('#')) return;
            
            // If the link is just the current page (e.g. index.html when you are already on index.html)
            // prevent the animation so it doesn't feel weird.
            if (window.location.pathname.endsWith(targetUrl)) return;

            // If we passed checks, run the transition animation
            e.preventDefault();

            const parentLi = this.parentElement;
            if (parentLi.classList.contains('blue')) {
                transitionOverlay.style.backgroundColor = colors.blue;
            } else if (parentLi.classList.contains('yellow')) {
                transitionOverlay.style.backgroundColor = colors.yellow;
            } else if (parentLi.classList.contains('pink')) {
                transitionOverlay.style.backgroundColor = colors.pink;
            } else {
                transitionOverlay.style.backgroundColor = colors.default;
            }

            transitionOverlay.classList.add('active');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 600);
        });
    });
});