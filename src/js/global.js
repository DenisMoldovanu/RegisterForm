// Header
function burgerMenu(event) {
  event.preventDefault();
  var self = event.currentTarget;

  if (event.type == "click" || event.keyCode === 13) {
    document
      .querySelector(".main-header-btns-search")
      .classList.remove("active");
    document.querySelector(".submenu-search").classList.remove("active");
    document.querySelector("#header-overlay").classList.remove("active");
    var mobileMenuSubmenu = document.querySelectorAll(".mobile-menu-submenu");
    for (var i = 0; i < mobileMenuSubmenu.length; i++) {
      mobileMenuSubmenu[i].classList.remove("active");
    }

    if (self.classList.contains("active")) {
      self.classList.remove("active");
      document.querySelector(".mobile-menu").classList.remove("active");
      document.querySelector("#header-overlay").classList.remove("active");
    } else {
      self.classList.add("active");
      document.querySelector(".mobile-menu").classList.add("active");
      document.querySelector("#header-overlay").classList.add("active");
    }
  }
}

var mainHeaderNav = document.querySelectorAll(
  ".main-header-block nav > ul > li"
);
for (var i = 0; i < mainHeaderNav.length; i++) {
  mainHeaderNav[i].addEventListener("mouseenter", function (e) {
    document
      .querySelector(".main-header-btns-search")
      .classList.remove("active");
    document.querySelector(".submenu-search").classList.remove("active");
    document.querySelector(".burger-menu").classList.remove("active");
    document.querySelector("#header-overlay").classList.remove("active");
    document.querySelector(".main-header-block").classList.add("active");
  });
}

for (var i = 0; i < mainHeaderNav.length; i++) {
  mainHeaderNav[i].addEventListener("mouseleave", function (e) {
    document.querySelector(".main-header-block").classList.remove("active");
  });
}

function mobileMenuArrow(event) {
  event.preventDefault();
  var self = event.currentTarget;

  if (event.type == "click" || event.keyCode === 13) {
    self.nextElementSibling.classList.add("active");
  }
}

function mobileMenuBack(event) {
  event.preventDefault();
  var self = event.currentTarget;

  if (event.type == "click" || event.keyCode === 13) {
    self.closest(".mobile-menu-submenu").classList.remove("active");
  }
}

function mainHeaderSearch(event) {
  event.preventDefault();
  var self = event.currentTarget;

  if (event.type == "click" || event.keyCode === 13) {
    document.querySelector(".submenu-search").classList.remove("active");
    document.querySelector(".burger-menu").classList.remove("active");
    document.querySelector(".mobile-menu").classList.remove("active");

    var mobileMenuSubmenu = document.querySelectorAll(".mobile-menu-submenu");
    for (var i = 0; i < mobileMenuSubmenu.length; i++) {
      mobileMenuSubmenu[i].classList.remove("active");
    }

    if (self.classList.contains("active")) {
      self.classList.remove("active");
      document.querySelector(".submenu-search").classList.remove("active");
      document.querySelector("#header-overlay").classList.remove("active");
    } else {
      self.classList.add("active");
      document.querySelector(".submenu-search").classList.add("active");
      document.querySelector("#header-overlay").classList.add("active");
    }
  }
}

// Footer
var menuOpen = document.querySelectorAll(".main-footer-menu-open");
for (var i = 0; i < menuOpen.length; i++) {
  menuOpen[i].addEventListener("click", function (event) {
    if (this.parentNode.parentNode.classList.contains("active")) {
      closeFooterMenu();
    } else {
      closeFooterMenu();
      this.parentNode.parentNode.classList.toggle("active");
    }
  });
}

function closeFooterMenu() {
  var closeMenu = document.querySelectorAll(".main-footer-menu");
  for (var i = 0; i < closeMenu.length; i++) {
    closeMenu[i].classList.remove("active");
  }
}
