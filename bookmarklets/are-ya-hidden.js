/* eslint-disable no-undef */
(function () {
  var allElements = document.querySelectorAll("*");
  function findAllVisuallyHiddenElements() {
    Array.from(allElements).forEach((i) => {
      cs = getComputedStyle(i);
      for (
        var a = !1,
          t = !1,
          e = !1,
          n = !1,
          l = !1,
          s = !1,
          r = !1,
          d = !1,
          o = 0;
        o < cs.length;
        o++
      )
        (cssProperty = cs[o]),
          (cssValue = cs.getPropertyValue(cssProperty)),
          "clip" === cssProperty &&
            "rect(1px, 1px, 1px, 1px)" === cssValue &&
            (a = !0),
          "clip-path" === cssProperty && "inset(100%)" === cssValue && (t = !0),
          "height" === cssProperty && "1px" === cssValue && (e = !0),
          "overflow-x" === cssProperty && "hidden" === cssValue && (n = !0),
          "overflow-y" === cssProperty && "hidden" === cssValue && (l = !0),
          "position" === cssProperty && "absolute" === cssValue && (s = !0),
          "white-space" === cssProperty && "nowrap" === cssValue && (r = !0),
          "width" === cssProperty && "1px" === cssValue && (d = !0);
      !0 === a &&
        !0 === t &&
        !0 === e &&
        !0 === n &&
        !0 === l &&
        !0 === s &&
        !0 === r &&
        !0 === d &&
        i.classList.add("was-visually-hidden");
      let c = i.classList;
      c.forEach((a) => {
        -1 !== a.indexOf("-offscreen") &&
          i.classList.add("was-visually-hidden");
      }),
        (i.classList.contains("sr-only") ||
          i.classList.contains("screenreader-only") ||
          i.classList.contains("visually-hidden") ||
          i.classList.contains("visuallyhidden")) &&
          i.classList.add("was-visually-hidden");
    });
  }
  function indicateAriaHiddenElements(i) {
    findAllVisuallyHiddenElements();
    var a,
      t = i.createElement("style");
    i.head.appendChild(t),
      (a = t.sheet).insertRule(
        "[aria-hidden=true] {background:black;color:black;}",
        0
      ),
      a.insertRule("[aria-hidden=true] [aria-hidden=true] {opacity:1}", 0),
      a.insertRule(
        ".was-visually-hidden {clip-path: initial!important;clip: initial!important;height: auto!important;overflow: initial!important;position: initial!important;white-space: initial!important;width: auto!important;opacity:initial!important;z-index:initial!important;background:black!important;color:lime!important;}",
        0
      );
  }
  indicateAriaHiddenElements(document);
  var iframes = document.querySelectorAll("iframe");
  Array.from(iframes).forEach((i) => {
    indicateAriaHiddenElements(i.contentWindow.document);
  });
})();
