const video = document.getElementById("main-video");
const imageSection = document.getElementById("image-section");
const cards = document.querySelectorAll(".card");
let current = 0;

// Intentar reproducir con sonido
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

// Mostrar imagen + animación al finalizar el video
video.addEventListener("ended", () => {
  video.style.display = "none";
  imageSection.style.display = "flex";
  imageSection.classList.add("show");
  startSlider();
});

// --- SLIDER CARRUSEL HORIZONTAL ---
function startSlider() {
  let currentIndex = 0;
  const totalCards = cards.length;

  function updateCards() {
    cards.forEach((card, index) => {
      // Remover todas las clases de posición
      card.classList.remove("center", "left", "right", "far-left", "far-right");

      // Calcular la diferencia de posición
      let diff = index - currentIndex;

      // Normalizar la diferencia para loop circular
      // Para 3 cartas: si diff es 2, debería ser -1 (más cerca por la izquierda)
      // Para 3 cartas: si diff es -2, debería ser 1 (más cerca por la derecha)
      if (diff > totalCards / 2) {
        diff -= totalCards;
      } else if (diff < -totalCards / 2) {
        diff += totalCards;
      }

      // Asignar la clase según la posición
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

  // Inicializar posiciones
  updateCards();

  // Cambiar de carta cada 3 segundos
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCards();
  }, 3000);
}
