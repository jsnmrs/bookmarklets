document.addEventListener("securitypolicyviolation", cspCheck, false);

function cspCheck(e) {
  "use strict";
  alert(e.blockedURI);
  alert(e.violatedDirective);
  alert(e.originalPolicy);
}

var style = document.createElement("style"),
  styleContent = document.createTextNode(
    'body::after{ position: absolute; top: 0; right: 4px; background-color: #000; color: #01ff70; z-index: 9999; font-size: 16px; font-weight: 400; padding: 3px 9px; outline: 4px solid #01ff70 !important; content: "checking for CSP";}}'
  ),
  head = document.getElementsByTagName("head");

style.appendChild(styleContent);
head[0].appendChild(style);
