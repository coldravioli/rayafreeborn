const fishImages = [
    'fish1.jpg',
    'fish2.jpg',
    'fish3.jpg',
    'fish4.jpg',
    'fish5.jpg',
    'fish6.jpg',
    'fish7.jpg',
    'fish8.jpg',
    'fish9.jpg'
];

document.getElementById('ask-button').onclick = function() {
    addFish();
};

document.getElementById('question-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addFish();
        event.preventDefault();
    }
});

function addFish() {
    const fishContainer = document.getElementById('fish-container');
    const randomIndex = Math.floor(Math.random() * fishImages.length);
    const fishImage = fishImages[randomIndex];
    
    const fish = document.createElement('img');
    fish.src = fishImage;
    fish.alt = 'Fish';
    fish.classList.add('draggable-fish');
    
 
    fish.style.position = 'absolute';
    fish.style.top = Math.random() * (window.innerHeight - 100) + 'px'; 
    fish.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    fishContainer.appendChild(fish);
    makeDraggable(fish);
}

function makeDraggable(fish) {
    let isDragging = false;
    let offsetX, offsetY;

    fish.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - fish.getBoundingClientRect().left;
        offsetY = e.clientY - fish.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            fish.style.left = (e.clientX - offsetX) + 'px';
            fish.style.top = (e.clientY - offsetY) + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}
