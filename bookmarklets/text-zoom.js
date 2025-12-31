/**
 * @bookmarklet Text zoom 200%
 * @description Zoom text only (not page) size to 200%
 * @author Ashlee M. Boyer
 * @authorUrl https://ashleemboyer.com/blog/an-accessibility-bookmarklet-for-testing-200-percent-text-size
 * @tags accessibility, 1.4.4, WCAG
 * @pageTest false
 */
(function () {
  const htmlElement = document.querySelector("html");
  const currentFontSize = htmlElement.style.getPropertyValue("font-size");
  const isZoomed = currentFontSize === "200%";
  const newFontSize = isZoomed ? null : "200%";
  htmlElement.style.setProperty("font-size", newFontSize);
})();
