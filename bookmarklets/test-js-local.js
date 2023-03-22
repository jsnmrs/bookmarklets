var script = document.createElement("script"),
  scriptContent = document.createTextNode(
    'alert("Your browser is not blocking JavaScript in favorites/bookmarks");'
  ),
  style = document.createElement("style"),
  styleContent = document.createTextNode(
    'body::after{ position: absolute; top: 0; right: 4px; background-color: #000; color: #01ff70; z-index: 9999; font-size: 16px; font-weight: 400; padding: 3px 9px; outline: 4px solid #01ff70 !important; content: "testing JS";}}'
  ),
  head = document.getElementsByTagName("head");

style.appendChild(styleContent);
head[0].appendChild(style);
script.appendChild(scriptContent);
head[0].appendChild(script);
