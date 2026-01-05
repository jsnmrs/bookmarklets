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
    console.log("Focus logging disabled.");
    alert("Focus logging disabled.");
  } else {
    window._focusLogHandler = function (e) {
      console.log("Focused:", e.target);
    };
    document.addEventListener("focusin", window._focusLogHandler);
    window._focusLogEnabled = true;
    console.log("Focus logging enabled.");
    alert("Focus logging enabled. Open DevTools console (F12) to see results.");
  }
})();
