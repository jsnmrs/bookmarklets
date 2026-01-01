/**
 * @bookmarklet Grayscale
 * @description Show entire page in gray scale (no color)
 * @author Level Access
 * @authorUrl https://labs.levelaccess.com/index.php/Grayscale_Favlet
 * @tags accessibility, wcag:1.4.1
 * @pageTest false
 */
(function () {
  let style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(""));
  document.head.appendChild(style);
  style.sheet.insertRule(
    "html {  filter: grayscale(100%) !important; -webkit-filter: grayscale(1) !important;}",
    style.sheet.cssRules.length
  );
})();
