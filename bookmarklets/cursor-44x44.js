(function () {
  var style = document.createElement("style"),
    styleContent = document.createTextNode(
      "* { cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJBJREFUeNrs2dEKgDAIhWEN3/+VLYtBF12MppHwDxY0uvg4DJpORcSl0bB4uPcwq+oFHu8/956pbtJsAAYMGDBgwIABA044t3pMEgb8VU2XsWdn1o/aUUn4bchPBWNFYWvVidxbCFGmr7YULBs1YDPfsYcXEi9ryvDjAAwYMGDAgAED7nK8bHG7qNLs6nYXYAAheh5j8Qw5fwAAAABJRU5ErkJggg==) 22 22, auto !important}"
    );
  style.appendChild(styleContent);
  var caput = document.getElementsByTagName("head");
  caput[0].appendChild(style);
  document.onkeydown = function (e) {
    var n;
    ("key" in (e = e || window.event)
      ? "Escape" == e.key || "Esc" == e.key
      : 27 == e.keyCode) &&
      ((n = document.createElement("style")),
      document.head.appendChild(n),
      n.sheet.insertRule("*{cursor:revert !important}", 0));
  };
})();
