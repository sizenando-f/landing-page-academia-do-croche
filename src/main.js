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
