let navBar = document.querySelector(".nav-container");
let closeBtnA = document.querySelector(".a");
let txtRol = document.querySelector(".txt-rol");

closeBtnA.addEventListener("click", OcultarNavbar);

function OcultarNavbar() {
   navBar.classList.toggle("closeNavbar");
   changeIcon();
}

function changeIcon() {
   if (navBar.classList.contains("closeNavbar")) {
      document.querySelector("#btn-menu").setAttribute('data-icon', 'gg:menu');
   } else {
      document.querySelector("#btn-menu").setAttribute('data-icon', 'eva:close-fill');
   }
}