$(document).ready(function () {
  $(".toggle-close-button").click(function () {
    $(".close-fixed-btns").toggleClass("hide-icon");
    $(".phone-icon").toggleClass("hide-icon");
    $(".call-buttons").toggleClass("hide-overlay");
  });
});
