
$(document).ready(function() {

  // All the functionalities of the up button

  $("#up").on('click', (function(event) {
    event.preventDefault();
    $(window).scrollTop(0);
    $(".add").slideDown(1000);
  }));

  $(window).scroll(function() {
    $("#up").slideDown(200);
    $(".btn").hide();
    if($(this).scrollTop() === 0 ) {
      $("#up").hide();
      $(".btn").slideDown();
  }});

});
