// NavBar Link Active
let links = document.querySelectorAll('.nav-link');
        for(let i=0; i<links.length; i++){
        links[i].addEventListener('click', function() {
            for(let j=0; j<links.length; j++)
            links[j].classList.remove('active');
            this.classList.add('active');
        });
        }

        const galleryImages = document.querySelectorAll('.gallery-img');
const carousel = document.getElementById('carouselExample');
const modal = document.getElementById('exampleModal');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    const slideIndex = img.getAttribute('data-bs-slide-to');
    const carouselInstance = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel);
    carouselInstance.to(slideIndex);
    // Open modal
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modal);
    modalInstance.show();
  });
});
