/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

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

const createTweetElement = function(data) {
  let d = new Date(data.created_at);
  const remainTime = Math.abs(new Date().getTime() - d);
  const diffDays = Math.ceil(remainTime / (1000 * 3600 * 24));
  let dateOfTweet = "";
  if(diffDays > 30) {
    dateOfTweet = Math.floor(diffDays / 365) + " years ago"
  } else {
    dateOfTweet = diffDays + " days ago"
  }

  const $tweet = $(`<article class="tweet">
        <header>
          <div class="profil">
          <img class="pic" src=${data.user.avatars}>
          <divx>
          <p>${data.user.name}</p>
        </div>
        </div>
          <p class="at">${data.user.handle}</p>
        </header>
        <div class="txt">
        ${escape(data.content.text)}
        </div>
        <hr></hr>
        <footer>
          <div class="time">
          <p>${dateOfTweet}</p>
        </div>
          <div class="reaction">
          <input type="image" src="./images/react1.png" alt="Submit" >
          <input type="image" src="./images/react2.png" alt="Submit" >
          <input type="image" src="./images/react3.png" alt="Submit" >
        </div>
        </footer>

        </article>`);
        return $tweet;
};


const renderTweets = function(tweets, section) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for ( let t of tweets) {
    let $tweet = createTweetElement(t);
    section.prepend($tweet);
  }
};

const loadTweets = function() {
  $.ajax('/tweets/', {method: 'GET'})
  .then (function (data) {

      renderTweets(data,$('#tweets'));

  });
};

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$("#submit-tweet").on('submit', (function(event) {
  event.preventDefault();

  const tweetMessage =  $(this).serialize();
console.log(tweetMessage.slice(5));
  if (tweetMessage.slice(5).length > 140) {
    console.log($("#submit-tweet").children()[2].type)
    $("#submit-tweet").children()[2].type = "text";
    $("#submit-tweet").children()[2].value = "Your tweet is too long!";

  } else if (tweetMessage.slice(5) === "") {
    console.log($("#submit-tweet").children()[2].type)
    //console.log($(this))
    slideDown()
    $("#submit-tweet").children()[2].type = "text";
    $("#submit-tweet").children()[2].value = "You didn't tweet anything!";

  } else {
    console.log('else')
    $.ajax('/tweets/', {method: 'POST', data: tweetMessage})
    .then(function (data) {
      $("#submit-tweet").children()[2].type = "hidden";
      loadTweets();
      $("#submit-tweet").children()[2].value="";
    });
  }


}));

loadTweets();
//renderTweets(data, $('#tweets'));
});
