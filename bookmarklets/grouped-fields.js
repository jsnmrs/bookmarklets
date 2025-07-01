(function () {
  function outlineGroupedFIelds() {
    let e = "#662e2e",
      l = 0;
    function r(e, r) {
      ((e.style.boxShadow = "0px 0px 0px 10px white"),
        (e.style.outline = "5px solid " + r),
        (e.style.outlineOffset = "5px"),
        l++);
    }
    function t(e, l, r) {
      let t = document.createElement("span");
      ((t.innerHTML = l),
        (t.style.display = "inline-block"),
        (t.style.margin = "20px 0 5px -10px"),
        (t.style.padding = "5px"),
        (t.style.background = r),
        (t.style.fontWeight = "bold"),
        (t.style.fontSize = "18px"),
        (t.style.color = "white"),
        t.classList.add("group-description"));
      let o = e.parentNode;
      o.insertBefore(t, e);
    }
    var o,
      a = document.querySelectorAll("fieldset");
    (console.log(a),
      Array.from(a).forEach((l) => {
        (console.log(l),
          r(l, e),
          l.querySelector("legend") &&
            t(
              l,
              'Group label (from fieldset > legend): <br><br>"' +
                l.querySelector("legend").textContent +
                '"',
              e
            ));
      }),
      (e = "#66482e"),
      Array.from(
        document.querySelectorAll(
          "[role=group][aria-label],[role=region][aria-label]"
        )
      ).forEach((l) => {
        console.log(l);
        let o = l.getAttribute("role").toLowerCase();
        (r(l, e),
          t(
            l,
            "Group label (from [role=" +
              o +
              '][aria-label]): <br><br>"' +
              l.getAttribute("aria-label") +
              '"',
            e
          ));
      }),
      (e = "#662e43"),
      Array.from(
        document.querySelectorAll(
          "[role=group][aria-labelledby],[role=region][aria-labelledby]"
        )
      ).forEach((l) => {
        console.log(l);
        let o = l.getAttribute("role").toLowerCase();
        r(l, e);
        let a = "Source for aria-labelledby is missing/broken";
        (document.querySelector("#" + l.getAttribute("aria-labelledby")) &&
          (a = document.querySelector(
            "#" + l.getAttribute("aria-labelledby")
          ).textContent),
          t(
            l,
            "Group label (from [role=" +
              o +
              '][aria-labelledby]): <br><br>"' +
              a +
              '"',
            e
          ));
      }),
      0 === l && alert("No grouped fields found on this page"));
  }
  outlineGroupedFIelds();
})();
