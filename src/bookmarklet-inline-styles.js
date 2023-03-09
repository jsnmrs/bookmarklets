// Highlight inline styles

var style = document.createElement("style"),
  styleContent = document.createTextNode(
    '[style]{ position: relative; outline: 4px solid #f00 !important;} [style]:after{ content: "inline style"; position: absolute; top: 0; right: 0; background-color: #f00; color: #fff; z-index: 9999; font-size: 12px; font-weight: 400; padding: 1px 3px;}'
  ),
  head = document.getElementsByTagName("head");

style.appendChild(styleContent);
head[0].appendChild(style);
