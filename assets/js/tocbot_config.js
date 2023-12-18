tocbot.init({
  // Where to render the table of contents.
  tocSelector: ".gh-toc",
  // Where to grab the headings to build the table of contents.
  contentSelector: ".gh-content",
  // Which headings to grab inside of the contentSelector element.
  headingSelector: "h1, h2, h3, h4",
  // Ensure correct positioning
  hasInnerContainers: true,
});
