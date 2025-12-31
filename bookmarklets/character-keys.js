/**
 * @bookmarklet Character key shortcuts
 * @description Test all printable character shortcut keys
 * @author Detlev Fischer
 * @authorUrl http://3needs.org/en/testing/code/kb-shortcuts.html
 * @tags 2.1.4 Character Key Shortcuts (A)
 * @auditing true
 * @pageTest true
 */
(function () {
  var e;
  var n = 32;
  var end = 8365;
  key();
  function key() {
    console.log("pressed: " + n + ": " + String.fromCharCode(n));
    e = document.createEvent("Event");
    e.initEvent("keydown", true, false);
    e.key = String.fromCharCode(n);
    e.which = n;
    e.keyCode = n;
    e.charCode = n;
    document.getElementsByTagName("BODY")[0].dispatchEvent(e);
    e = document.createEvent("Event");
    e.initEvent("keypress", true, false);
    e.key = String.fromCharCode(n);
    e.which = n;
    e.keyCode = n;
    e.charCode = n;
    document.getElementsByTagName("BODY")[0].dispatchEvent(e);
    e = document.createEvent("Event");
    e.initEvent("keyup", true, false);
    e.key = String.fromCharCode(n);
    e.which = n;
    e.keyCode = n;
    e.charCode = n;
    document.getElementsByTagName("BODY")[0].dispatchEvent(e);
    n++;
    if (n < end) {
      if (n == 127) n = 161;
      if (n == 192) n = 8364;
      window.setTimeout(key, 20);
    }
  }
})();
