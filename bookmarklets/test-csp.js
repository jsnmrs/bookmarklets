document.addEventListener("securitypolicyviolation", cspCheck, false);

var testScript = document.createElement("script");
testScript.setAttribute(
  "src",
  "https://jsnmrs.github.io/bookmarklets/bookmarklets/test-js-external.js"
);
document.body.appendChild(testScript);

function cspCheck(e) {
  "use strict";

  alert(e.violatedDirective + " breaks Content Security Policy (CSP)");
}
