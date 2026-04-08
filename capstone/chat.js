// --------------------
// USER NAME FROM STORAGE
// --------------------
const savedName = sessionStorage.getItem("fihUser") || "User";
const userName = savedName;

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
    btn.className = "nav-btn";
    btn.className = "choice-btn";


    btn.addEventListener("click", () => {
        window.location.href = "store.html#" + hash;
    });

    wrapper.appendChild(btn);
    output.appendChild(wrapper);
    output.scrollTop = output.scrollHeight;
}

// --------------------
// INITIAL BOOT
// --------------------

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
        handleResponse(value.toLowerCase());
    }
});

// --------------------
// RESPONSE ENGINE
// --------------------

function handleResponse(inputText) {

    if (inputText.includes("hello")) {
        fakeLoading(() => {
            addLine("Hi. State your request.", "bot");
        });

    } else if (inputText.includes("fih")) {
        fakeLoading(() => {
            addLine("F.I.H. stands for Future Ichykoid Habitation.", "bot");

            setTimeout(() => {
                addLine("F.I.H. specializes in the collection, refinement, and homing of advanced ichthyoid specimens originating in the New River.", "bot");
            }, 800);
        });

    } else if (
        inputText.includes("buy") ||
        inputText.includes("fish") ||
        inputText.includes("mutated") ||
        inputText.includes("saltwater") ||
        inputText.includes("fresh") ||
        inputText.includes("thing") ||
        inputText.includes("specimen")

    ) {
        fakeLoading(() => {
            addLine(`What type of specimen are you looking for, ${userName}?`, "bot");

            setTimeout(() => {
                showChoices([
                    "Freshwater",
                    "Saltwater",
                    "Mutated"
                ]);
            }, 600);
        });

    } else {
        fakeLoading(() => {
            addThinkingLine("I don't understand.", "bot");
        });
    }
}

// --------------------
// FAKE LOADING
// --------------------

function fakeLoading(callback) {
    const phrases = [
        "Loading...",
        "Interesting...",
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
// CHOICES + ROUTING
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

                // FIRST LEVEL
                if (opt === "Freshwater") {
                    addLine("Freshwater specimens available.", "bot");

                    setTimeout(() => {
                        addLine("Proceed with acquisition?", "bot");
                        showChoices(["Yes", "No"]);
                    }, 800);

                } else if (opt === "Saltwater") {
                    addLine("Saltwater specimens require additional containment.", "bot");

                    setTimeout(() => {
                        addLine("Continue?", "bot");
                        showChoices(["Continue", "Cancel"]);
                    }, 800);

                } else if (opt === "Mutated") {
                    addLine("Warning: Mutations are unstable.", "bot");

                    setTimeout(() => {
                        addLine("Liability waiver required.", "bot");
                        showChoices(["Accept Risk", "Decline"]);
                    }, 800);
                }

                else if (opt === "Yes") {
                    addLine("Access granted.", "bot");
                    setTimeout(() => {
                        showNavigationButton("Buy freshwater", "freshwater");
                    }, 600);

                } else if (opt === "Continue") {
                    addLine("Access granted.", "bot");
                    setTimeout(() => {
                        showNavigationButton("Buy saltwater", "saltwater");
                    }, 600);

                } else if (opt === "Accept Risk") {
                    addLine("Access granted.", "bot");
                    setTimeout(() => {
                        showNavigationButton("Buy mutated", "mutated");
                    }, 600);

                } else if (opt === "No" || opt === "Cancel" || opt === "Decline") {
                    addLine("Request terminated.", "bot");
                }

                else {
                    addLine(`"${opt}" logged.`, "bot");
                }

            });
        });

        wrapper.appendChild(btn);
    });

    output.appendChild(wrapper);
    output.scrollTop = output.scrollHeight;
}