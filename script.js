// script.js

document.addEventListener('DOMContentLoaded', function() {
  const terminal = document.getElementById('terminal');
  const lines = [
    { cmd: true, text: "cat about_cyberbirds.txt" },
    { cmd: false, text: ">_ JHU CYBERBIRDS INITIATIVE [v3.1.5]" },
    { cmd: false, text: ">_ STATUS: ACTIVE" },
    { cmd: false, text: ">_ MEMBERS: 75+ ELITE OPERATIVES" },
    { cmd: true, text: "./mission --brief", delay: 1000 },
    { cmd: false, text: ">_ TRAIN NEXT-GEN CYBER WARRIORS" },
    { cmd: false, text: ">_ COMPETE IN NATIONAL CTF EVENTS" },
    { cmd: false, text: ">_ DEVELOP REAL-WORLD SECURITY SKILLS" },
    { cmd: false, textParts: [" >_ sometime the intel you want isn't on the ", "screen", "..."] }
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentElement = null;

  function type() {
    if (lineIndex >= lines.length) {
      const prompt = document.createElement('p');
      prompt.innerHTML = `<span class="text-purple-400">$</span> <span class="blinking-cursor">_</span>`;
      terminal.appendChild(prompt);
      attachInteraction(); // enable link interaction after typing finishes
      return;
    }

    const line = lines[lineIndex];

    if (charIndex === 0) {
      currentElement = document.createElement('p');

      // add command styling
      if (line.cmd) {
        currentElement.innerHTML = `<span class="text-purple-400">$ ${line.text.charAt(0) || ""}</span>`;
      } else if (lines[lineIndex - 1]?.cmd) {
        currentElement.classList.add('mt-4');
      }

      terminal.appendChild(currentElement);

      // handle lines with textParts (screen link)
      if (line.textParts) {
        const before = document.createElement('span');
        before.textContent = line.textParts[0];
        currentElement.appendChild(before);

        const a = document.createElement('a');
        a.className = 'text-blue-300 hover:text-blue-200'; // blue without underline
        a.id = 'screen-link';
        a.href = '#clue';
        a.textContent = line.textParts[1];
        currentElement.appendChild(a);

        const after = document.createElement('span');
        after.textContent = line.textParts[2] || '';
        currentElement.appendChild(after);

        lineIndex++;
        charIndex = 0;
        setTimeout(type, line.delay || 400);
        return;
      }
    }

    if (line.text && charIndex < line.text.length) {
      if (line.cmd) {
        // wrap typed text in purple span for commands
        currentElement.innerHTML = `<span class="text-purple-400">$ ${line.text.slice(0, charIndex + 1)}</span>`;
      } else {
        currentElement.textContent += line.text[charIndex];
      }
      charIndex++;
      setTimeout(type, 30); // typing speed
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(type, line.delay || 300);
    }
  }

  function attachInteraction() {
    const screenLink = document.getElementById('screen-link');
    if (!screenLink) return;

    let clicked = false;
    screenLink.addEventListener('click', function(e) {
      e.preventDefault();
      if (clicked) return; // block multiple clicks
      clicked = true;
      showClue();
      screenLink.classList.add('pointer-events-none', 'opacity-70');
    });
  }

  function showClue() {
    const p = document.createElement('p');
    p.className = 'mt-2 text-green-400';
    p.textContent = '>_ Small hint: open DevTools (Inspect Element) or View Source and search for a comment.';
    terminal.appendChild(p);
    terminal.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  type();
});
