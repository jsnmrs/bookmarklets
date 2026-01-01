/**
 * @bookmarklet Show focus styles
 * @description Force visibility of all focus styles at the same time
 * @author Ian Lloyd
 * @authorUrl https://a11y-tools.com/bookmarklets/
 * @tags accessibility, wcag:2.4.7, wcag:2.4.11, wcag:2.4.12, wcag:2.4.13
 * @pageTest true
 */
(function () {
  function showAllFocusStyles() {
    const e = document.querySelectorAll(
      'a[href],button,select,input:not([type="hidden"]),textarea,summary,details,area,[tabindex],[contenteditable]:not([contenteditable="false"])'
    );
    let t,
      o = "";
    console.clear(),
      Array.from(e).forEach(function (e) {
        (e.style.transition = "none"),
          e.focus(),
          (t = getComputedStyle(e)),
          (o = "");
        for (var s = 0; s < t.length; s++)
          (cssProperty = t[s]),
            (cssValue = t.getPropertyValue(cssProperty)),
            (o += cssProperty + ":" + cssValue + ";");
        e.setAttribute("style", o);
      });
  }
  showAllFocusStyles();
})();
