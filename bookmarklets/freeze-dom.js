/**
 * @bookmarklet Freeze DOM in 5 seconds
 * @description Freezes DOM in 5 seconds for capture
 * @author Jason Morris
 * @authorUrl https://jasonmorris.com
 * @tags accessibility
 * @auditing true
 * @pageTest true
 */
(function () {
  setTimeout(function () {
    debugger;
  }, 5000);
})();
