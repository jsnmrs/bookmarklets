/**
 * @bookmarklet HTML CodeSniffer
 * @description Checks HTML source code and detects violations of a defined coding standard
 * @author Squiz Labs
 * @authorUrl https://squizlabs.github.io/HTML_CodeSniffer/
 * @tags accessibility, external
 * @pageTest self
 */
(function () {
  var _p = "//squizlabs.github.io/HTML_CodeSniffer/build/";
  var _i = function (s, cb) {
    var sc = document.createElement("script");
    sc.onload = function () {
      sc.onload = null;
      sc.onreadystatechange = null;
      cb.call(this);
    };
    sc.onreadystatechange = function () {
      if (/^(complete|loaded)$/.test(this.readyState) === true) {
        sc.onreadystatechange = null;
        sc.onload();
      }
    };
    sc.src = s;
    if (document.head) {
      document.head.appendChild(sc);
    } else {
      document.getElementsByTagName("head")[0].appendChild(sc);
    }
  };
  var options = { path: _p };
  _i(_p + "HTMLCS.js", function () {
    HTMLCSAuditor.run("WCAG2AA", null, options);
  });
})();
