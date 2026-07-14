const bubbleContainer = document.getElementById('bubble-container');

// Define the color palettes.
// Each option has a main transparent color and a brighter highlight color for the "shine".
const colorPalettes = [
    // Pink
    { main: 'rgba(255, 105, 180, 0.25)', highlight: 'rgba(255, 192, 203, 0.7)' },
    // Yellow
    { main: 'rgba(255, 215, 0, 0.25)',   highlight: 'rgba(255, 255, 224, 0.7)' },
    // Blue
    { main: 'rgba(30, 144, 255, 0.25)',  highlight: 'rgba(135, 206, 250, 0.7)' }
];

function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // --- NEW: COLOR SELECTION ---
    // 1. Pick a random palette index (0, 1, or 2)
    const randomIndex = Math.floor(Math.random() * colorPalettes.length);
    const selectedColors = colorPalettes[randomIndex];

    // 2. Apply the colors to background and shadow
    bubble.style.background = selectedColors.main;
    // This creates an inner glow (inset) using the highlight color
    bubble.style.boxShadow = `inset 0 0 15px ${selectedColors.highlight}, inset 0 0 5px ${selectedColors.main}`;
    // ---------------------------


    // Standard Size/Position adjustments from before
    const size = Math.random() * 60 + 20; 
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * 100 + 'vw';
    bubble.style.animationDuration = Math.random() * 4 + 4 + 's';
    
    // Interaction: Pop on hover
    bubble.addEventListener('mouseenter', () => {
        bubble.remove(); 
    });

    // Cleanup
    bubble.addEventListener('animationend', () => {
        bubble.remove();
    });

    bubbleContainer.appendChild(bubble);
}

// Create a new bubble every 300 milliseconds
setInterval(createBubble, 300);