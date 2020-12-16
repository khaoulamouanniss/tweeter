/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
$("#tweets").append("test");
const t = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

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
]

const createTweetElement = function(data) {
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
        ${data.content.text}
        </div>
        <hr></hr>
        <footer>
          <div class="time">
          <p>${data.created_at}</p>
        </div>
          <div class="reaction">
          <input type="image" src="./images/react1.png" alt="Submit" >
          <input type="image" src="./images/react2.png" alt="Submit" >
          <input type="image" src="./images/react3.png" alt="Submit" >
        </div>
        </footer>

        </article>`);
        return $tweet;
}


const renderTweets = function(tweets, section) {
  for ( let t of tweets) {
    let $tweet = createTweetElement(t);
    section.append($tweet);

  }
}
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

//const $tweet = createTweetElement(tweetData);

//Test / driver code (temporary)
//console.log($tweet);
//$('#tweets').append($tweet);
renderTweets(data, $('#tweets'));
});
