(function () {
  var id = "w" + new Date().getTime();
  var options =
    "toolbar=yes,location=yes,status=yes,resizable=yes,favorites=yes,width=320,height=256,left=0,top=0";
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
