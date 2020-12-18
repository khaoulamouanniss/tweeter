/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  // The error message, the box for adding new tweet and the button up will be hidden in the beginning
  $(".error").hide();
  $(".new-tweet-box").hide();
  $("#up").hide();

  //loal data to load
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  //Function that calculate the remaining time in years or days
  const calculateRemainTime = function(date) {
    let d = new Date(date);
    const remainTime = Math.abs(new Date().getTime() - d);
    const diffDays = Math.ceil(remainTime / (1000 * 3600 * 24));
    let dateOfTweet = "";
    if (diffDays > 30) {
      dateOfTweet = Math.floor(diffDays / 365) + " years ago";
    } else {
      dateOfTweet = diffDays + " days ago";
    }
    return dateOfTweet;
  };
  //Function that create the new tweeter
  const createTweetElement = function(data) {
    const $tweet = $(`<article class="tweet">
          <header>
            <div class="profile">
            <img class="pic" src=${data.user.avatars}>
            <div>
            <p>${data.user.name}</p>
          </div>
          </div>
            <p class="handle">${data.user.handle}</p>
          </header>
          <div class="txt">
          ${escape(data.content.text)}
          </div>
          <hr></hr>
          <footer>
            <div class="time">
            ${calculateRemainTime(data.created_at)}
          </div>
            <div class="reaction">
            <img src="./images/react1.png" alt="Submit" >
            <img src="./images/react2.png" alt="Submit" >
            <img src="./images/react3.png" alt="Submit" >
          </div>
          </footer>

          </article>`);
    return $tweet;
  };

  //Fnction that rend an array of tweets to the section with the id=tweets
  const renderTweets = function(tweets, section) {
    for (let t of tweets) {
      let $tweet = createTweetElement(t);
      section.prepend($tweet);
    }
  };

  //Function that load the tweets from our route
  const loadTweets = function() {
    $.ajax('/tweets/', {method: 'GET'})
    .then(function (data) {
      renderTweets(data,$('#tweets'));
    });
  };

  //Function escape for escaping maliious messages sent by user
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //submit a new tweet and load it dynamically
  $("#submit-tweet").on('submit', (function(event) {
    event.preventDefault();
    const tweetMessage =  $(this).serialize();
    if (tweetMessage.slice(5).length > 140) {
      $(this).children()[2].value = "! Your tweet is too long !";
      $(".error").slideDown(1000);
    } else if (tweetMessage.slice(5) === "") {
      $(this).children()[2].value = "! You didn't tweet anything ! ";
      $(".error").slideDown(1000);
    } else {
      $.ajax('/tweets/', {method: 'POST', data: tweetMessage})
      .then(function(data) {
        $(".error").slideUp();
        loadTweets();
        $("#submit-tweet").children()[1].value = "";
        $(".new-tweet-box").slideUp();
        $(".create-new-tweet").slideDown();
      });
    }
  }));

  //The button of the nav, we lik on it to display adding new tweet
  $("#open-new-tweet").on('click', (function(event) {
    event.preventDefault();
    $(".new-tweet-box").slideDown(1000);
  }));

  //annimation of the nav button when we hover it
  $("#open-new-tweet").hover(function() {
    $(this).slideUp(300).slideDown(1000);
  });

  //loading the loal data
  loadTweets();
});
