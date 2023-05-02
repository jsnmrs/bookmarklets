/* eslint-disable no-undef, no-unused-vars */
(function () {
  "use strict";
  function getXpath(e) {
    let t,
      o = e,
      n = e.tagName.toLowerCase(),
      i = "",
      a = "",
      r = "",
      l = "";
    for (; o.parentNode; ) {
      if ((t = o.parentNode).tagName) {
        i = t.tagName.toLowerCase();
        const e = t.querySelectorAll(":scope > " + o.tagName);
        (r =
          e.length > 1
            ? "[" + parseInt(Array.from(e).indexOf(o) + 1) + "]"
            : ""),
          (a = (n = o.tagName.toLowerCase()) + r + l + a),
          (l = "/");
      }
      o = t;
    }
    return "" === i && (i = n), (a = "//" + i + r + l + a);
  }
  function isolate() {
    let e,
      t,
      o,
      n = !0,
      i = !1;
    const a = document.querySelectorAll("*");
    function r(t, o) {
      (e = t), o.stopPropagation(), i || s(t), d(e);
    }
    function l(e) {
      e.classList.remove("isolatorHighlight");
    }
    function s(e) {
      e.classList.add("isolatorHighlight");
    }
    function d(e) {
      console.clear(), console.log(getXpath(e)), (o.innerHTML = getXpath(e));
    }
    Array.from(a).forEach((t) => {
      t.addEventListener("click", (o) => {
        console.log("preventClicks = ", n),
          n &&
            (!(function (t, o) {
              (e = t), "HTML" === t.tagName && (n = !1);
              !(function (e) {
                if (!i) {
                  const t = e.parentNode,
                    o = t.childNodes;
                  "HTML" !== t.tagName
                    ? Array.from(o).forEach((t) => {
                        t !== e && t.remove();
                      })
                    : (i = !0);
                }
              })(t);
            })(t),
            o.preventDefault());
      }),
        t.addEventListener("mouseover", (o) => {
          (e = t), o.stopPropagation(), i || s(t), d(e);
        }),
        t.addEventListener("mouseout", (e) => {
          l(t);
        });
    }),
      (function () {
        const e = document.createElement("style");
        (e.textContent =
          ".isolatorHighlight{outline:4px solid black!important;outline-offset:-4px!important;-webkit-box-shadow: 0px 0px 0px 4px #fff; box-shadow: 0px 0px 0px 4px #fff;}#infoPanel {z-index:1000;font-size:20px;background:rgba(0,0,0,0.8);color:#fff;font-weight:bold;padding:10px;position:fixed;bottom:20px;left:20px;font-family:sans-serif;} #infoPanel:empty {visibility:hidden;} #infoPanel code {color:lime}"),
          document.head.appendChild(e);
      })(),
      (o = document.createElement("div")).setAttribute("id", "infoPanel"),
      o.setAttribute("role", "status"),
      document.body.appendChild(o),
      document.addEventListener("keydown", function (n) {
        if (
          ("ArrowUp" === n.key &&
            (n.preventDefault(),
            e.parentNode &&
              "HTML" !== e.tagName &&
              (l(e),
              console.log("currentEl.parentNode = ", e.parentNode),
              (t = e.parentNode),
              s((e = t))),
            d(e),
            (o.textContent =
              o.textContent + " (Press Return to isolate this element)")),
          "ArrowLeft" === n.key &&
            (n.preventDefault(),
            e.previousElementSibling &&
              (l(e), r((e = e.previousElementSibling), n))),
          "ArrowRight" === n.key &&
            (n.preventDefault(),
            e.nextElementSibling && (l(e), r((e = e.nextElementSibling), n))),
          "ArrowDown" === n.key &&
            (n.preventDefault(), e.childNodes.length > 1))
        ) {
          l(e);
          let t,
            o = !1;
          Array.from(e.childNodes).forEach((e) => {
            1 !== e.nodeType || o || ((o = !0), (t = e));
          }),
            t && r((e = t), n);
        }
        "Enter" === n.key && (n.preventDefault(), e.click());
      }),
      d("Isolator started. Click on element you want to isolate in the DOM");
  }
  isolate();
})();
