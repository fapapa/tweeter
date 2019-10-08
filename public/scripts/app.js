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
  const loadTweets = () => {
    $.ajax("/tweets").then(data => renderTweets(data));
  };
  loadTweets();

  $("form").on('submit', function(event) {
    const $form = $(this);
    const tweetText = $($form.children("textarea")[0]);

    if (tweetText.val() === "" || tweetText.val().length > 140) {
      alert("Not a valid tweet");
    } else {
      $.ajax($form.attr('action'), {
        method: $form.attr('method'),
        data: $form.serialize()
      });
    }

    event.preventDefault();
  });
});
