// Test Content Security Policy
// via https://stackoverflow.com/a/61901020

document.addEventListener("securitypolicyviolation", cspCheck, false);

function cspCheck(e) {
  "use strict";
  alert(e.blockedURI);
  alert(e.violatedDirective);
  alert(e.originalPolicy);
}
