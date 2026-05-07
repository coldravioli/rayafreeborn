// --------------------
// USER NAME FROM STORAGE
// --------------------
const savedName = sessionStorage.getItem("fihUser") || "User";
const userName = savedName;

// --------------------
// STATE
// --------------------
let awaitingSignature = false;
let failedAttempts = 0;

// --------------------
// ELEMENTS
// --------------------
const output = document.getElementById("output");
const input = document.getElementById("input");

// --------------------
// AUDIO (soft beep)
// --------------------
let audioCtx;

function playBeep() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(800 + Math.random() * 200, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.02, audioCtx.currentTime);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.03);
}

// --------------------
// TEXT OUTPUT
// --------------------
function addLine(text, className = "bot", speed = 20) {
    const line = document.createElement("p");
    line.className = className;
    output.appendChild(line);

    let i = 0;

    function typeChar() {
        if (i < text.length) {
            line.textContent += text.charAt(i);
            i++;

            if (className === "bot") playBeep();

            output.scrollTop = output.scrollHeight;
            setTimeout(typeChar, speed);
        }
    }

    typeChar();
}

function addUserLine(text) {
    const line = document.createElement("p");
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

// --------------------
// THINKING LINE
// --------------------
function addThinkingLine(finalText, className = "bot") {
    const line = document.createElement("p");
    line.className = className;
    output.appendChild(line);

    const dots = "...";
    let i = 0;

    function typeDots() {
        if (i < dots.length) {
            line.textContent += dots.charAt(i);
            playBeep();
            i++;
            output.scrollTop = output.scrollHeight;
            setTimeout(typeDots, 450);
        } else {
            setTimeout(() => typeRest(finalText), 900);
        }
    }

    function typeRest(text) {
        let j = 0;

        function typeChar() {
            if (j < text.length) {
                line.textContent += text.charAt(j);
                playBeep();
                j++;
                output.scrollTop = output.scrollHeight;
                setTimeout(typeChar, 20);
            }
        }

        typeChar();
    }

    typeDots();
}

// --------------------
// NAVIGATION BUTTON
// --------------------
function showNavigationButton(label, hash) {
    const wrapper = document.createElement("div");
    wrapper.className = "nav-wrapper";

    const btn = document.createElement("button");
    btn.textContent = label;
    btn.className = "choice-btn";

    btn.addEventListener("click", () => {
        window.location.href = "store.html#" + hash;
    });

    wrapper.appendChild(btn);
    output.appendChild(wrapper);
    output.scrollTop = output.scrollHeight;
}

addLine("F.I.H. SYSTEM ONLINE...", "bot");

setTimeout(() => {
    addLine(`Hello, ${userName}. How may I help you today?`, "bot");
}, 800);

// --------------------
// INPUT HANDLER
// --------------------
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const value = input.value.trim();
        if (!value) return;

        input.value = "";
        addUserLine(">> " + value);

        // 🔥 SIGNATURE MODE
        if (awaitingSignature) {
            handleSignature(value);
        } else {
            handleResponse(value.toLowerCase());
        }
    }
});

// --------------------
// SIGNATURE HANDLER
// --------------------
function handleSignature(value) {
    const signature = value.trim().toLowerCase();
    const expected = userName.trim().toLowerCase();

    awaitingSignature = false;

    if (signature === expected) {
        addLine("Signature verified.", "bot");

        setTimeout(() => {
            addLine("Access granted.", "bot");
            showNavigationButton("Enter freshwater inventory", "freshwater");
        }, 800);

    } else {
        failedAttempts++;

        addLine("Signature mismatch.", "bot");

        setTimeout(() => {
            addLine("Identity could not be confirmed.", "bot");
        }, 600);

        if (failedAttempts >= 2) {
            setTimeout(() => {
                addLine("Repeated failure detected.", "bot");
            }, 1200);
        }

        if (failedAttempts >= 3) {
            setTimeout(() => {
                addLine("Monitoring enabled.", "bot");
            }, 1800);
        }

        setTimeout(() => {
            addLine("DO YOU UNDERSTAND THE REQUIREMENTS?", "bot");
            showChoices(["Retry Verification", "Abort"]);
        }, 2000);
    }
}

