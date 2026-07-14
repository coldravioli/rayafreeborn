document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".gallery").forEach(gallery => {
        const galleryId = gallery.dataset.gallery;
        const mainContainer = gallery;

        const thumbs = Array.from(
            document.querySelectorAll(`.thumb[data-gallery="${galleryId}"]`)
        );

        let currentIndex = 0;
        let autoRotateTimeout; // Changed to timeout for dynamic pacing

        function showMedia(index) {
            currentIndex = index;
            const activeThumb = thumbs[currentIndex];
            
            // 1. Clear any pending auto-rotation timers immediately
            clearTimeout(autoRotateTimeout);

            // 2. Remove the current main element
            const currentMain = mainContainer.querySelector(".main-display");
            if (currentMain) currentMain.remove();

            // 3. Create the new media element
            let newMain;
            let isVideo = activeThumb.tagName.toLowerCase() === "video";

            if (isVideo) {
                newMain = document.createElement("video");
                newMain.muted = true; // Required for autoplay on most browsers
                newMain.playsInline = true;
                // We DON'T loop here so we can catch the 'ended' event
                newMain.autoplay = true; 
                
                const source = activeThumb.querySelector("source").cloneNode();
                newMain.appendChild(source);

                // 🔄 Wait for the video to finish before going to the next slide
                newMain.addEventListener("ended", () => {
                    nextSlide();
                });
            } else {
                newMain = document.createElement("img");
                newMain.src = activeThumb.src;
            }

            newMain.classList.add("main-display");
            mainContainer.insertBefore(newMain, mainContainer.firstChild);

            attachMainClick(newMain);

            // 4. Update active thumbnail UI classes
            thumbs.forEach((thumb, i) => {
                thumb.classList.toggle("active", i === currentIndex);
            });

            // 5. If it's an IMAGE, start a standard 3-second countdown
            if (!isVideo) {
                startImageTimer();
            }
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % thumbs.length;
            showMedia(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
            showMedia(currentIndex);
        }

        function startImageTimer() {
            clearTimeout(autoRotateTimeout);
            autoRotateTimeout = setTimeout(() => {
                nextSlide();
            }, 3000); // 3 seconds for images
        }

        // Thumbnails Click
        thumbs.forEach((thumb, i) => {
            thumb.addEventListener("click", () => {
                showMedia(i);
            });
        });

        // Main Display Click (split screen left/right navigation)
        function attachMainClick(element) {
            element.addEventListener("click", (e) => {
                const rect = element.getBoundingClientRect();
                const clickX = e.clientX - rect.left;

                if (clickX < rect.width / 2) {
                    prevSlide();
                } else {
                    nextSlide();
                }
            });
        }

        // Initialize gallery
        showMedia(0);
    });
});

document.addEventListener("DOMContentLoaded", () => {

    const filters = document.querySelectorAll(".filter");
    const projects = document.querySelectorAll(".project-block");

    function applyFilter(category) {
        projects.forEach(project => {
            const match = category === "all" || project.dataset.category === category;
            project.style.display = match ? "block" : "none";
        });
    }

    filters.forEach(filter => {
        filter.addEventListener("click", () => {

            const category = filter.dataset.filter;

            filters.forEach(f => f.classList.remove("active"));
            filter.classList.add("active");

            applyFilter(category);
        });
    });

    // default
    applyFilter("all");

});

// ===================== PROJECT FILTER SYSTEM =====================

document.addEventListener("DOMContentLoaded", () => {

    const filterButtons = document.querySelectorAll(".intro-col");
    const projects = document.querySelectorAll(".project-block");

    function setActiveButton(activeBtn) {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        activeBtn.classList.add("active");
    }

    function filterProjects(category) {

        projects.forEach(project => {

            const projectCategory = project.dataset.category;

            // show all
            if (category === "all") {
                gsap.to(project, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    display: "block"
                });
                return;
            }

            // match category
            if (projectCategory === category) {
                gsap.to(project, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    display: "block"
                });
            } else {
                gsap.to(project, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    onComplete: () => {
                        project.style.display = "none";
                    }
                });
            }
        });
    }

    // default state = show all
    filterProjects("all");

    // click handlers
    filterButtons.forEach(btn => {

        btn.style.cursor = "pointer";

        btn.addEventListener("click", () => {

            const category = btn.dataset.filter;

            setActiveButton(btn);
            filterProjects(category);

        });

    });

});

const filterButtons = document.querySelectorAll(".intro-col");
const projects = document.querySelectorAll(".project-block");

let activeFilter = "all";

// ---------------- ACTIVE BUTTON UI ----------------
function setActiveButton(btn) {
    filterButtons.forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
}

// ---------------- FILTER LOGIC ----------------
function filterProjects(category) {

    projects.forEach(project => {

        const match = project.dataset.category === category;

        // show all
        if (category === "all") {
            gsap.to(project, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                display: "block"
            });
            return;
        }

        // show match
        if (match) {
            gsap.to(project, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                display: "block"
            });
        } 
        // hide non-match
        else {
            gsap.to(project, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                onComplete: () => {
                    project.style.display = "none";
                }
            });
        }
    });
}

// ---------------- CLICK HANDLERS ----------------
filterButtons.forEach(btn => {

    btn.style.cursor = "pointer";

    btn.addEventListener("click", () => {

        const category = btn.dataset.filter;

        // 🔁 TOGGLE BEHAVIOR
        if (activeFilter === category) {
            activeFilter = "all";
            setActiveButton(null);
            filterProjects("all");
            return;
        }

        activeFilter = category;
        setActiveButton(btn);
        filterProjects(category);

    });
});

const leftBg = document.querySelector(".left-pane-bg");

window.addEventListener("scroll", () => {
  const fadeDistance = 600; // scroll amount before fully white
  const progress = Math.min(window.scrollY / fadeDistance, 1);

  leftBg.style.setProperty("--fade", progress);
});

const words = [
    "Art Director",
    "Problem Solver",
    "Creative",
    "Developer",
    "Chef",
    "Programmer",
];

const container = document.getElementById("dynamic-word");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 1500;


function typeWriter() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        // typing forward
        container.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeWriter, pauseTime);
            return;
        }

    } else {

        // deleting backward
        container.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }


    setTimeout(
        typeWriter,
        deleting ? deletingSpeed : typingSpeed
    );
}


typeWriter();