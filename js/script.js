// ============================================
// CONFIGURATION - I-EDIT MO DITO
// ============================================
const CONFIG = {
  password: "loveydovy",
  anniversaryDate: "2026-07-08T00:00:00",
};

// ============================================
// FALLING HEARTS ANIMATION
// ============================================
function createFallingHearts(containerId, count = 20) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const heartSymbols = ['💕', '💖', '💗', '💓', '❤️', '💝'];

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    container.appendChild(heart);
  }
}

createFallingHearts('fallingHearts', 25);
createFallingHearts('fallingHeartsMain', 15);

// ============================================
// COUNTDOWN - MINI (Lock Screen)
// ============================================
function updateMiniCountdown() {
  const now = new Date().getTime();
  const anniversary = new Date(CONFIG.anniversaryDate).getTime();
  const distance = anniversary - now;

  const daysEl = document.getElementById('days');
  if (!daysEl) return;

  if (distance < 0) {
    daysEl.textContent = "0";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  daysEl.textContent = days;
}

updateMiniCountdown();
setInterval(updateMiniCountdown, 1000 * 60);

// ============================================
// COUNTDOWN - FULL (Hero Section)
// ============================================
function updateFullCountdown() {
  const now = new Date().getTime();
  const anniversary = new Date(CONFIG.anniversaryDate).getTime();
  const distance = anniversary - now;

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (!daysEl) return;

  if (distance < 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minsEl.textContent = "00";
    secsEl.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minsEl.textContent = String(mins).padStart(2, '0');
  secsEl.textContent = String(secs).padStart(2, '0');
}

setInterval(updateFullCountdown, 1000);
updateFullCountdown();

// ============================================
// PASSWORD / LOCK SCREEN LOGIC
// ============================================
const passwordInput = document.getElementById('passwordInput');
const unlockBtn = document.getElementById('unlockBtn');
const errorMsg = document.getElementById('errorMsg');
const lockScreen = document.getElementById('lockScreen');
const mainContent = document.getElementById('mainContent');

function checkPassword() {
  const enteredPassword = passwordInput.value.trim().toLowerCase();

  if (enteredPassword === CONFIG.password.toLowerCase()) {
    lockScreen.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    lockScreen.style.opacity = "0";
    lockScreen.style.transform = "scale(1.1)";

    setTimeout(() => {
      lockScreen.classList.add('hidden');
      mainContent.classList.remove('hidden');
      triggerConfettiWelcome();
    }, 800);

  } else {
    errorMsg.textContent = "Mali yan! Subukan mo ulit 😊";
    passwordInput.value = "";
    passwordInput.focus();
    
    passwordInput.style.animation = "none";
    setTimeout(() => {
      passwordInput.style.animation = "shake 0.5s ease";
    }, 10);
  }
}

unlockBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    checkPassword();
  }
});

