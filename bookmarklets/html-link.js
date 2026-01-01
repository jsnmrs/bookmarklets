/**
 * @bookmarklet HTML link
 * @description Copy page title and URL in an HTML anchor
 * @author Jason Morris
 * @authorUrl https://jasonmorris.com
 * @tags utility
 * @pageTest self
 */
var text = '<a href="' + location.href + '">' + document.title + "</a>";
window.prompt("HTML link:", text);
void 0;
