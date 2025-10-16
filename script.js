const video = document.getElementById('main-video');
const imageSection = document.getElementById('image-section');
const cards = document.querySelectorAll('.card');
let current = 0;

// Intentar reproducir con sonido
window.addEventListener('load', () => {
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
video.addEventListener('ended', () => {
  video.style.display = 'none';
  imageSection.style.display = 'flex';
  imageSection.classList.add('show');
  startSlider();
});

// --- ANIMACIÓN DE CARTAS ---
function startSlider() {
  cards[current].classList.add('active');
  const total = cards.length;

  setInterval(() => {
    cards[current].classList.remove('active');
    current = (current + 1) % total;
    cards[current].classList.add('active');
  }, 3000);
}
