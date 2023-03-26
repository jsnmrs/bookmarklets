(function () {
  /* eslint-disable no-inner-declarations */
  var d = document,
    id = "phltsbkmklt",
    el = d.getElementById(id),
    f = d.querySelectorAll("iframe"),
    i = 0,
    l = f.length;
  if (el) {
    function removeFromShadows(root) {
      for (var el of root.querySelectorAll("*")) {
        if (el.shadowRoot) {
          el.shadowRoot.getElementById(id).remove();
          removeFromShadows(el.shadowRoot);
        }
      }
    }
    el.remove();
    if (l) {
      for (i = 0; i < l; i++) {
        try {
          f[i].contentWindow.document.getElementById(id).remove();
          removeFromShadows(f[i].contentWindow.document);
        } catch (e) {
          console.log(e);
        }
      }
    }
    removeFromShadows(d);
  } else {
    var s = d.createElement("style");
    s.id = id;
    s.appendChild(
      d.createTextNode(
        "*{line-height:1.5 !important;letter-spacing:0.12em !important;word-spacing:0.16em !important;}p{margin-bottom:2em !important;}"
      )
    );
    function applyToShadows(root) {
      for (var el of root.querySelectorAll("*")) {
        if (el.shadowRoot) {
          el.shadowRoot.appendChild(s.cloneNode(true));
          applyToShadows(el.shadowRoot);
        }
      }
    }
    d.getElementsByTagName("head")[0].appendChild(s);
    for (i = 0; i < l; i++) {
      try {
        f[i].contentWindow.document
          .getElementsByTagName("head")[0]
          .appendChild(s.cloneNode(true));
        applyToShadows(f[i].contentWindow.document);
      } catch (e) {
        console.log(e);
      }
    }
    applyToShadows(d);
  }
})();
