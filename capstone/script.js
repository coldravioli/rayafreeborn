const texts = ["identify.", "stabilize.", "redistribute.", "welcome to f.i.h."];
const terminalElement = document.querySelector(".terminal-text");
const nameInput = document.getElementById("nameInput");
const enterButton = document.getElementById("enterButton");

let currentTextIndex = 0;
let charIndex = 0;
let isDeleting = false;

// ================= TERMINAL TYPING LOOP =================
function handleTerminal() {
  const currentFullText = texts[currentTextIndex];

  if (!isDeleting) {
    // Typing
    terminalElement.innerText = currentFullText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentFullText.length) {
      isDeleting = true;
      setTimeout(handleTerminal, 1500); // Pause at end
    } else {
      setTimeout(handleTerminal, 80);
    }
  } else {
    // Deleting
    terminalElement.innerText = currentFullText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % texts.length;
      setTimeout(handleTerminal, 500);
    } else {
      setTimeout(handleTerminal, 50);
    }
  }
}

// ================= BUTTON & FLASH LOGIC =================
enterButton.addEventListener("click", () => {
  const nameValue = nameInput.value.trim();

  // 1. Requirement: Only work if input has text
  if (nameValue !== "") {
    // 2. Flash Initializing Effect
    enterButton.disabled = true;
    enterButton.innerText = "INITIALIZING...";
    enterButton.style.backgroundColor = "#ffffff";
    enterButton.style.color = "#000000";

    // 3. Save name
    sessionStorage.setItem("fihUser", nameValue);

    // 4. Redirect after 1 second
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
    
  } else {
    // Feedback for empty input
    nameInput.style.borderColor = "red";
    setTimeout(() => { nameInput.style.borderColor = "#00ff00"; }, 500);
  }
});

// Keypress listener for "Enter" key
nameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    enterButton.click();
  }
});

// Start the terminal loop
window.onload = handleTerminal;