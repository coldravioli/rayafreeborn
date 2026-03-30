window.addEventListener("scroll", () => {
    const hero = document.querySelector(".home-hero");
    const purple = document.querySelector(".home-stack.purple");
    const white = document.querySelector(".home-stack.white");
    const homeSection = document.querySelector("#home");
  
    // --- Existing Hero Logic ---
    const rect = homeSection.getBoundingClientRect();
    const height = window.innerHeight;
    let progress = 1 - (rect.bottom / height);
    progress = Math.min(Math.max(progress, 0), 1);
  
    if(hero) hero.style.opacity = 1 - progress;
    if(purple) purple.style.opacity = 1 - progress;
    if(white) white.style.opacity = progress;
  
    // --- Background Color Logic ---
    // This calculates how far down the total page the user has scrolled
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
  
    // Convert percentage (0 to 1) to RGB (0 to 255)
    const colorValue = Math.floor(scrollPercent * 255);
    document.body.style.backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
  
    // Optional: Toggle a class to flip text color when the background gets light
    if (scrollPercent > 0.5) {
      document.body.classList.add('is-light');
    } else {
      document.body.classList.remove('is-light');
    }
  });