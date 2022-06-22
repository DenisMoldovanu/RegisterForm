$(document).ready(function () {
  if (window.matchMedia("(max-width: 991px)").matches) {
    let mobileFeatures = $(".features-header");
    $(".features-header-mobile").append(mobileFeatures);
  }

  $(".burger-menu").click(function () {
    $("#myNav").addClass("active-mobile-menu");
    $(".background-modal-menu").show();
  });

  $(".closebtn").click(function () {
    $("#myNav").removeClass("active-mobile-menu");
    $(".background-modal-menu").hide();
  });
});
