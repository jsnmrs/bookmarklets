// Hides cursor from window to encourage keyboard use

var style = document.createElement("style"),
  styleContent = document.createTextNode("* { cursor: none !important; }"),
  head = document.getElementsByTagName("head");

style.appendChild(styleContent);
head[0].appendChild(style);
