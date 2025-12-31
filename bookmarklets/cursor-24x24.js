/**
 * @bookmarklet Cursor 24x24
 * @description Change cursor to 24px by 24px circle
 * @author Adrian Roselli
 * @authorUrl https://adrianroselli.com/2022/05/24x24-pixel-cursor-bookmarklet.html#Update01
 * @tags 2.5.8 Target Size (Minimum) (2.2 AA)
 * @pageTest self
 */
(function () {
  var d = document,
    id = "AAR24pxBkmklt1",
    el = d.getElementById(id),
    f = d.querySelectorAll("iframe"),
    i = 0,
    l = f.length,
    s;

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
    s = d.createElement("style");
    s.id = id;
    s.appendChild(
      d.createTextNode(
        "*{ cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAS1BMVEUAAAAAAAD+/v4AAABRUVE/Pz/u7u74+Pi6urrS0tJ8fHwAAAAAAAD///////8AAAD///////8AAAAAAAD////////////+/v7////mqvA4AAAAGHRSTlMA/vq59/Tx7+3p5uXV0L+okoFrZE1DFvCfRm9hAAAAnElEQVQoz3WSWRKEIAxEQ9hXURa5/0lnxpHS0kp/kX5AIAmcKtyzrzwvcNcWhFE4Biojwnb5i7QYc+295ohWLtPnTqc2g5a04+d+t69w07q748wm9fQn0fKXJ9gEDyUbAIrA9gQNRQFu4owZm6toOHiV3yArDwzrG1RkwEb/u4dO1gcNyKvI5ORzyQ9SJSGLSJWdbBTdWnoYyPH5AN6eCUUIphirAAAAAElFTkSuQmCC) 12 12, auto !important}"
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
