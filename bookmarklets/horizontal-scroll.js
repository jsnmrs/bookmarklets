(function () {
  window.addEventListener("resize", function () {
    if (document.body.scrollWidth > window.innerWidth) {
      alert("Horizontal scrollbar detected!");
    }
  });
})();
