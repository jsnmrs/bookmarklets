var style = document.createElement("style"),
  styleContent = document.createTextNode(
    "a:focus, *:focus { outline: 4px solid orange !important; outline-offset:1px !important; }"
  ),
  head = document.getElementsByTagName("head");

style.appendChild(styleContent);
head[0].appendChild(style);
