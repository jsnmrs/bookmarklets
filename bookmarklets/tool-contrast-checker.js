/**
 * @bookmarklet Contrast checker
 * @description Contrast checker for color combinations
 * @author WebAIM
 * @authorUrl https://webaim.org/resources/contrastchecker/bookmarklet
 * @tags accessibility, external, wcag:1.4.3, wcag:1.4.11
 * @pageTest false
 */
(function () {
  var constrastletelem = document.getElementById("contrastletdragable");
  if (constrastletelem == null) {
    var contrastletdragable = document.createElement("div");
    contrastletdragable.id = "contrastletdragable";
    contrastletdragable.style.width = "384px";
    contrastletdragable.style.position = "absolute";
    contrastletdragable.style.right = "20px";
    contrastletdragable.style.top = window.pageYOffset + 20 + "px";
    contrastletdragable.style.zIndex = "10000";
    contrastletdragable.style.boxSizing = "content-box";
    var contrastletdragzone = document.createElement("div");
    contrastletdragzone.id = "contrastletdragzone";
    contrastletdragzone.style.width = "100%";
    contrastletdragzone.style.height = "15px";
    contrastletdragzone.style.cursor = "move";
    contrastletdragzone.style.backgroundColor = "#0f2c65";
    contrastletdragzone.style.boxSizing = "content-box";
    contrastletdragable.appendChild(contrastletdragzone);
    document.body.appendChild(contrastletdragable);
    var contrastletclose = document.createElement("button");
    contrastletclose.id = "contrastletclose";
    contrastletclose.style.width = "15px";
    contrastletclose.style.height = "15px";
    contrastletclose.style.float = "right";
    contrastletclose.style.padding = "0";
    contrastletclose.style.border = "0";
    contrastletclose.style.borderTop = "1px solid #0f2c65";
    contrastletclose.style.borderRight = "1px solid #0f2c65";
    contrastletclose.setAttribute("aria-label", "Close Contrast Checker");
    contrastletclose.addEventListener(
      "click",
      function () {
        contrastletdragable.remove();
      },
      false
    );
    var contrastletclosetext = document.createTextNode("X");
    contrastletclose.appendChild(contrastletclosetext);
    contrastletdragzone.appendChild(contrastletclose);
    var contrastlet = document.createElement("iframe");
    contrastlet.src =
      "https://webaim.org/resources/contrastchecker/mini?ver=1&a=" +
      Math.random();
    contrastlet.style.width = "380px";
    contrastlet.style.height = "368px";
    contrastlet.style.margin = "0px";
    contrastlet.style.borderStyle = "solid";
    contrastlet.style.borderColor = "#0f2c65";
    contrastlet.style.boxSizing = "content-box";
    contrastletdragable.appendChild(contrastlet);
    let x = 0;
    let y = 0;
    const mouseDownHandler = function (e) {
      x = e.clientX;
      y = e.clientY;
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };
    const mouseMoveHandler = function (e) {
      const dx = e.clientX - x;
      const dy = e.clientY - y;
      contrastletdragable.style.top = `${contrastletdragable.offsetTop + dy}px`;
      contrastletdragable.style.left = `${
        contrastletdragable.offsetLeft + dx
      }px`;
      x = e.clientX;
      y = e.clientY;
    };
    const mouseUpHandler = function () {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
    contrastletdragable.addEventListener("mousedown", mouseDownHandler);
    document.addEventListener("keyup", function (event) {
      if (event.keyCode === 27) {
        contrastletdragable.remove();
      }
    });
    contrastlet.addEventListener("keyup", function (event) {
      if (event.keyCode === 27) {
        contrastletdragable.remove();
      }
    });
    document.addEventListener("securitypolicyviolation", () => {
      contrastlet.remove();
      var contrastleterrortext = document.createTextNode(
        "The Content Security Policy on this page does not allow embedded iframes. The Contrast Checker Bookmarklet cannot run on this page. Press Esc to dismiss this message."
      );
      contrastletdragable.style.backgroundColor = "#fff";
      contrastletdragable.appendChild(contrastleterrortext);
    });
  }
})();
