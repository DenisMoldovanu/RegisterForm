$(document).ready(function () {
  $(".tabs-list span a").click(function (e) {
    e.preventDefault();
  });

  $(".tabs-list span").click(function () {
    var tabid = $(this).find("a").attr("href");
    history.replaceState({}, "", tabid);
    $(".tabs-list span,.tabs div.tab").removeClass("active"); // removing active class from tab

    $(".tab").hide(); // hiding open tab
    $(tabid).show(); // show tab
    $(this).addClass("active"); //  adding active class to clicked tab
  });

  // Seting toggle plus-minus btns in accordion tabs
  $(".myaccordion").on("hide.bs.collapse show.bs.collapse", (e) => {
    $(".help-page").toggleClass("change-height");
  });

  //Seting function for tabs, if url hash == a href then  open tab

  $(function () {
    var hash = window.location.hash;
    if (hash) {
      $('a[href="' + hash + '"]')
        .parent("span")
        .click();
      var elementID = hash.replace("#", "");
      $(elementID).show();
    } else {
      $(".tab:first").show();
      $(".tab:first").addClass("active");
    }
  });
});