// --------------------
// RESPONSE LOGIC
// --------------------
function handleResponse(inputText) {

    if (inputText.includes("hello") ||
    inputText.includes("hi") ||
    inputText.includes("ih")) {
        fakeLoading(() => {
            addLine(`Hello, ${userName}. Are you interested in purchasing fish? If so, please inquire.`, "bot");
        });

    } else if (inputText.includes("fih")) {
        fakeLoading(() => {
            addLine("F.I.H. stands for Future Ichykoid Habitation.", "bot");

            setTimeout(() => {
                addLine("F.I.H. specializes in the collection, refinement, and homing of advanced ichthyoid specimens originating in the New River.", "bot");
            }, 800);
        });
    }

    // BUY FLOW
    else if (
        inputText.includes("buy") ||
        inputText.includes("fish") ||
        inputText.includes("specimen") ||
        inputText.includes("yes")
    ) {
        fakeLoading(() => {
            addLine(`Only freshwater specimens are available, ${userName}.`, "bot");

            setTimeout(() => {
                addLine("Before proceeding, verification is required.", "bot");
                showChoices(["Proceed"]);
            }, 700);
        });
    }

    else {
        fakeLoading(() => {
            addThinkingLine("I don't understand. Do you want to purchase fish?", "bot");
        });
    }
}

// --------------------
// FAKE LOADING
// --------------------
function fakeLoading(callback) {
    const phrases = [
        "Loading...",
        "Interpreting request...",
        "Processing..."
    ];

    const text = phrases[Math.floor(Math.random() * phrases.length)];

    const line = document.createElement("p");
    line.className = "loading";
    line.textContent = text;

    output.appendChild(line);
    output.scrollTop = output.scrollHeight;

    setTimeout(() => {
        line.remove();
        callback();
    }, 800 + Math.random() * 1200);
}

// --------------------
// CHOICES
// --------------------
function showChoices(options) {
    const wrapper = document.createElement("div");
    wrapper.className = "choices";

    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.className = "choice-btn";

        btn.addEventListener("click", () => {
            addUserLine(">> " + opt);
            wrapper.remove();

            fakeLoading(() => {

                if (opt === "Proceed") {
                    addLine("Do you understand that all specimens require environmental maintenance?", "bot");

                    setTimeout(() => {
                        showChoices(["I Understand", "I Do Not"]);
                    }, 700);
                }

                else if (opt === "I Understand") {
                    addLine("Verification step 2 required.", "bot");

                    setTimeout(() => {
                        addLine("Do you agree to assume responsibility for specimen behavior?", "bot");
                        showChoices(["I Agree", "I Refuse"]);
                    }, 700);
                }

                else if (opt === "I Agree") {
                    addLine("Final verification required.", "bot");

                    setTimeout(() => {
                        addLine("Type your name to sign authorization.", "bot");
                        awaitingSignature = true;
                    }, 700);
                }

                else if (opt === "Retry Verification") {
                    addLine("Re-enter signature.", "bot");

                    setTimeout(() => {
                        addLine("Type your name exactly as registered.", "bot");
                        awaitingSignature = true;
                    }, 700);
                }

                else if (opt === "Abort") {
                    addLine("Request terminated.", "bot");

                    setTimeout(() => {
                        addLine("Session flagged.", "bot");
                    }, 600);
                }

                else if (opt === "I Do Not" || opt === "I Refuse") {
                    addLine("Request terminated.", "bot");
                }

            });
        });

        wrapper.appendChild(btn);
    });

    output.appendChild(wrapper);
    output.scrollTop = output.scrollHeight;
}