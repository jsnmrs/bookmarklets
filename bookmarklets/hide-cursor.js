/**
 * @bookmarklet Hide cursor
 * @description Hides cursor from window to encourage keyboard use
 * @author Iain Bean
 * @authorUrl https://iainbean.com/posts/2020/an-opinionated-guide-to-accessibility-testing/
 * @tags accessibility, 2.1, 2.1.1 (A), 2.1.2 (A), 2.1.4 (A), WCAG, cursor
 * @pageTest false
 */
var style = document.createElement("style"),
  styleContent = document.createTextNode(
    '* { cursor: none !important; } body::after{ position: absolute; top: 0; right: 4px; background-color: #000; color: #01ff70; z-index: 9999; font-size: 16px; font-weight: 400; padding: 3px 9px; outline: 4px solid #01ff70 !important; content: "hiding cursor";}'
  ),
  head = document.getElementsByTagName("head");

style.appendChild(styleContent);
head[0].appendChild(style);
