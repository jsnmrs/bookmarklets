/**
 * @bookmarklet Find Duplicate ARIA Roles
 * @description Roles appearing more than once for banner, contentinfo, and main
 * @author Adrian Roselli
 * @authorUrl https://adrianroselli.com/2015/01/css-bookmarklets-for-testing-and-fixing.html#ARIAdupes
 * @tags accessibility, wcag:4.1.2
 * @auditing true
 * @pageTest true
 */
(function () {
  var a = document.createElement("style"),
    b;
  document.head.appendChild(a);
  b = a.sheet;
  b.insertRule(
    "*[role=main]:nth-of-type(n+2),*[role=banner]:nth-of-type(n+2),*[role=contentinfo]:nth-of-type(n+2),main:nth-of-type(n+2){border:2px dotted #f00 !important;background-color:#f00;}",
    0
  );
})();
