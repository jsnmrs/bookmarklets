/**
 * @bookmarklet Force focus indicator
 * @description Adds a 4 pixel solid orange outline around all focusable elements
 * @author Paul J. Adam
 * @authorUrl https://pauljadam.com/bookmarklets/focus.html
 * @tags accessibility, wcag:2.4.7
 * @auditing true
 * @pageTest false
 */
var style = document.createElement("style"),
  styleContent = document.createTextNode(
    "a:focus, *:focus { outline: 4px solid orange !important; outline-offset:1px !important; }"
  ),
  head = document.getElementsByTagName("head");

style.appendChild(styleContent);
head[0].appendChild(style);
