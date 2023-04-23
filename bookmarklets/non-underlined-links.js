/* eslint-disable no-unused-vars */
(function () {
  "use strict";
  var consoleOutput = "";
  function checkNonUnderlinedLinks() {
    console.clear();
    let e = !1,
      t = !1,
      o = !1,
      n = !1;
    const r = document.querySelectorAll("a");
    let l = 0,
      a = !1,
      s = !1;
    function i(e, t, o) {
      const n = [e, t, o].map(function (e) {
        return (e /= 255) <= 0.03928
          ? e / 12.92
          : Math.pow((e + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
    }
    function c(e) {
      return (e = (e = (e = e.replace("rgb(", "")).replace(")", "")).split(
        ", "
      ));
    }
    if (
      ((function () {
        const e = document.createElement("style");
        (e.textContent =
          ".problem-highlight {outline:5px solid darkred;outline-offset:3px;box-shadow: 0px 0px 0px 10px #fff;}"),
          document.head.appendChild(e);
      })(),
      Array.from(r).forEach((r) => {
        if (
          ((a = !1),
          (s = !1),
          (n = (function (e, t) {
            for (
              ;
              (e = e.parentElement) &&
              !(e.matches || e.matchesSelector).call(e, t);

            );
            return e;
          })(r, "nav,[role=navigation]")),
          r.childNodes.length > 0 &&
            (r.childNodes[0].tagName &&
              (("IMG" !== r.childNodes[0].tagName.toUpperCase() &&
                "SVG" !== r.childNodes[0].tagName.toUpperCase() &&
                "FIGURE" !== r.childNodes[0].tagName.toUpperCase()) ||
                (a = !0)),
            !(function (n) {
              (e = !1), (t = !1), (o = !1);
              const r = getComputedStyle(n);
              for (let n = 0; n < r.length; n++) {
                const l = r[n],
                  a = r.getPropertyValue(l);
                "text-decoration-line" === l && "underline" === a && (t = !0),
                  "border-bottom-style" !== l ||
                    ("solid" !== a && "dotted" !== a && "dashed" !== a) ||
                    (o = !0),
                  "border-bottom-color" === l &&
                    "transparent" === a &&
                    (o = !1),
                  (t || o) && (e = !0);
              }
              return e;
            })(r) && !a))
        ) {
          (consoleOutput += "-------\n"),
            (consoleOutput += "Link text: " + r.textContent + "\n"),
            n ||
              (!(function (e) {
                e.classList.add("problem-highlight");
              })(r),
              (consoleOutput +=
                "Affected node (xpath): " +
                (function (e) {
                  let t,
                    o = e,
                    n = e.tagName.toLowerCase(),
                    r = "",
                    l = "",
                    a = "",
                    s = "";
                  for (; o.parentNode; ) {
                    if ((t = o.parentNode).tagName) {
                      r = t.tagName.toLowerCase();
                      const e = t.querySelectorAll(o.tagName);
                      (a =
                        e.length > 1
                          ? "[" + parseInt(Array.from(e).indexOf(o) + 1) + "]"
                          : ""),
                        (l = (n = o.tagName.toLowerCase()) + a + s + l),
                        (s = "/");
                    }
                    o = t;
                  }
                  return "" === r && (r = n), (l = "//" + r + a + s + l);
                })(r) +
                "\n"),
              l++);
          const e = (function (e, t) {
            const o = i(e[0], e[1], e[2]),
              n = i(t[0], t[1], t[2]);
            return (Math.max(o, n) + 0.05) / (Math.min(o, n) + 0.05);
          })(
            c(getComputedStyle(r).color),
            c(getComputedStyle(r.parentNode).color)
          );
          n
            ? (consoleOutput +=
                "Link is inside a <nav> element and therefore its position/display does not require the underline for it to be perceived as a link.\n")
            : (e < 3 &&
                (consoleOutput +=
                  "🚨 Contrast between link text and parent text node is under 3:1. Ratio is " +
                  e.toFixed(2) +
                  ":1."),
              (consoleOutput +=
                "\n   Very likely a [SC 1.4.1 Use of Color](https://www.w3.org/TR/WCAG21/#use-of-color) issue\n"));
        }
      }),
      l > 0)
    ) {
      const e = l + " possible issues with non-underlined links found";
      (consoleOutput = e + "\n" + consoleOutput),
        alert(e + " (check console for more details)");
    } else
      alert("No non-underlined links found (outside of a navigation area)");
    console.log(consoleOutput);
  }
  checkNonUnderlinedLinks();
  var kmOutput = consoleOutput;
})();
