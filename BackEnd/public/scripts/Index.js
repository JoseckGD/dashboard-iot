setTimeout(() => {
   document.body.onload = a();
}, 1500);

function a() {
   let closeBtnA = document.querySelector(".a");
   closeBtnA.addEventListener("click", a);
   let navBar = document.querySelector(".nav-container");
   if (navBar.classList.contains("closeNavbar")) {
      document.querySelector(".home-section").style.left = '4.5em';
      document.querySelector(".home-section").style.width = 'calc(100% - 4.5em)';
   } else {
      document.querySelector(".home-section").style.left = '18.75em';
      document.querySelector(".home-section").style.width = 'calc(100% - 18.75em)';
   }


}
