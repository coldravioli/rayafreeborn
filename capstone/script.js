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
    terminalElement.innerText = currentFullText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentFullText.length) {
      isDeleting = true;
      setTimeout(handleTerminal, 1500);
    } else {
      setTimeout(handleTerminal, 80);
    }
  } else {
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

  if (nameValue !== "") {

    // Flash effect
    enterButton.disabled = true;
    enterButton.innerText = "INITIALIZING...";
    enterButton.style.backgroundColor = "#ffffff";
    enterButton.style.color = "#000000";

    // ✅ SAVE NAME (use ONE system)
    sessionStorage.setItem("fihUser", nameValue);

    // Redirect
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);

  } else {
    nameInput.style.borderColor = "red";
    setTimeout(() => { nameInput.style.borderColor = "#00ff00"; }, 500);
  }
});


// ================= ENTER KEY =================
nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    enterButton.click();
  }
});


// ================= START =================
window.onload = handleTerminal;