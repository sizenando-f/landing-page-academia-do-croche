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
});
