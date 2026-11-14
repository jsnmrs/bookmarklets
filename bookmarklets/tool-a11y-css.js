/**
 * @bookmarklet a11y.css
 * @description Warns about possible risks and mistakes in HTML code
 * @author Gaël Poupard
 * @authorUrl https://ffoodd.github.io/a11y.css/
 * @tags accessibility, external
 * @pageTest self
 */
(function () {
  var a11ycss = document.createElement("LINK");
  a11ycss.href =
    "https://cdn.jsdelivr.net/gh/ffoodd/a11y.css@latest/css/a11y-en.css";
  a11ycss.rel = "stylesheet";
  a11ycss.media = "all";
  document.body.appendChild(a11ycss);
})();
