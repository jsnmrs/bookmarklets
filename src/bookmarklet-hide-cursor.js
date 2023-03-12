// Hide cursor
// Hides cursor from window to encourage keyboard use
// Iain Bean
// https://iainbean.com/posts/2020/an-opinionated-guide-to-accessibility-testing/

var style = document.createElement("style"),
  styleContent = document.createTextNode(
    '* { cursor: none !important; } body::after{ position: absolute; top: 0; right: 0; background-color: #f0f; color: #fff; z-index: 9999; font-size: 12px; font-weight: 400; padding: 1px 3px; content: "🫣 hiding cursor";}'
  ),
  head = document.getElementsByTagName("head");

style.appendChild(styleContent);
head[0].appendChild(style);
