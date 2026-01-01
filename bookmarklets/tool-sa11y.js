/**
 * @bookmarklet Sa11y
 * @description The accessibility quality assurance assistant
 * @author Toronto Metropolitan University
 * @authorUrl https://ryersondmp.github.io/sa11y/demo/en/
 * @tags accessibility, external
 * @pageTest self
 */
void (function (document) {
  document.body.appendChild(document.createElement("script")).src =
    "https://cdn.jsdelivr.net/gh/ryersondmp/sa11y@latest/bookmarklet/sa11y-en.min.js";
})(document);
