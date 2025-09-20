import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

const elementoData = document.getElementById("data-atual");

const hoje = new Date();

const opcoesDeFormato = { day: "2-digit", month: "2-digit", year: "numeric" };
const dataFormatada = hoje.toLocaleDateString("pt-BR", opcoesDeFormato);

if (elementoData) {
  elementoData.textContent = dataFormatada;
}

const elementoData2 = document.getElementById("data-atual-2");

if (elementoData2) {
  elementoData2.textContent = dataFormatada;
}

const testimonialSwiper = new Swiper(".testimonialSwiper", {
  // Ativa o loop, essencial para quando se tem muitos slides
  loop: true,

  // Configuração para o autoplay (passar sozinho)
  autoplay: {
    delay: 3000, // Passa a cada 3 segundos
    disableOnInteraction: false, // Não para o autoplay se o usuário interagir com as setas
  },

  // Quantos slides aparecerão ao mesmo tempo (ótimo para responsividade)
  slidesPerView: 1,
  spaceBetween: 20, // Espaço entre os slides

  // Define quantos slides mostrar em telas maiores
  breakpoints: {
    // A partir de 768px de largura
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    // A partir de 1024px de largura
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },

  // Paginação (as bolinhas)
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // ATIVAÇÃO DAS SETAS (A PARTE NOVA E IMPORTANTE)
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//======================================================================
// CÓDIGO DO TIMER DE CONTAGEM REGRESSIVA
//======================================================================
function startCountdown() {
  const countdownElement = document.getElementById("countdown-timer");
  if (!countdownElement) return; // Não faz nada se o elemento não existir

  const interval = setInterval(() => {
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    ); // Meia-noite de hoje
    const diff = midnight - now;

    if (diff <= 0) {
      countdownElement.innerHTML = "00h 00m 00s";
      clearInterval(interval);
      return;
    }

    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${String(hours).padStart(2, "0")}h ${String(
      minutes
    ).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
  }, 1000);
}

//======================================================================
// INICIALIZAÇÃO DE TUDO QUANDO A PÁGINA CARREGA
//======================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa o carrossel (se você já tiver, não precisa duplicar)
  const testimonialSwiper = new Swiper(".testimonialSwiper", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 30 },
      1024: { slidesPerView: 3, spaceBetween: 40 },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Inicializa o timer
  startCountdown();
});
