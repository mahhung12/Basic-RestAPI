var mainBar = document.querySelector('.header-page__nav');
var navBarToggle = document.querySelector('#nav-check');

navBarToggle.addEventListener("click", function () {
    (mainBar != '') ? mainBar.classList.toggle("active") : mainBar.classList.toggle("close-active");
});

var activeClass = document.getElementsByClassName('active');
var closeActive = document.getElementsByClassName('close-active');

navBarToggle.addEventListener("click", function () {
    console.log(activeClass)
    console.log(closeActive)
});
