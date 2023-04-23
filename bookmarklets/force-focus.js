(function () {
  document.body.appendChild(document.createElement("script")).src =
    "https://cdn.jsdelivr.net/gh/pauljadam/bookmarklets@master/focus.js";
  var iframes = document.getElementsByTagName("iframe");
  for (var i = 0; i < iframes.length; i++) {
    iframes[i].contentDocument.body.appendChild(
      document.createElement("script")
    ).src =
      "https://cdn.jsdelivr.net/gh/pauljadam/bookmarklets@master/focus.js";
  }
})();
