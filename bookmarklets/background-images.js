(function () {
  var tags = document.getElementsByTagName("*");
  var element;
  for (var i = 0; i < tags.length; i++) {
    element = tags[i];
    if (element.currentStyle) {
      if (element.currentStyle["backgroundImage"] !== "none")
        element.style.outline = "2px solid #f00";
    } else if (window.getComputedStyle) {
      if (
        document.defaultView
          .getComputedStyle(element, null)
          .getPropertyValue("background-image") !== "none"
      )
        element.style.outline = "4px solid #f00";
    }
  }
})();
