/* eslint-disable no-inner-declarations */
(function () {
  var d = document,
    id = "AAR24pxBkmklt",
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
        "*{ cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAgMAAACdGdVrAAAACVBMVEUAAAAAAAD///+D3c/SAAAAAXRSTlMAQObYZgAAACtJREFUCNdjCAUDhqxVQLCSIYEBCDgJUIwOOCnG0FAHKIVfJWGLoE6COhAAxmsXhSV+DZoAAAAASUVORK5CYII=) 12 12, auto !important}"
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
