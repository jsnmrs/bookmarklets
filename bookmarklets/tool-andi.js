/**
 * @bookmarklet ANDI
 * @description Accessible Name & Description Inspector is a free accessibility testing tool
 * @author Accessible Solutions Branch of the Social Security Administration
 * @authorUrl https://www.ssa.gov/accessibility/andi/help/install.html
 * @tags accessibility, external
 * @auditing true
 * @pageTest self
 */
void (function () {
  var andiScript = document.createElement("script");
  andiScript.setAttribute(
    "src",
    "https://www.ssa.gov/accessibility/andi/andi.js"
  );
  document.body.appendChild(andiScript);
})();
