/**
 * @bookmarklet Background image hide
 * @description Hide all CSS background images
 * @author Zoe Mickley Gillenwater
 * @authorUrl https://zomigi.com/blog/bookmarklets-for-accessibility-testing/
 * @tags utility
 * @pageTest true
 */
(function () {
  var tags = document.getElementsByTagName("*");
  var element;
  for (var i = 0; i < tags.length; i++) {
    element = tags[i];
    if (element.currentStyle) {
      if (element.currentStyle["backgroundImage"] !== "none")
        element.style.backgroundImage = "none";
    } else if (window.getComputedStyle) {
      if (
        document.defaultView
          .getComputedStyle(element, null)
          .getPropertyValue("background-image") !== "none"
      )
        element.style.backgroundImage = "none";
    }
  }
})();
