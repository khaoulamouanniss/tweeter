
$(document).ready(function() {

  // All the functionalities of the up button

  $("#up").on('click', (function(event) {
    event.preventDefault();
    $(window).scrollTop(0);
    $(".new-tweet-box").slideDown(1000);
    $(".create-new-tweet").hide();
  }));

  $(window).scroll(function() {
    $("#up").slideDown(200);
    if($(this).scrollTop() === 0 ) {
      $("#up").hide();

  }});

});
