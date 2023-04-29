/* eslint-disable no-unused-vars */
(function (e) {
  if (e) {
    var d = /(&|\?)(\w+)=true/gi,
      k = window.location.href,
      f,
      p = "",
      l = {};
    while ((f = d.exec(k))) {
      p += " " + f[2];
      l[f[2]] = true;
    }
    if (!l.genie) {
      return;
    }
  }
  var g = document.documentElement,
    i = document.head,
    h = document.body,
    c = "vp-genie",
    j = document.getElementById(c),
    a = document.getElementById(c + "-style"),
    o,
    n = g.clientWidth ? true : false;
  var b = {
    init: function () {
      if (j) {
        h.removeChild(j);
        i.removeChild(a);
        return;
      }
      var m =
          "#" +
          c +
          "{background: rgba(255,0,0,.75);border: 1px solid #900;-webkit-box-shadow: 2px 2px 2px rgba(0,0,0,.3);box-shadow: 2px 2px 2px rgba(0,0,0,.3);color: #fff;font-family: monospace;font-size: 13px;left: 0;line-height: 17px;padding: 3px 6px 5px;position: fixed;top: 0;z-index: 9999;}#" +
          c +
          " span {white-space: nowrap;}",
        q = document.createTextNode(m);
      a = document.createElement("style");
      a.setAttribute("id", c + "-style");
      a.type = "text/css";
      if (a.styleSheet) {
        a.styleSheet.cssText = q.nodeValue;
      } else {
        a.appendChild(q);
      }
      i.appendChild(a);
      j = document.createElement("div");
      j.setAttribute("id", c);
      h.appendChild(j);
      b.calculate();
      if (window.addEventListener) {
        window.addEventListener("resize", b.calculate, false);
      }
    },
    calculate: function () {
      if (window.getComputedStyle) {
        o = parseInt(window.getComputedStyle(g).getPropertyValue("font-size"));
      } else {
        o = 16;
      }
      var q, m;
      if (n) {
        q = g.clientWidth;
        m = g.clientHeight;
      } else {
        q = window.innerWidth;
        m = window.innerHeight;
      }
      j.innerHTML =
        "<span>" +
        q +
        "px &times; " +
        m +
        "px</span> &bull; <span>" +
        q / o +
        "em &times; " +
        m / o +
        "em</span>";
    },
  };
  b.init();
})();
