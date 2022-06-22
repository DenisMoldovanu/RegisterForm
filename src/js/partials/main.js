$(document).ready(function (e) {
  $(function () {
    $("select").selectpicker();
  });

  // add class chrome-mac
  if (navigator.userAgent.indexOf("Mac OS X") != -1) {
    if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
    var isChrome = !!window.chrome;
    if (OSName == "MacOS" && isChrome == true) {
      $("body").addClass("chrome-mac");
    }
  }

  // add class safari-mac
  $(function () {
    if (
      navigator.userAgent.indexOf("Safari") != -1 &&
      navigator.userAgent.indexOf("Chrome") == -1
    ) {
      $("body").addClass("safari-mac");
    }
  });

  //Check device os is Windows (For Laptop and PC)
  if (navigator.appVersion.indexOf("Win") != -1) {
    $("body").addClass("windows-os");
  }

  // target mobile iOS
  function isIOSDevice() {
    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  }

  if (isIOSDevice()) {
    $("body").addClass("browser-ios");
  }

  // stop playing video inside modal after closing modal
  $(".modal").on("hide.bs.modal", function () {
    var memory = $(this).html();
    $(this).html(memory);
  });

  $(".main-header-block nav ul li a").on("click", function () {
    $(this).parent().toggleClass("active");
  });

  $(".submenu").each(function () {
    $(this)
      .find("a")
      .last()
      .on("focusout", function () {
        $(this).parents().find(".active").removeClass("active");
      });
  });

  $(".map-wrapper .view-list").on("click", function (event) {
    $(".dropdown-map").slideToggle();
  });

  function containerPosition() {
    var div1Pos = $(".container").offset();
    var div1X = div1Pos.left;
    $(".background-copy .container").offset({ left: div1X });
  }

  containerPosition();

  function textHeightAsImage() {
    var win = $(window).width();
    if (win > 768) {
      $(".image-info-text").each(function () {
        // Set up the variables
        var $this = $(this),
          w = $(".image-column").find("img").width(), // Width of the image
          h = $(".image-column").find("img").height(); // Height of the image
        $this.width(w).height(h); // Set width and height of . to match image
      });
    }
  }

  textHeightAsImage();

  $(".burger-menu").click(function () {
    $("body").addClass("overflow-hidden");
  });
  $(".closebtn").click(function () {
    $("body").removeClass("overflow-hidden");
  });

  $(".main-header-btns-search").click(function () {
    $("body").removeClass("overflow-hidden");
  });
});

$(document).click(function (e) {
  var item = $(".main-header-block nav ul li");

  if (!item.is(e.target) && item.has(e.target).length === 0) {
    $(".main-header-block nav ul li").removeClass("active");
  }
});

$(window).on("resize", function () {
  function containerPosition() {
    var div1Pos = $(".container").offset();
    var div1X = div1Pos.left;
    $(".background-copy .container").offset({ left: div1X });
  }
  containerPosition();
});
