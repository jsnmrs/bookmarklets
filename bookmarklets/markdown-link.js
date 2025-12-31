/**
 * @bookmarklet Markdown link
 * @description Copy page title and URL in markdown link format
 * @author Brian Cantoni
 * @authorUrl http://www.cantoni.org/2013/11/08/bookmarklet-copy-markdown-link
 * @tags utility
 * @pageTest self
 */
var text = "[" + document.title + "](" + location.href + ")";
window.prompt("Markdown link:", text);
void 0;