const shakeStyle = document.createElement('style');
shakeStyle.innerHTML = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`;
document.head.appendChild(shakeStyle);

// ============================================
// CONFETTI WELCOME
// ============================================
function triggerConfettiWelcome() {
  const colors = ['#ff6b9d', '#ff8fab', '#ffb3c6', '#dc143c', '#ffffff'];
  const confettiCount = 60;

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
    }, i * 20);
  }
}

function createConfettiPiece(color) {
  const confetti = document.createElement('div');
  confetti.style.position = 'fixed';
  confetti.style.width = '10px';
  confetti.style.height = '10px';
  confetti.style.background = color;
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.top = '-10px';
  confetti.style.borderRadius = '50%';
  confetti.style.zIndex = '9998';
  confetti.style.pointerEvents = 'none';
  document.body.appendChild(confetti);

  const duration = Math.random() * 2 + 2;
  const horizontalMove = (Math.random() - 0.5) * 200;

  confetti.animate([
    { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
    { transform: `translate(${horizontalMove}px, 100vh) rotate(720deg)`, opacity: 0 }
  ], {
    duration: duration * 1000,
    easing: 'ease-out'
  });

  setTimeout(() => confetti.remove(), duration * 1000);
}

// ============================================
// CURSOR EFFECT
// ============================================
const canvas = document.getElementById('cursorCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 8 + 4;
    this.speedX = (Math.random() - 0.5) * 3;
    this.speedY = (Math.random() - 0.5) * 3 - 2;
    this.life = 1;
    this.symbol = Math.random() > 0.5 ? '💕' : '✨';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 0.02;
    this.size *= 0.98;
  }

  draw() {
    ctx.globalAlpha = this.life;
    ctx.font = this.size + 'px Arial';
    ctx.fillText(this.symbol, this.x, this.y);
    ctx.globalAlpha = 1;
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

let lastMouseMove = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastMouseMove > 50) {
    particles.push(new Particle(e.clientX, e.clientY));
    lastMouseMove = now;
  }
});

document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  for (let i = 0; i < 8; i++) {
    particles.push(new Particle(touch.clientX, touch.clientY));
  }
});

document.addEventListener('click', (e) => {
  for (let i = 0; i < 6; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

// ============================================
// MUSIC PLAYER
// ============================================
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const musicPrevBtn = document.getElementById('prevBtn');
const musicNextBtn = document.getElementById('nextBtn');
const songTitle = document.getElementById('songTitle');

const playlist = [
  { title: "The Ridley Be With You", src: "music/song1.mp3" },
  { title: "The Ridleys Aphrodisiac", src: "music/song2.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(index) {
  const song = playlist[index];
  audioPlayer.src = song.src;
  songTitle.textContent = song.title;
}

function playSong() {
  audioPlayer.play().catch(err => {
    console.log("Autoplay blocked, need user interaction first:", err);
  });
  isPlaying = true;
  playPauseBtn.textContent = "⏸️";
}

function pauseSong() {
  audioPlayer.pause();
  isPlaying = false;
  playPauseBtn.textContent = "▶️";
}

playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

musicNextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
  if (isPlaying) playSong();
});

musicPrevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
  if (isPlaying) playSong();
});

audioPlayer.addEventListener('ended', () => {
  musicNextBtn.click();
});

loadSong(currentSongIndex);

// ============================================
// REASON CARDS - FLIP ON CLICK
// ============================================
const reasonCards = document.querySelectorAll('.reason-card');

reasonCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// ============================================
// GALLERY CAROUSEL (Reusable - gagana sa page at sa modal)
// ============================================
function setupCarousel(carousel) {
  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.prev-btn');
  const nextBtn = carousel.querySelector('.next-btn');
  const dotsContainer = carousel.querySelector('.carousel-dots');

  let currentIndex = 0;
  const totalSlides = slides.length;

  dotsContainer.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(i);
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  }

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevSlide();
    resetAutoSlide();
  });

  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    if (diff > swipeThreshold) {
      nextSlide();
      resetAutoSlide();
    } else if (diff < -swipeThreshold) {
      prevSlide();
      resetAutoSlide();
    }
  }

  let autoSlideInterval = setInterval(nextSlide, 5000);

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  carousel._autoSlideInterval = autoSlideInterval;
  carousel._clearAutoSlide = () => clearInterval(autoSlideInterval);
}

function initAllCarousels() {
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach(carousel => setupCarousel(carousel));
}

initAllCarousels();

// ============================================
// TIMELINE CARD MODAL (Pop-up sa gitna ng screen)
// ============================================
const cardModal = document.getElementById('cardModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

function openCardModal(originalContent) {
  modalBody.innerHTML = '';

  const clone = originalContent.cloneNode(true);
  modalBody.appendChild(clone);

  const clonedCarousel = clone.querySelector('[data-carousel]');
  if (clonedCarousel) {
    setupCarousel(clonedCarousel);
  }

  cardModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCardModal() {
  cardModal.classList.remove('active');
  document.body.style.overflow = '';

  const clonedCarousel = modalBody.querySelector('[data-carousel]');
  if (clonedCarousel && clonedCarousel._clearAutoSlide) {
    clonedCarousel._clearAutoSlide();
  }

  setTimeout(() => {
    modalBody.innerHTML = '';
  }, 300);
}

document.querySelectorAll('.timeline-content').forEach(content => {
  content.addEventListener('click', () => {
    openCardModal(content);
  });
});

modalClose.addEventListener('click', closeCardModal);
modalOverlay.addEventListener('click', closeCardModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && cardModal.classList.contains('active')) {
    closeCardModal();
  }
});

// ============================================
// TIMELINE - SCROLL ANIMATION
// ============================================
const timelineItems = document.querySelectorAll('.timeline-item');

const observerOptions = {
  threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

timelineItems.forEach(item => {
  observer.observe(item);
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

console.log("💕 Loveydovy 15th Monthsary Website - Loaded Successfully!");