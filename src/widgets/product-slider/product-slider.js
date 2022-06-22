$(document).ready(function () {
  $(".product-slider .slider-container").each(function (i) {
    var swiperProductSlider = new Swiper($(this).find(".swiper-container"), {
      slidesPerView: 4,
      spaceBetween: 0,
      centeredSlides: false,
      loop: true,
      speed: 900,
      allowTouchMove: true,
      slideToClickedSlide: false,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      navigation: {
        prevEl: $(this).find(".custom-slider-nav--prev"),
        nextEl: $(this).find(".custom-slider-nav--next"),
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        1300: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        450: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        300: {
          slidesPerView: 1.5,
          spaceBetween: 10,
        },
      },
    });
  });
});
