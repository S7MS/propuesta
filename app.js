const btnSi = document.getElementById('btnSi');
const btnNo = document.getElementById('btnNo');
const felicidades = document.getElementById('felicidades');
const confetti = document.getElementById('confetti');

// --- Confetti emojis ---
function lanzarConfetti() {
  for (let i = 0; i < 90; i++) {
    const span = document.createElement('span');
    span.textContent = ['💖', '✨', '🎉', '💍', '🎊'][Math.floor(Math.random() * 5)];
    span.style.position = 'absolute';
    span.style.left = Math.random() * 100 + '%';
    span.style.top = '-10px';
    span.style.fontSize = (16 + Math.random() * 22) + 'px';
    span.style.transition = 'transform 2.2s ease-in, opacity 2.2s';
    confetti.appendChild(span);
    const tx = (Math.random() - .5) * 200;
    const ty = 80 + Math.random() * 100;
    requestAnimationFrame(() => {
      span.style.transform = `translate(${tx}px, ${ty}vh) rotate(${Math.random() * 720}deg)`;
      span.style.opacity = '0';
    });
    setTimeout(() => span.remove(), 2400);
  }
}

// --- Botón SÍ ---
btnSi.addEventListener('click', () => {
  felicidades.classList.remove('hidden');
  lanzarConfetti();
  try { navigator.vibrate && navigator.vibrate(80); } catch { }
});

// --- Botón NO esquiva el mouse y vuelve a su lugar después de 3 movimientos ---
const originalRect = btnNo.getBoundingClientRect();
const originalLeft = originalRect.left;
const originalTop = originalRect.top;
let noMoveCount = 0;

function moverNo() {
  noMoveCount++;
  const rect = btnNo.getBoundingClientRect();
  const maxX = window.innerWidth - rect.width;
  const maxY = window.innerHeight - rect.height;
  const nx = Math.random() * maxX;
  const ny = Math.random() * (maxY - 50) + 25;
  btnNo.style.position = 'fixed';
  btnNo.style.left = nx + 'px';
  btnNo.style.top = ny + 'px';
  btnNo.style.transition = 'left 0.3s, top 0.3s';

  if (noMoveCount >= 3) {
    setTimeout(() => {
      btnNo.style.left = originalLeft + 'px';
      btnNo.style.top = originalTop + 'px';
      noMoveCount = 0;
    }, 600); // vuelve rápido después del tercer movimiento
  }
}

btnNo.addEventListener('mouseenter', moverNo);
btnNo.addEventListener('mousemove', moverNo);