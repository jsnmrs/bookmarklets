(function () {
  var a = document.createElement("style"),
    b;
  document.head.appendChild(a);
  b = a.sheet;
  b.insertRule(
    "*[role=main]:nth-of-type(n+2),*[role=banner]:nth-of-type(n+2),*[role=contentinfo]:nth-of-type(n+2),main:nth-of-type(n+2){border:2px dotted #f00 !important;background-color:#f00;}",
    0
  );
})();
