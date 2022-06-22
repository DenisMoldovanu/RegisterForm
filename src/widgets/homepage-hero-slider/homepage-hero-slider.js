$(document).ready(function () {
  $(".hero-slider").each(function () {
    var heroBranding = new Swiper($(this).find(".swiper-container"), {
      direction: "horizontal",
      centeredSlides: false,
      speed: 900,
      loop: false,
      slidesPerView: 1,
      navigation: {
        prevEl: $(this).find(".hero-slider-nav--prev"),
        nextEl: $(this).find(".hero-slider-nav--next"),
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        992: {
          allowTouchMove: false,
        },
        300: {
          allowTouchMove: true,
        },
      },
    });
  });
});
