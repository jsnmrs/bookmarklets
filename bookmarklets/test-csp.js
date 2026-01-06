/**
 * @bookmarklet Test CSP
 * @description Test for errors related Content Security Policy (CSP)
 * @author SecurityPolicyViolationEvent on MDN
 * @authorUrl https://developer.mozilla.org/en-US/docs/Web/API/SecurityPolicyViolationEvent#examples
 * @tags diagnostic
 * @pageTest self
 */
document.addEventListener("securitypolicyviolation", cspCheck, false);

var testScript = document.createElement("script");
testScript.setAttribute(
  "src",
  "https://code.jasonmorris.com/bookmarklets/bookmarklets/test-js-external.js"
);
document.body.appendChild(testScript);

function cspCheck(e) {
  "use strict";

  alert(e.violatedDirective + " breaks Content Security Policy (CSP)");
}
