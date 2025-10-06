// --- GLOBAL SCROLL COLOR FADE ---
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = docHeight - winHeight;
    const scrollRatio = maxScroll > 0 ? scrollTop / maxScroll : 0;

    // Background colors: white -> blue -> black
    const startBg = [255, 255, 255];  // white
    const midBg = [32, 118, 199];     // mid blue
    const endBg = [0, 0, 0];          // black

    let bgR, bgG, bgB;
    if (scrollRatio < 0.5) {
        const r = scrollRatio * 2;
        bgR = Math.round(startBg[0] + (midBg[0] - startBg[0]) * r);
        bgG = Math.round(startBg[1] + (midBg[1] - startBg[1]) * r);
        bgB = Math.round(startBg[2] + (midBg[2] - startBg[2]) * r);
    } else {
        const r = (scrollRatio - 0.5) * 2;
        bgR = Math.round(midBg[0] + (endBg[0] - midBg[0]) * r);
        bgG = Math.round(midBg[1] + (endBg[1] - midBg[1]) * r);
        bgB = Math.round(midBg[2] + (endBg[2] - midBg[2]) * r);
    }

    document.body.style.backgroundColor = `rgb(${bgR}, ${bgG}, ${bgB})`;

    // Text colors: black -> white
    const startText = [0, 0, 0];      // black
    const endText = [255, 255, 255];  // white
    const textR = Math.round(startText[0] + (endText[0] - startText[0]) * scrollRatio);
    const textG = Math.round(startText[1] + (endText[1] - startText[1]) * scrollRatio);
    const textB = Math.round(startText[2] + (endText[2] - startText[2]) * scrollRatio);

    // Update CSS variable --text-color for all text
    document.body.style.setProperty('--text-color', `rgb(${textR}, ${textG}, ${textB})`);
});

