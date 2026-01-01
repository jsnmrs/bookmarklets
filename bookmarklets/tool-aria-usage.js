/**
 * @bookmarklet ARIA usage
 * @description Report on ARIA usage on current URL
 * @author TPGi
 * @authorUrl https://thepaciellogroup.github.io/WAI-ARIA-Usage/WAI-ARIA_usage.html
 * @tags accessibility, external
 * @pageTest self
 */
void (function () {
  var objScript = document.createElement("script");
  objScript.setAttribute(
    "src",
    "https://thepaciellogroup.github.io/WAI-ARIA-Usage/aria-usage.js"
  );
  document.body.appendChild(objScript);
})();
