// Sidenav Functions
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

document.addEventListener("DOMContentLoaded", () => {
    const splashScreen = document.getElementById("splash-screen");
    setTimeout(() => {
        splashScreen.style.display = "none"; // Hide the splash screen after 3 seconds
    }, 3000);
});

let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function showNextItem() {
  currentIndex = (currentIndex + 1) % totalItems;
  updateCarousel();
}

function updateCarousel() {
  const offset = -currentIndex * 100;
  document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
}

// Automatically rotate every 3 seconds
setInterval(showNextItem, 5000);


