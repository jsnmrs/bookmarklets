// 1280x1024 window
// Opens a new window with the current URL at 1280x1024 to test WCAG 1.4.10 Reflow (AA)
// Mike in a CSS Tricks article comment
// https://css-tricks.com/snippets/javascript/1024x768-bookmarklet/#comment-1766738

(function () {
  var id = "w" + new Date().getTime();
  var options =
    "toolbar=yes,location=yes,status=yes,resizable=yes,favorites=yes,width=1280,height=1024,left=0,top=0";
  var p = document.createElement("P");
  p.innerHTML =
    '<a href="#" id="' +
    id +
    '" target="_blank" onclick="window.open(window.location.href, \'\', \'' +
    options +
    "' ); return false;\"></a></p>";
  document.body.appendChild(p);
  document.getElementById(id).click() && document.body.removeChild(p);
})();
