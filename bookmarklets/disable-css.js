/**
 * @bookmarklet Disable CSS
 * @description Drop all page styles
 * @author Sarah Higley
 * @authorUrl https://dorward.uk/software/disablecss/
 * @tags diagnostic
 * @pageTest false
 */
for (var i = 0; i < document.styleSheets.length; i++) {
  void (document.styleSheets.item(i).disabled = true);
}
var el = document.getElementsByTagName("*");
for (i = 0; i < el.length; i++) {
  void (el[i].style.cssText = "");
}
