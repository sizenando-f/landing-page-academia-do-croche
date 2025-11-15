//======================================================================
// FUNÇÃO PRINCIPAL QUE RODA QUANDO A PÁGINA TERMINA DE CARREGAR
//======================================================================
document.addEventListener("DOMContentLoaded", () => {
  //-----------------------------------------------------
  // LÓGICA PARA EXIBIR A DATA ATUAL
  //-----------------------------------------------------
  const hoje = new Date();
  const opcoesDeFormato = { day: "2-digit", month: "2-digit", year: "numeric" };
  const dataFormatada = hoje.toLocaleDateString("pt-BR", opcoesDeFormato);

  const elementoData = document.getElementById("data-atual");
  if (elementoData) {
    elementoData.textContent = dataFormatada;
  }
  const elementoData2 = document.getElementById("data-atual-2");
  if (elementoData2) {
    elementoData2.textContent = dataFormatada;
  }

  //-----------------------------------------------------
  // CÓDIGO DO TIMER DE CONTAGEM REGRESSIVA (REMOVIDO DA SEÇÃO URGÊNCIA, CONFORME NOVA COPY)
  //-----------------------------------------------------
  // A nova copy da seção urgência não pede mais um timer de 15 minutos,
  // então essa lógica foi removida para não dar erro.
  // Se precisar dela de volta, podemos readicionar.

  // (Lógica do timer de 15min removida)

  //-----------------------------------------------------
  // CARROSSEL DE DEPOIMENTOS
  //-----------------------------------------------------
  new Swiper(".testimonialSwiper", {
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

  //-----------------------------------------------------
  // NOVO CARROSSEL DE BÔNUS
  //-----------------------------------------------------
  new Swiper(".bonusSwiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,

    // ADICIONADO AUTOPLAY
    autoplay: {
      delay: 4000, // Tempo de 4 segundos (um pouco mais para dar tempo de ler)
      disableOnInteraction: false, // Continua mesmo se o usuário mexer
    },

    // Mostra mais bônus em telas maiores
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 30 },
      1024: { slidesPerView: 3, spaceBetween: 30 },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  //-----------------------------------------------------
  // LÓGICA DO POP-UP DE PROVA SOCIAL
  //-----------------------------------------------------
  const popup = document.getElementById("social-proof-popup");
  const popupText = document.getElementById("popup-text");

  // Lista de nomes (pode adicionar quantos quiser)
  const names = [
    "Julia",
    "Mariana",
    "Ana",
    "Carla",
    "Fernanda",
    "Beatriz",
    "Luiza",
    "Manuela",
    "Sofia",
    "Isabela",
    "Laura",
    "Camila",
    "Gabriela",
    "Patrícia",
    "Amanda",
    "Larissa",
    "Clara",
    "Vitória",
    "Bianca",
    "Helena",
    "Alice",
    "Maria",
    "Eduarda",
    "Lívia",
    "Valentina",
    "Giovanna",
    "Letícia",
    "Bruna",
    "Jéssica",
    "Sandra",
    "Regina",
    "Márcia",
    "Vanessa",
    "Paula",
    "Aline",
    "Adriana",
    "Carolina",
    "Raquel",
    "Elisa",
    "Daniela",
    "Cristina",
    "Sara",
    "Rafaela",
    "Natália",
    "Lorena",
    "Yasmin",
    "Isadora",
    "Cecília",
    "Melissa",
    "Elaine",
    "Sônia",
    "Mônica",
    "Tatiane",
    "Silvia",
    "Catarina",
    "Rebeca",
    "Juliana",
    "Aparecida",
    "Marta",
    "Luciana",
    "Taís",
    "Débora",
    "Ester",
    "Rosana",
    "Eliane",
    "Marcela",
    "Heloísa",
    "Diana",
    "Simone",
    "Denise",
    "Vera",
    "Andressa",
    "Jaqueline",
    "Cíntia",
    "Leticia",
    "Brenda",
    "Eva",
    "Nicole",
    "Sarah",
    "Olivia",
    "Agatha",
    "Eliza",
    "Alessandra",
    "Esther",
    "Renata",
    "Michele",
    "Priscila",
    "Bárbara",
    "Sabrina",
    "Talita",
    "Diana",
    "Elisângela",
    "Fátima",
    "Isis",
    "Joana",
    "Luan",
  ];

  // Função para mostrar o pop-up
  function showSocialProof() {
    if (!popup || !popupText) return; // Garante que os elementos existem

    const randomName = names[Math.floor(Math.random() * names.length)];
    popupText.textContent = `${randomName} acabou de comprar!`;

    popup.classList.remove("opacity-0", "-translate-y-20");
    popup.classList.add("opacity-100", "translate-y-0");

    setTimeout(() => {
      popup.classList.remove("opacity-100", "translate-y-0");
      popup.classList.add("opacity-0", "-translate-y-20");
      scheduleNextPopup();
    }, 3000);
  }

  // Função para agendar o próximo pop-up
  function scheduleNextPopup() {
    const randomInterval =
      Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
    setTimeout(showSocialProof, randomInterval);
  }

  // Inicia o ciclo (o primeiro pop-up aparecerá após 7 segundos)
  setTimeout(scheduleNextPopup, 7000);
});
