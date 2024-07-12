// Wait for the DOM to load before applying scripts
$(document).ready(function () {
  // Your code goes here
  $(window).scroll(function () {
    console.log($(this).scrollTop());
    if ($(this).scrollTop() > 5) {
      $('nav').css('box-shadow', '0 5px 5px rgba(0, 0, 0, 0.2)');
    } else {
      $('nav').css('box-shadow', 'none');
    }
  });
});
