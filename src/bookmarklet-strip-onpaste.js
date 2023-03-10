// Remove onpaste
// Remove onpaste attributes from password inputs – fixes security theatre of preventing paste
// Jason Morris
// https://jasonmorris.com

document
  .querySelectorAll("input[type=password]")
  // eslint-disable-next-line strict
  .forEach(function (el) {
    return el.removeAttribute("onpaste");
  });

var style = document.createElement("style"),
  styleContent = document.createTextNode(
    'body::after{ position: absolute; top: 0; right: 4px; background-color: #000; color: #01ff70; z-index: 9999; font-size: 16px; font-weight: 400; padding: 3px 9px; outline: 4px solid #01ff70 !important; content: "removing onpaste attributes";}}'
  ),
  head = document.getElementsByTagName("head");

style.appendChild(styleContent);
head[0].appendChild(style);
