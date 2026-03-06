const phrase1 = "Our website is currently in the works."; 
const phrase2 = "...";
const phrase3 = "Please come back later.";

const texts = [phrase1, phrase2, phrase3];

const terminalElement = document.querySelector(".terminal-text");
const clearButton = document.getElementById("clear-button");

let currentTextIndex = 0;
let i = 0;

function typeText() {
  if (i < texts[currentTextIndex].length) {
    terminalElement.innerHTML += texts[currentTextIndex].charAt(i);
    i++;
    setTimeout(typeText, 60);
  } else {
    terminalElement.classList.add("blink"); 
    setTimeout(() => {
      currentTextIndex++;
      if (currentTextIndex < texts.length) {
        terminalElement.innerHTML = ''; 
        terminalElement.classList.remove("blink"); 
        i = 0; 
        setTimeout(typeText, 700); 
      } else {
        terminalElement.classList.remove("blink"); 
        clearButton.style.display = 'block'; 
      }
    }, 2000); 
  }
}

clearButton.addEventListener('click', () => {
  window.location.href = 'website.html'; 
});

window.onload = typeText;
