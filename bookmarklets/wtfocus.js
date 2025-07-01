(function () {
  "use strict";
  function WTFocus() {
    let e = document.activeElement;
    const t = document.querySelectorAll(
        'a[href],button,select,input:not([type="hidden"]),textarea,summary,area,[tabindex]:not(#WTFocusPanel):not([tabindex^="-1"]),[contenteditable]:not([contenteditable="false"])'
      ),
      o =
        "background:#fff;color:darkgreen;font-weight:bold;text-decoration:line-through",
      n =
        "font-weight:bold;color:#99f170;background:#333;display:inline-block;padding:3px;",
      a = "color:pink;background:#333;padding:3px;",
      l = "color:black;background:#fefbe3;font-weight:bold;",
      r = document.createElement("div"),
      i = document.createElement("div"),
      c = 20,
      s = 400,
      u = 7,
      d =
        '<span aria-hidden="true">👉🏽</span><span class="visually-hidden">Accessible name provided by</span> ',
      b =
        '<span aria-hidden="true">🚨</span> <span class="visually-hidden">Warning</span>';
    let p,
      m = "Accessible name: ",
      f = !1,
      g = "",
      y = !1,
      h = !1,
      A = !1,
      x = !1,
      v = !1;
    function T() {
      ((y = !1), (h = !1));
    }
    function k(e, t, o, n, a) {
      (f &&
        ((t = t.split("<").join("&lt;").split(">").join("&gt;")),
        (g += "<li"),
        (a || n) &&
          ((g += ' class="'),
          a && (g += "visible"),
          n && (g += "outline"),
          (g += '"')),
        (g += ' role="listitem"><span style="' + o + '">'),
        y && (g += d),
        h && (g += b),
        (g += e + "</span>&nbsp;" + t + "</li>\n")),
        (t = t.replace("&lt;", "<").replace("&gt;", ">")),
        console.log("%c" + e + '"' + t + '"', o));
    }
    function F() {
      const e = document.createElement("button");
      ((e.textContent = "Close (Esc)"),
        e.setAttribute("type", "button"),
        e.setAttribute("class", "panel-btn"),
        e.addEventListener("click", () => {
          W();
        }));
      const t = document.createElement("button");
      ((t.textContent = "Change Mode (M)"),
        t.setAttribute("type", "button"),
        t.setAttribute("class", "panel-btn"),
        t.addEventListener("click", (e) => {
          S();
        }),
        r.appendChild(e),
        r.appendChild(t));
    }
    function S() {
      (v
        ? (document
            .querySelector("#WTFocusPanel")
            .classList.remove("curtainsMode"),
          document.querySelector("#WTFocusPanel").removeAttribute("style"),
          document
            .querySelector("#WTFocusCurtain")
            .setAttribute("hidden", "hidden"),
          (v = !1),
          (m = "Accessible name: "))
        : (document
            .querySelector("#WTFocusPanel")
            .classList.add("curtainsMode"),
          document.querySelector("#WTFocusCurtain").removeAttribute("hidden"),
          (v = !0),
          (m = "")),
        C(e),
        e.focus());
    }
    function W() {
      (document.querySelector("#WTFocusCurtain").remove(),
        document.querySelector("#WTFocusPanel").remove(),
        document.querySelector("#panelStyles").remove(),
        document.querySelector("#focusStyles").remove());
    }
    function C(e) {
      const t = e.getBoundingClientRect(),
        o = document.documentElement.scrollTop,
        n = t.right + c + s,
        a = r.offsetHeight,
        l = o + t.top + a,
        i = window.innerWidth,
        d = window.innerHeight;
      v
        ? document.querySelector("#WTFocusPanel").removeAttribute("style")
        : n > i
          ? (l > d
              ? ((r.style.top = "auto"),
                (r.style.bottom = d - (o + t.bottom) - 10 + "px"),
                r.classList.add("toBottom"))
              : ((r.style.top = o + t.top + "px"),
                (r.style.bottom = "auto"),
                r.classList.remove("toBottom")),
            (r.style.left = "auto"),
            (r.style.right = i - t.left + c - u + "px"),
            r.classList.add("toLeft"))
          : (l > d
              ? ((r.style.top = "auto"),
                (r.style.bottom = d - (o + t.bottom) - 10 + "px"),
                r.classList.add("toBottom"))
              : ((r.style.top = o + t.top + "px"),
                (r.style.bottom = "auto"),
                r.classList.remove("toBottom")),
            (r.style.left = t.right + c - u + "px"),
            (r.style.right = "auto"),
            r.classList.remove("toLeft"));
    }
    (console.clear(),
      (function () {
        const e = document.createElement("style");
        (e.setAttribute("type", "text/css"),
          e.setAttribute("id", "panelStyles"),
          (e.textContent =
            ".dupeAccName {outline:4px dashed #CC3300!important;outline-offset:" +
            u +
            "px!important;overflow:visible;} .WTFocusTempFocusStyle:focus {outline:" +
            u +
            "px solid black!important;outline-offset:" +
            u +
            "px!important;overflow:visible;/*background:yellow!important;color:black!important;*/} .WTFocusTempFocusStyle.dupeAccName:focus {outline-color:#CC3300!important;} .visually-hidden {clip-path: inset(100%);clip: rect(1px, 1px, 1px, 1px);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;}#WTFocusCurtain {background:black;position: fixed;top: 0;bottom: 0;left: 0;right: 0;z-index:49999}"),
          document.querySelector("body").appendChild(e));
      })(),
      document.querySelector("#WTFocusCurtain") && W(),
      (f = !0),
      (g = ""),
      (function (e) {
        const t = document.createElement("style");
        (t.setAttribute("type", "text/css"),
          t.setAttribute("id", "focusStyles"),
          (t.textContent =
            "#WTFocusPanel.error {background:darkred;} #WTFocusPanel.warning {background:#CC3300;} #WTFocusPanel.curtainsMode.error {background:black;} #WTFocusPanel.curtainsMode {z-index:50000;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);} #WTFocusPanel.curtainsMode.warning {background:black;} #WTFocusPanel[hidden] {display:none;} #WTFocusPanel * {text-align:left} #WTFocusPanel {border:2px solid #fff;z-index:1000;text-shadow:none;font-family:sans-serif;display:block;text-align:left;position: absolute;z-index:10000;background: black;padding: 20px 20px;width:" +
            e +
            "px;font-size:16px;} #WTFocusPanel button {font-weight:bold;background:none;color:#fff;padding:3px 10px;font-size:14px;border:1px solid #fff;display:inline-block;margin:10px 1em -10px 0;} #WTFocusPanel ul,#WTFocusPanel li {margin:0;padding:0;list-style:none} #WTFocusPanel li {margin:3px 0;background:#fff;color:#333;padding:2px} #WTFocusPanel li.outline {outline:4px solid rgb(58, 190, 58);outline-offset:-4px;padding:8px} #WTFocusPanel.error:before {background:darkred} #WTFocusPanel.warning:before {background:#CC3300} #WTFocusPanel:before {content:'';display:block;height:20px;width:20px;transform:rotate(45deg);position:absolute;background:#000;left:-12px;top:3px;border:2px solid #fff;border-right:none;border-top:none;} #WTFocusPanel.toBottom:before {top:auto;bottom:3px} #WTFocusPanel.toLeft:before {left:auto;right:-12px;border:2px solid #fff;border-left:none;border-bottom:none;} #WTFocusPanel.curtainsMode {outline:10px solid orange;} #WTFocusPanel.curtainsMode:before {display:none;} #WTFocusPanel.curtainsMode li {display:none;} #WTFocusPanel.curtainsMode li.visible {display:block;} #WTFocusPanel.curtainsMode li span {display:none!important;} "),
          document.querySelector("head").appendChild(t));
      })(s),
      i.setAttribute("id", "WTFocusCurtain"),
      i.setAttribute("hidden", "hidden"),
      document.querySelector("body").appendChild(i),
      r.setAttribute("id", "WTFocusPanel"),
      v && r.setAttribute("class", "curtainsMode"),
      r.setAttribute("aria-live", "polite"),
      r.setAttribute("tabindex", "-1"),
      r.setAttribute("hidden", "hidden"),
      r.setAttribute("role", "region"),
      r.setAttribute("aria-label", "Accessibility properties panel"),
      document.querySelector("body").appendChild(r),
      window.addEventListener("keyup", (e) => {
        "Escape" === e.key && document.querySelector("#WTFocusPanel") && W();
      }),
      window.addEventListener("keyup", (e) => {
        "m" === e.key.toLowerCase() &&
          document.querySelector("#WTFocusPanel") &&
          S();
      }),
      F());
    let N = [];
    Array.from(t).forEach(function (i) {
      i.classList.add("WTFocusTempFocusStyle");
      const c = i.querySelectorAll("style");
      (Array.from(c).forEach(function (e) {
        e.remove();
      }),
        i.addEventListener("focus", () => {
          let c = i.getAttribute("role"),
            s = i.tagName.toLowerCase();
          if ((console.clear(), c));
          else if (
            (("article" != s &&
              "button" != s &&
              "dialog" != s &&
              "figure" != s &&
              "img" != s &&
              "main" != s &&
              "math" != s) ||
              (c = s),
            "summary" == s && (c = "button"),
            "aside" == s && (c = "complementary"),
            "dd" == s && (c = "definition"),
            "html" == s && (c = "document"),
            ("details" != s && "fieldset" != s && "optgroup" != s) ||
              (c = "group"),
            ("menu" != s && "ol" != s && "ul" != s) || (c = "list"),
            "datalist" == s && (c = "listbox"),
            "li" == s && (c = "listitem"),
            "nav" == s && (c = "navigation"),
            "progress" == s && (c = "progressbar"),
            "hr" == s && (c = "separator"),
            "output" == s && (c = "status"),
            ("dfn" != s && "dt" != s) || (c = "term"),
            "a" == s && (c = "link"),
            "select" == s && (c = "listbox"),
            "textarea" == s && (c = "textbox"),
            "input" == s)
          ) {
            let e = i.getAttribute("type").toLowerCase();
            ("text" === e && (c = "textbox"),
              "range" === e && (c = "slider"),
              "number" === e && (c = "spinbutton"),
              ("checkbox" !== e && "radio" !== e) || (c = e),
              ("button" !== e &&
                "image" !== e &&
                "reset" !== e &&
                "submit" !== e) ||
                (c = "button"));
          }
          ((e = i),
            Array.from(t).forEach(function (e) {
              e.classList.remove("dupeAccName");
            }));
          let u = !1;
          ((y = !1), (h = !1));
          const d = i.querySelectorAll(
            "img, [role='image'][aria-label], [role='img'][aria-label]"
          );
          ((u = d.length > 0) &&
            Array.from(d).forEach(function (e) {
              const t = document.createElement("SPAN");
              var o, n;
              (t.setAttribute("class", "visually-hidden"),
                t.setAttribute(
                  "style",
                  "clip-path: inset(100%);clip: rect(1px, 1px, 1px, 1px);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;"
                ),
                t.setAttribute("data-temp-node", "true"),
                e.getAttribute("alt") &&
                  (t.textContent = " " + e.getAttribute("alt") + " "),
                e.getAttribute("role") &&
                  e.getAttribute("aria-label") &&
                  (t.textContent = " " + e.getAttribute("aria-label") + " "),
                (o = t),
                (n = e).parentNode.insertBefore(o, n.nextSibling));
            }),
            setTimeout(function () {
              i.classList.add("WTFocusTempFocusStyle");
            }, 100),
            (g = ""));
          const b = i.tagName.toLowerCase();
          let p = i.getAttribute("role");
          p && (p = i.getAttribute("role").toLowerCase());
          let v = "<" + b + ">",
            S = !1,
            W = !1;
          p &&
            ((v = "<" + b + ' role="' + p + '">'),
            (("link" === p && "a" === b) ||
              ("button" === p && "button" === b) ||
              ("image" === p && "img" === b) ||
              ("img" === p && "img" === b) ||
              ("navigation" === p && "nav" === b) ||
              ("heading" === p &&
                ("h1" === b ||
                  "h2" === b ||
                  "h3" === b ||
                  "h4" === b ||
                  "h5" === b ||
                  "h6" === b))) &&
              (S = !0),
            (("link" === p && "a" !== b) ||
              ("button" === p && "button" !== b) ||
              (("image" === p || "image" === p) && "img" !== b) ||
              ("navigation" === p && "nav" !== b) ||
              ("heading" === p &&
                "h1" !== b &&
                "h2" !== b &&
                "h3" !== b &&
                "h4" !== b &&
                "h5" !== b &&
                "h6" !== b)) &&
              (W = !0));
          let w,
            P = i.textContent,
            L = i.ariaLabel,
            q = i.getAttribute("aria-labelledby"),
            M = i.getAttribute("placeholder"),
            B = "",
            z = i.getAttribute("value"),
            I = i.getAttribute("title"),
            H = "",
            j = "",
            O = !1,
            R = !1,
            V = "",
            D = !1;
          (f && C(i), (P = P.trim()));
          const Y = (function (e, t) {
            for (
              ;
              (e = e.parentElement) &&
              !(e.matches || e.matchesSelector).call(e, t);

            );
            return e;
          })(i, "label");
          if (
            (Y && ((O = !0), (H = j = Y.textContent.trim())),
            i.getAttribute("id"))
          ) {
            const e = document.querySelector(
              "[for='" + i.getAttribute("id") + "']"
            );
            e && ((R = !0), (j = e.textContent));
          }
          if (
            (O || R || (j = "N/A"),
            P || (P = "N/A"),
            z || (z = "N/A"),
            I || (I = "N/A"),
            M || (M = "N/A"),
            L || (L = "N/A"),
            q)
          ) {
            const e = (w = q).split(" ");
            e.length > 1
              ? (Array.from(e).forEach(function (e) {
                  document.querySelector("#" + e)
                    ? (B += document.querySelector("#" + e).textContent + " ")
                    : (B += "❓❓❓ ");
                }),
                (B = B.trim()))
              : (B = document.querySelector("#" + w).textContent);
          } else q = "N/A";
          const G = i.querySelectorAll(
            "[aria-hidden='true'],[role='presentation']"
          );
          let J = P;
          if (
            (G.length > 0 &&
              ((D = !0),
              Array.from(G).forEach(function (e) {
                const t = e.textContent;
                "" !== t && (J = J.split(t).join(" "));
              }),
              (J = J.trim())),
            "input" === b)
          ) {
            const e = i.getAttribute("type");
            ("submit" === e &&
              "N/A" === z &&
              ((H = "Submit"), (V = "Not provided (using default)")),
              "image" === e &&
                "N/A" === z &&
                ((H = "Submit"), (V = "Not provided (using default)")),
              "cancel" === e &&
                "N/A" === z &&
                ((H = "Cancel"), (V = "Not provided (using default)")));
          }
          if (
            ("N/A" !== I && ((H = I), (V = "title attribute")),
            "N/A" !== z && ((H = z), (V = "value attribute")),
            "N/A" !== M && ((H = M), (V = "placeholder attribute")),
            "N/A" !== P && ((H = J), (V = "Inner text content")),
            "N/A" !== j && ((H = j), (V = "<label> text")),
            "N/A" !== L && ((H = L), (V = "aria-label")),
            "N/A" !== q && ((H = B), (V = "aria-labelledby")),
            console.log(
              "%cACTIVE ELEMENT: ",
              "background:#193c10;color:white;"
            ),
            console.log(i),
            (A = "true" === i.getAttribute("data-dupe")),
            (x = A && "" === H),
            "" === H || A)
          ) {
            if (
              ("" === H &&
                ((h = !0),
                f && r.classList.add("error"),
                k(m + "No accessible name!", "", a),
                k("Accessible Name Source: N/A", "", a)),
              A && "" !== H)
            ) {
              f && r.classList.add("warning");
              const e = document.querySelectorAll("[data-accname='" + H + "']"),
                t = e.length;
              (k(m, H, a, !1, !0),
                x ||
                  (Array.from(e).forEach(function (e) {
                    e.classList.add("dupeAccName");
                  }),
                  k(
                    "Duplicate warning!",
                    t + " elements on page have the same accessible name",
                    a
                  )),
                console.log(
                  "Elements on page that have identical accessible names:"
                ),
                Array.from(e).forEach(function (e) {
                  console.log(e);
                }),
                k("Accessible Name Source: ", V, a));
            }
          } else
            (f && (r.classList.remove("error"), r.classList.remove("warning")),
              k(m, H, n, !1, !0),
              k("Accessible Name Source: ", V, n));
          ((h = !1),
            k("HTML Element: ", v, n),
            k("Role: ", c, "color:#333;background:#fff;", !1, !0),
            f ||
              console.log(
                "%cACCESSIBLE NAME COMES FROM: ",
                "background:#193c10;color:white;"
              ),
            S && ((h = !0), k("Superfluous `role` attribute", "", a)),
            W && ((h = !0), k("Better to use a native HTML element", "", a)),
            (P = P.trim()),
            (j = j.trim()),
            (I = I.trim()),
            (L = L.trim()),
            (q = q.trim()),
            T(),
            "placeholder attribute" === V
              ? ((y = !0), k("@placeholder: ", M, l, !0))
              : k(
                  "@placeholder: ",
                  M,
                  "N/A" === M ? "color:#333;background:#fff;" : o
                ),
            T(),
            "title attribute" === V
              ? ((y = !0), k("@title: ", I, l, !0))
              : k(
                  "@title: ",
                  I,
                  "N/A" === I ? "color:#333;background:#fff;" : o
                ),
            T(),
            "value attribute" === V
              ? ((y = !0), k("@value: ", z, l, !0))
              : k(
                  "@value: ",
                  z,
                  "N/A" === z ? "color:#333;background:#fff;" : o
                ),
            T(),
            "Inner text content" === V
              ? ((y = !0),
                k(
                  u
                    ? "Inner text content (includes image alt): "
                    : "Inner text content: ",
                  P,
                  l,
                  !0
                ),
                D && k("! elements hidden to AT removed", "", l))
              : k(
                  "Text Content: ",
                  P,
                  "N/A" === P ? "color:#333;background:#fff;" : o
                ),
            T(),
            "<label> text" === V
              ? ((y = !0), k("Visible `label` text: ", j, l, !0))
              : k(
                  "Visible `label` text: ",
                  j,
                  "N/A" === j ? "color:#333;background:#fff;" : o
                ),
            T(),
            "aria-label" === V
              ? L === P
                ? ((h = !0),
                  k(
                    "`aria-label` content is same as inner text content",
                    "",
                    a
                  ))
                : ((y = !0), k("@aria-label value: ", L, l, !0))
              : k(
                  "@aria-label value: ",
                  L,
                  "N/A" === L ? "color:#333;background:#fff;" : o
                ),
            T(),
            "aria-labelledby" === V
              ? B === P
                ? ((h = !0),
                  k(
                    "`aria-labelledby` source content is same as inner text content",
                    "",
                    a
                  ))
                : ((y = !0),
                  k("@aria-labelledby value: ", q, l, !0),
                  k("@aria-labelledby sources: ", B, l))
              : (k(
                  "@aria-labelledby value: ",
                  q,
                  "color:#333;background:#fff;"
                ),
                k(
                  "@aria-labelledby sources: ",
                  "N/A",
                  "color:#333;background:#fff;"
                )),
            f &&
              ((document.querySelector("#WTFocusPanel").innerHTML =
                '<ul role="list">' + g + "</ul>"),
              document.querySelector("#WTFocusPanel").removeAttribute("hidden"),
              F()));
          const K = document.querySelectorAll("[data-temp-node]");
          (Array.from(K).forEach(function (e) {
            e.remove();
          }),
            i.setAttribute("data-accname", H),
            E ||
              (function (e, t) {
                let o = !1;
                if (
                  (Array.from(N).forEach(function (t) {
                    t === e && (o = !0);
                  }),
                  o)
                ) {
                  t.setAttribute("data-dupe", "true");
                  const o = document.querySelector(
                    "[data-accname='" + e + "']"
                  );
                  o.setAttribute("data-dupe", "true");
                } else N.push(e);
              })(H, i));
        }));
    });
    let E = !1;
    (!(function () {
      if (
        ((p = document.activeElement),
        Array.from(t).forEach(function (e) {
          (document.activeElement === e && e.blur(), e.focus());
        }),
        (E = !0),
        "BODY" === p.tagName)
      ) {
        const e = document.querySelector("body");
        (e.setAttribute("tabindex", "-1"),
          e.focus(),
          document
            .querySelector("#WTFocusPanel")
            .setAttribute("hidden", "hidden"));
      } else p.focus();
      console.clear();
    })(),
      console.log("had focus = ", e));
  }
  WTFocus();
})();
