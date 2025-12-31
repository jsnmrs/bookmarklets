/**
 * @bookmarklet Inline styles
 * @description Highlight all elements with style attributes
 * @author Adrian Roselli
 * @authorUrl https://adrianroselli.com/2015/01/css-bookmarklets-for-testing-and-fixing.html#inline
 * @tags utility
 * @pageTest true
 */
var style = document.createElement("style"),
  styleContent = document.createTextNode(
    '[style]{ position: relative; outline: 4px solid #01ff70 !important;} [style]:after{ content: "inline style"; position: absolute; top: 0; right: 0; background-color: #000; color: #01ff70; z-index: 9999; font-size: 12px; font-weight: 400; padding: 1px 3px;} body::after{ position: absolute; top: 0; right: 4px; background-color: #000; color: #01ff70; z-index: 9999; font-size: 16px; font-weight: 400; padding: 3px 9px; outline: 4px solid #01ff70 !important; content: "inline styles";}}'
  ),
  head = document.getElementsByTagName("head");

style.appendChild(styleContent);
head[0].appendChild(style);
