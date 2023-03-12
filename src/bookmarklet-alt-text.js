// Alt text
// Highlight images without alt attributes
// Jason Morris
// https://jasonmorris.com

var style = document.createElement("style"),
  styleContent = document.createTextNode(
    'img{outline: 4px solid #f0f !important;position: relative;} img[alt]{outline: none !important;} body::after{ position: absolute; top: 0; right: 0; background-color: #f0f; color: #fff; z-index: 9999; font-size: 12px; font-weight: 400; padding: 1px 3px; content: "🔦 images without alt attributes";}'
  ),
  head = document.getElementsByTagName("head");

style.appendChild(styleContent);
head[0].appendChild(style);
