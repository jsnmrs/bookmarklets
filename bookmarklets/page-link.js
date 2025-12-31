/**
 * @bookmarklet Page link
 * @description Copy page title and URL, separated by hyphens
 * @author Jason Morris
 * @authorUrl https://jasonmorris.com
 * @tags utility
 * @auditing true
 * @pageTest self
 */
var text = document.title + " — " + location.href;
window.prompt("Plain text link:", text);
void 0;
