/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetData) => {
  let tweetEl = $("<article>").addClass("tweet");

  let headerEl = $("<header>");
  headerEl.append($(`<img src="${tweetData.user.avatars}">`));
  headerEl.append($("<span>").addClass("name").html(tweetData.user.name));
  headerEl.append($("<span>").addClass("handle").html(tweetData.user.handle));
  tweetEl.append(headerEl);

  tweetEl.append($("<div>").addClass("body").html(tweetData.content.text));

  let footerEl = $("<footer>");
  footerEl.append($("<div>").addClass("timestamp").html(new Date(tweetData.created_at)));
  footerEl.append($("<div>").addClass("flags").html("flags"));
  tweetEl.append(footerEl);

  return tweetEl;
};

const renderTweets = (tweets) => {
  const tweetsContainer = $("#tweets");

  for (const tweet of tweets) {
    tweetsContainer.append(createTweetElement(tweet));
  }
};

$(document).ready(() => {
  $("form").on('submit', function(event) {
    const $form = $(this);

    $.ajax($form.attr('action'), {
      method: $form.attr('method'),
      data: $form.serialize()
    });

    event.preventDefault();
  });

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
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

  renderTweets(data);
});
