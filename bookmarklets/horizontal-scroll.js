(function () {
  document.body.style.outline = "5px solid green";
  window.addEventListener("resize", function () {
    if (document.body.scrollWidth > window.innerWidth) {
      document.body.style.outline = "10px dashed red";
    }
  });
})();
