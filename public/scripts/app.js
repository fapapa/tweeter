/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetData) => {
  let tweetEl = $("<article>").addClass("tweet");

  let headerEl = $("<header>");
  headerEl.append($(`<img src="${tweetData.user.avatars}">`));
  headerEl.append($("<span>").addClass("name").text(tweetData.user.name));
  headerEl.append($("<span>").addClass("handle").text(tweetData.user.handle));
  tweetEl.append(headerEl);

  tweetEl.append($("<div>").addClass("body").text(tweetData.content.text));

  let footerEl = $("<footer>");
  footerEl.append($("<div>").addClass("timestamp").text(moment(new Date(tweetData.created_at)).fromNow()));
  let linksContainer = $("<div>").addClass("flags");
  linksContainer.append($("<span>").addClass("fas").addClass("fa-flag"));
  linksContainer.append($("<span>").addClass("fas").addClass("fa-retweet"));
  linksContainer.append($("<span>").addClass("fas").addClass("fa-heart"));
  footerEl.append(linksContainer);
  tweetEl.append(footerEl);

  return tweetEl;
};

const renderTweets = (tweets) => {
  const tweetsContainer = $("#tweets");

  for (const tweet of tweets) {
    tweetsContainer.prepend(createTweetElement(tweet));
  }
};

const setValidationErrorMessage = (message) => {
  $("section.new-tweet .validation-error .message").text(message);
  $("section.new-tweet .validation-error").show('fast');
};

const resetValidation = () => {
  $("section.new-tweet .validation-error").hide('fast');
};

const showNewTweetForm = (event) => {
  const $newTweetSection = $("section.new-tweet");
  $newTweetSection.toggle('fast');
  $newTweetSection.find("textarea").focus();
  event.preventDefault();
};

const loadTweets = () => {
  $.ajax("/tweets").then(data => renderTweets(data));
};

$(document).ready(() => {
  loadTweets();

  $("#new-tweet-link").click(showNewTweetForm);

  $("form").on('submit', function(event) {
    const $form = $(this);
    const tweetText = $($form.children("textarea")[0]);

    resetValidation();
    if (tweetText.val() === "") {
      setValidationErrorMessage("Tweet must contain some text.");
    } else if (tweetText.val().length > 140) {
      setValidationErrorMessage("Tweet cannot be longer than 140 characters.");
    } else {
      $.ajax($form.attr('action'), {
        method: $form.attr('method'),
        data: $form.serialize()
      }).then(data => {
        $("#tweets").empty();
        loadTweets();
      });
      $form.trigger('reset');
      $(".new-tweet .counter").text("140");
    }

    event.preventDefault();
  });

  $("#back-to-top").click((event) => {
    event.preventDefault();
    $("html,body").animate({ scrollTop: 0 }, 'fast');
    showNewTweetForm();
  });

  $(window).scroll(() => {
    const scrollLevel = $(window).scrollTop();
    const backToTop = $("#back-to-top");
    const newTweetLink = $("#new-tweet-link");

    if (scrollLevel > 400) {
      backToTop.show();
      newTweetLink.hide();
    } else {
      backToTop.hide();
      newTweetLink.show();
    }
  });
});
