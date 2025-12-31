/**
 * @bookmarklet Re-enable selection
 * @description Unset user-select CSS property
 * @author Adrian Roselli
 * @authorUrl https://adrianroselli.com/2015/01/css-bookmarklets-for-testing-and-fixing.html#Selection
 * @tags diagnostic
 * @pageTest true
 */
(function () {
  var a = document.createElement("style"),
    b;
  document.head.appendChild(a);
  b = a.sheet;
  b.insertRule("*{user-select:unset !important}", 0);
})();
