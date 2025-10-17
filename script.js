const video = document.getElementById("main-video");
const imageSection = document.getElementById("image-section");
const cards = document.querySelectorAll(".card");
let current = 0;

// Try to play with sound
window.addEventListener("load", () => {
  video.muted = false;
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      video.muted = true;
      video.play();
    });
  }
});

// Show image + animation when video ends
video.addEventListener("ended", () => {
  video.style.display = "none";
  imageSection.style.display = "flex";
  imageSection.classList.add("show");
  startSlider();
});

// --- HORIZONTAL CAROUSEL SLIDER ---
function startSlider() {
  let currentIndex = 0;
  const totalCards = cards.length;

  function updateCards() {
    cards.forEach((card, index) => {
      // Remove all position classes
      card.classList.remove("center", "left", "right", "far-left", "far-right");

      // Calculate position difference
      let diff = index - currentIndex;

      // Normalize the difference for circular loop
      // For 3 cards: if diff is 2, it should be -1 (closer on the left)
      // For 3 cards: if diff is -2, it should be 1 (closer on the right)
      if (diff > totalCards / 2) {
        diff -= totalCards;
      } else if (diff < -totalCards / 2) {
        diff += totalCards;
      }

      // Assign class based on position
      if (diff === 0) {
        card.classList.add("center");
      } else if (diff === -1) {
        card.classList.add("left");
      } else if (diff === 1) {
        card.classList.add("right");
      } else if (diff < -1) {
        card.classList.add("far-left");
      } else if (diff > 1) {
        card.classList.add("far-right");
      }
    });
  }

  // Initialize positions
  updateCards();

  // Change card every 3 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCards();
  }, 3000);
}
