(function () {
  var a = document.createElement("style"),
    b;
  document.head.appendChild(a);
  b = a.sheet;
  b.insertRule("*{user-select:unset !important}", 0);
})();
