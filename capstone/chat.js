// --------------------
// USER NAME FROM STORAGE
// --------------------
const savedName = sessionStorage.getItem("fihUser") || "User";

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

function addLine(text, className = "bot", speed = 20) {
    const line = document.createElement("p");
    line.className = className;
    output.appendChild(line);

    let i = 0;

    function typeChar() {
        if (i < text.length) {
            line.textContent += text.charAt(i);
            i++;

            if (className === "bot") {
                playBeep();
            }

            output.scrollTop = output.scrollHeight;
            setTimeout(typeChar, speed);
        }
    }

    typeChar();
}

/* =========================
   THINKING LINE (... + PAUSE)
========================= */

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
            // pause after dots
            setTimeout(() => {
                typeRest(finalText);
            }, 900);
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

/* =========================
   INITIAL BOOT
========================= */

addLine("F.I.H. SYSTEM ONLINE...", "bot");

setTimeout(() => {
    addLine(`Hello, ${userName}. How may I help you today?`, "bot");
}, 800);

/* =========================
   INPUT HANDLER
========================= */

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const value = input.value.trim();
        if (!value) return;

        input.value = "";

        addUserLine(">> " + value);

        handleResponse(value.toLowerCase());
    }
});

function addUserLine(text) {
    const line = document.createElement("p");
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

/* =========================
   RESPONSE ENGINE
========================= */

function handleResponse(inputText) {

    if (inputText.includes("hello")) {
        fakeLoading(() => {
            addLine("Hi. State your request.", "bot");
        });

    } else if (inputText.includes("fih")) {
        fakeLoading(() => {
            addLine("F.I.H. stands for Future Ichykoid Habitation.", "bot");

            setTimeout(() => {
                addLine("F.I.H. specializes in the collection, refinement, and homing of advanced ichthyoid specimens originating in the New River. By aligning biological innovation with controlled environments, we make accelerated evolution accessible.", "bot");
            }, 800);
        });

    } else if (
        inputText.includes("buy") ||
        inputText.includes("fish") ||
        inputText.includes("stuff") ||
        inputText.includes("thing") ||
        inputText.includes("item") ||
        inputText.includes("specimen")
    ) {
        fakeLoading(() => {
            addLine(`What type of specimen are you looking for, ${userName}?`, "bot");

            setTimeout(() => {
                showDropdown([
                    "Freshwater",
                    "Saltwater",
                    "Mutated Class C"
                ]);
            }, 600);
        });

    } else if (inputText.includes("price")) {
        fakeLoading(() => {
            addLine("Our prices start at $10.", "bot");
        });

    } else if (inputText.includes("shipping")) {
        fakeLoading(() => {
            addLine("Shipping cost depends on location.", "bot");
        });

    } else if (
        inputText.includes("fuck") ||
        inputText.includes("hate") ||
        inputText.includes("ass") ||
        inputText.includes("ignorant") ||
        inputText.includes("stupid") ||
        inputText.includes("balls") ||
        inputText.includes("shit")
    ) {
        fakeLoading(() => {
            addLine("Input flagged. Please maintain appropriate language.", "bot");
        });

    } else if (
        inputText.includes("store") ||
        inputText.includes("shop") ||
        inputText.includes("place") ||
        inputText.includes("location") ||
        inputText.includes("market")
    ) {
        fakeLoading(() => {
            addLine("Shop opens on May, 8, 2026. Future purchases can be found on storefront.", "bot");
        });

    } else if (
        inputText.includes("wrong") ||
        inputText.includes("bad") ||
        inputText.includes("torture") ||
        inputText.includes("evil") ||
        inputText.includes("awful") ||
        inputText.includes("safe") ||
        inputText.includes("not good")
    ) {
        fakeLoading(() => {
            addLine(`${userName}, I understand your concern, but F.I.H. is designed to help.`, "bot");
        });

    } else if (
        inputText.includes("help") ||
        inputText.includes("aid")
    ) {
        fakeLoading(() => {
            addLine(`We intercept emergent species before uncontrolled spread. We stabilize viable specimens in contained habitats. We regulate reproduction. And we prepare them for controlled domestic integration.`, "bot");
        });

    } else {
        fakeLoading(() => {
            addThinkingLine(" I don't understand.", "bot");
        });
    }
}

/* =========================
   FAKE LOADING
========================= */

function fakeLoading(callback) {
    const phrases = [
        "Loading...",
        "Should've said that since the beginning...",
        "Interesting...",
        "Oh... okay...",
        "Interpreting request...",
        "Wasting my time..."
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

/* =========================
   DROPDOWN SYSTEM
========================= */

function showDropdown(options) {
    const wrapper = document.createElement("div");
    const select = document.createElement("select");

    const defaultOption = document.createElement("option");
    defaultOption.textContent = "-- select --";
    defaultOption.disabled = true;
    defaultOption.selected = true;

    select.appendChild(defaultOption);

    options.forEach(opt => {
        const option = document.createElement("option");
        option.textContent = opt;
        select.appendChild(option);
    });

    wrapper.appendChild(select);
    output.appendChild(wrapper);
    output.scrollTop = output.scrollHeight;

    select.addEventListener("change", function () {
        const choice = this.value;

        addUserLine(">> " + choice);
        wrapper.remove();

        fakeLoading(() => {

            if (choice === "Freshwater") {
                addLine("Freshwater specimens available.", "bot");

                setTimeout(() => {
                    addLine("Proceed with acquisition?", "bot");
                    showDropdown(["Yes", "No"]);
                }, 800);

            } else if (choice === "Saltwater") {
                addLine("Saltwater specimens require additional containment.", "bot");

                setTimeout(() => {
                    addLine("Continue?", "bot");
                    showDropdown(["Continue", "Cancel"]);
                }, 800);

            } else if (choice === "Mutated Class C") {
                addLine("Warning: Class C mutations are unstable.", "bot");

                setTimeout(() => {
                    addLine("Liability waiver required.", "bot");
                    showDropdown(["Accept Risk", "Decline"]);
                }, 800);
                

            } else {
                addLine(`"${choice}" logged. Preparing next step...`, "bot");
            }

        });
    });
}