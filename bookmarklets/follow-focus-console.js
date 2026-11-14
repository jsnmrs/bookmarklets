/**
 * @bookmarklet Follow focus (in console)
 * @description Displays the currently focused DOM node in the console
 * @author Jason Morris
 * @authorUrl https://jasonmorris.com
 * @tags accessibility, wcag:2.4.3
 * @auditing true
 * @pageTest self
 */
(function () {
  if (window._focusLogEnabled) {
    document.removeEventListener("focusin", window._focusLogHandler);
    window._focusLogEnabled = false;
    console.log("Follow focus (in console): logging disabled.");
    alert("Follow focus (in console): logging disabled.");
  } else {
    window._focusLogHandler = function (e) {
      console.log("Follow focus (in console):", e.target);
    };
    document.addEventListener("focusin", window._focusLogHandler);
    window._focusLogEnabled = true;
    console.log("Follow focus (in console): logging enabled.");
    alert(
      "Follow focus (in console): logging enabled. See the browser console for details."
    );
  }
})();
