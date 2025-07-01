(function () {
  function showAllFocusStyles() {
    const e = document.querySelectorAll(
      'a[href],button,select,input:not([type="hidden"]),textarea,summary,details,area,[tabindex],[contenteditable]:not([contenteditable="false"])'
    );
    let t,
      o = "";
    (console.clear(),
      Array.from(e).forEach(function (e) {
        ((e.style.transition = "none"),
          e.focus(),
          (t = getComputedStyle(e)),
          (o = ""));
        for (var s = 0; s < t.length; s++)
          ((cssProperty = t[s]),
            (cssValue = t.getPropertyValue(cssProperty)),
            (o += cssProperty + ":" + cssValue + ";"));
        e.setAttribute("style", o);
      }));
  }
  showAllFocusStyles();
})();
