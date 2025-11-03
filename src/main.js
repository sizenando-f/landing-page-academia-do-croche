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
  // CÓDIGO DO TIMER DE CONTAGEM REGRESSIVA
  //-----------------------------------------------------
  const countdownElement = document.getElementById("countdown-timer");
  if (countdownElement) {
    let countdownEndTime = localStorage.getItem("countdownEndTime");

    if (!countdownEndTime || new Date().getTime() > countdownEndTime) {
      const fifteenMinutesFromNow = new Date().getTime() + 15 * 60 * 1000;
      localStorage.setItem("countdownEndTime", fifteenMinutesFromNow);
      countdownEndTime = fifteenMinutesFromNow;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = countdownEndTime - now;

      if (diff <= 0) {
        countdownElement.innerHTML = "00:00";
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      countdownElement.innerHTML = `${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
    }, 1000);
  }

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
  // CARROSSEL DE VÍDEO COM AUTOPLAY INTELIGENTE
  //-----------------------------------------------------
  let isCarouselVisible = false;

  const videoSwiper = new Swiper(".videoSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      init: handleVideoState,
      slideChange: handleVideoState,
    },
  });

  function handleVideoState(swiper) {
    swiper.slides.forEach((slide) => {
      const video = slide.querySelector("video");
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });

    const activeVideo =
      swiper.slides[swiper.activeIndex]?.querySelector("video");

    if (activeVideo) {
      if (isCarouselVisible) {
        activeVideo.play();
      }

      activeVideo.addEventListener(
        "ended",
        () => {
          swiper.slideNext();
        },
        { once: true }
      );
    }
  }

  const videoSection = document.getElementById("prova-visual");

  if (videoSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const activeVideo =
            videoSwiper.slides[videoSwiper.activeIndex]?.querySelector("video");
          if (!activeVideo) return;

          if (entry.isIntersecting) {
            isCarouselVisible = true;
            activeVideo.play();
          } else {
            isCarouselVisible = false;
            activeVideo.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoSection);
  }

  //-----------------------------------------------------
  // LÓGICA DE PLAY/PAUSE AO CLICAR NO VÍDEO (NOVA FUNÇÃO)
  //-----------------------------------------------------
  const allVideos = document.querySelectorAll(".videoSwiper video");
  allVideos.forEach((video) => {
    video.addEventListener("click", () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
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
    // 1. Pega um nome aleatório da lista
    const randomName = names[Math.floor(Math.random() * names.length)];

    // 2. Atualiza o texto do pop-up
    popupText.textContent = `${randomName} acabou de comprar!`;

    // 3. Mostra o pop-up com a animação
    popup.classList.remove("opacity-0", "-translate-y-20");
    popup.classList.add("opacity-100", "translate-y-0");

    // 4. Define um tempo para esconder o pop-up (3 segundos)
    setTimeout(() => {
      popup.classList.remove("opacity-100", "translate-y-0");
      popup.classList.add("opacity-0", "-translate-y-20");

      // 5. Agenda a próxima aparição
      scheduleNextPopup();
    }, 3000); // Tempo que o pop-up fica visível
  }

  // Função para agendar o próximo pop-up
  function scheduleNextPopup() {
    // 6. Define um intervalo aleatório (entre 5 e 20 segundos)
    const randomInterval =
      Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;

    setTimeout(showSocialProof, randomInterval);
  }

  // Inicia o ciclo (o primeiro pop-up aparecerá após 7 segundos)
  setTimeout(scheduleNextPopup, 7000);
});
