// Auto dark mode
if (!("dark" in localStorage)) {
  localStorage.setItem("dark", window.matchMedia("(prefers-color-scheme: dark)").matches);
}

$(document).ready(function () {
  // FitVids - Makes video embeds responsive
  $(".gh-content").fitVids();
});

$(document).ready(function () {
  $('.code-toolbar').addClass('not-prose');
  $('figure.kg-card.kg-code-card').addClass('not-prose');
});
