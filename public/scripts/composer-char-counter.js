$(document).ready(function() {
  //Jquery function that change the counter value and color asyncronuously
  $('#tweet-text').bind('input propertychange', function() {
    let remainCounter = 140 - $(this).val().length;
    const counter = $(this).siblings('div').children('.counter')[0];
    counter.innerText = remainCounter;
    if(remainCounter < 0) {
      counter.style.color = 'red';
    } else {
      counter.style.color = 'black';
    }
  });
});
