$(document).ready(() => {
  $(".new-tweet textarea[name=text]").on('keyup', function(event) {
    let counter = $($(this).parent().children("span.counter")[0]);
    const remainingChars = 140 - this.textLength;

    counter.html(remainingChars);
    if (remainingChars < 0) {
      counter.addClass("negative");
    } else {
      counter.removeClass("negative");
    }
  });
});
