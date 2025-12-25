// --- 1. TYPING EFFECT ---
const textElement = document.getElementById("typing-text");
const words = [
  "MERN Stack Developer.",
  "Software Developer.",
  "DSA Enthusiast.",
  "Problem Solver.",
];

let i = 0;

function typeLoop() {
  let word = words[i];
  let letterIndex = 0;

  function type() {
    if (letterIndex < word.length) {
      textElement.textContent += word.charAt(letterIndex);
      letterIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 2000);
    }
  }

  function erase() {
    if (letterIndex > 0) {
      textElement.textContent = textElement.textContent.slice(0, -1);
      letterIndex--;
      setTimeout(erase, 50);
    } else {
      i = (i + 1) % words.length;
      typeLoop(); // 🔁 start next word
    }
  }

  textElement.textContent = ""; // ✅ important reset
  type();
}

typeLoop();

// --- 2. CUSTOM CURSOR FOLLOWER ---
const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursor-dot");

document.addEventListener("mousemove", (e) => {
  cursorDot.style.left = e.clientX + "px";
  cursorDot.style.top = e.clientY + "px";

  // Add slight delay for the outer circle
  setTimeout(() => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }, 80);
});

// Hover effect for cursor
document
  .querySelectorAll("a, button, .project-card, .skill-item")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(2)";
      cursor.style.borderColor = "var(--primary)";
      cursor.style.backgroundColor = "rgba(99, 102, 241, 0.1)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.borderColor = "var(--secondary)";
      cursor.style.backgroundColor = "transparent";
    });
  });

// --- 3. 3D TILT EFFECT ---
const cards = document.querySelectorAll("[data-tilt]");
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  });
});
