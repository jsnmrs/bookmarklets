/**
 * @bookmarklet Buttons
 * @description Display all buttons
 * @author Ian Lloyd
 * @authorUrl https://a11y-tools.com/bookmarklets/
 * @tags accessibility
 * @auditing true
 * @pageTest false
 */
(function () {
  "use strict";
  function listButtons() {
    console.clear();
    function insertAfter(newNode, referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function isHidden(el) {
      const style = window.getComputedStyle(el);
      return (
        style.display === "none" ||
        style.opacity === 0 ||
        (style.clipPath === "inset(100%)" &&
          style.clip === "rect(1px, 1px, 1px, 1px)") ||
        (style.height === "1px" &&
          style.width === "1px" &&
          style.overflow === "hidden")
      );
    }

    function attemptoToUnhide(el) {
      const style = window.getComputedStyle(el);

      if (style.position === "absolute" && style.overflow === "hidden") {
        el.style.height = "auto";
        el.style.width = "auto";
        el.style.position = "relative";
        el.style.overflow = "visible";
        el.style.display = "block";
        el.style.opacity = 1;
      }

      if (
        el.getAttribute("hidden") === "" ||
        el.getAttribute("hidden") === "hidden" ||
        el.getAttribute("hidden") === "true"
      ) {
        el.removeAttribute("hidden");
      }

      if (style.visibility === "hidden") {
        el.style.visibility = "visible";
      }

      if (style.display === "none") {
        el.style.display = "block";
      }

      if (style.opacity === 0) {
        el.style.opacity = 1;
      }
    }

    let s = "";
    let row = "";
    const btns = document.querySelectorAll(
      "button,[role=button],input[type=button]"
    );
    let i = 1;
    let btnType;
    let issueCount = 0;
    let snippet = "";
    let consoleOutput = "";
    Array.from(btns).forEach(function (button) {
      const wrap = document.createElement("div");
      wrap.appendChild(button.cloneNode(true));
      snippet = wrap.innerHTML;
      let imgBtn = false;
      let notes = "";
      const imgs = button.querySelectorAll("img");
      let warn = false;
      let err = false;
      imgBtn = imgs.length > 0;

      const ariaHiddenEl = button.querySelector("[aria-hidden=true]");
      if (ariaHiddenEl) {
        ariaHiddenEl.classList.add("remove-from-accname");
      }

      if (imgBtn) {
        Array.from(imgs).forEach(function (image) {
          const newSpan = document.createElement("SPAN");
          newSpan.setAttribute("class", "visually-hidden");
          newSpan.setAttribute(
            "style",
            "clip-path: inset(100%);clip: rect(1px, 1px, 1px, 1px);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;"
          );
          newSpan.setAttribute("aria-hidden", "true");

          if (image.getAttribute("alt")) {
            newSpan.textContent = " " + image.getAttribute("alt") + " ";
          }

          insertAfter(newSpan, image);
        });
      }

      button.setAttribute("data-button-ref", i);
      let tc = button.textContent;
      const ariaHidden = button.querySelector(".remove-from-accname");
      if (ariaHidden) {
        ariaHidden.remove();
      }
      let accName = button.textContent;

      if (button.getAttribute("aria-label")) {
        accName = button.getAttribute("aria-label");
        notes +=
          "- button gets accessible name from <code>aria-label</code>. Check that the accessible name does not contradict the text on screen<br>";
        warn = true;
        if (
          accName.trim().toLowerCase().indexOf(tc.trim().toLowerCase()) === -1
        ) {
          notes +=
            '- On-screen text does not appear in <code>aria-label</code>. Looks like a <a href="https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html" target="_blank">2.5.3 Label In Name</a> failure<br>';
        }
      }

      if (button.getAttribute("aria-labelledby")) {
        let source = button.getAttribute("aria-labelledby");
        source = source.replace(/:/g, "\\:");
        const sources = source.split(" ");

        if (sources.length > 1) {
          accName = "";
          Array.from(sources).forEach(function (source) {
            if (document.querySelector("#" + source)) {
              accName += document.querySelector("#" + source).textContent + " ";
            } else {
              accName += "** aria-labelledby source is missing **";
            }
          });
          accName = accName.trim();
          notes +=
            "- button gets accessible name from <code>aria-labelledby</code> (multiple sources). Check that the accessible name does not contradict the text on screen<br>";
          warn = true;
        } else {
          source = button.getAttribute("aria-labelledby");
          source = source.replace(/:/g, "\\:");
          if (document.querySelector("#" + source)) {
            accName = document.querySelector("#" + source).textContent;
          } else {
            accName += "** aria-labelledby source is missing **";
          }
          notes +=
            "- button gets accessible name from <code>aria-labelledby</code> (single source). Check that the accessible name does not contradict the text on screen<br>";
          warn = true;
        }
        if (
          accName.trim().toLowerCase().indexOf(tc.trim().toLowerCase()) === -1
        ) {
          notes +=
            '- On-screen text does not appear in <code>aria-labelledby sources</code>. Looks like a <a href="https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html" target="_blank">2.5.3 Label In Name</a> failure<br>';
        }
      }
      if (isHidden(button)) {
        attemptoToUnhide(button);
        if (isHidden(button)) {
          notes += "Button is hidden<br>";
        } else {
          notes +=
            "Button *was* hidden but has been temporarily revealed on the page<br>";
        }
      }

      if (imgBtn) {
        notes += "🌄 Image button<br>";
      }

      if (button.getAttribute("title") && button.getAttribute("title") !== tc) {
        notes +=
          "- button has a <code>title</code> which is different from text content.";
        if (accName !== "") {
          notes +=
            'This <code>title</code> content -- "' +
            button.getAttribute("title") +
            '" -- will not be perceivable to assistive tech, keyboard and touch screen users<br>';
        }
        notes += "<br>";
        warn = true;
      }

      if (button.getAttribute("title") && button.getAttribute("title") === tc) {
        notes +=
          '- button has a <code>title</code> which is the same as the text content and therefore adds no extra useful information/context. This <code>title</code> content -- "' +
          button.getAttribute("title") +
          '" -- will not be perceivable to assistive tech, keyboard and touch screen users<br>';
        warn = true;
      }

      if (button.tagName === "BUTTON") {
        if (
          button.getAttribute("tabindex") &&
          button.getAttribute("tabindex") !== "-1"
        ) {
          notes +=
            "Button has a <code>tabindex</code> but it is not needed because the <code>button</code> is natively focusable<br>";
        }

        if (
          button.getAttribute("tabindex") &&
          button.getAttribute("tabindex") !== "-1" &&
          button.getAttribute("tabindex") !== "0"
        ) {
          notes +=
            '- Button has a positive <code>tabindex</code> (not -1 or 0). Could cause a <a href="https://www.w3.org/TR/WCAG21/#focus-order" target="_blank">2.4.3 Focus order</a> failure.<br>';
          warn = true;
        }

        if (button.getAttribute("role") === "button") {
          notes +=
            "Button has a <code>role</code> of <code>button</code>. Not needed as it is a <code>button</code> element that is a button by default<br>";
        }

        if (
          button.getAttribute("aria-hidden") !== "true" &&
          button.getAttribute("tabindex") === "-1"
        ) {
          notes +=
            "- <code>&lt;button&gt;</code> has a negative <code>tabindex</code> which means it will not be keyboard-operable<br>";
          warn = true;
        }

        if (
          button.getAttribute("aria-hidden") === "true" &&
          button.getAttribute("tabindex") !== "-1"
        ) {
          notes +=
            '- <code>&lt;button&gt;</code> has <code>aria-hidden="true"</code> but can still be focused by keyboard user as it does not have a negative <code>tabindex</code><br>';
          warn = true;
        }

        if (
          button.getAttribute("role") &&
          button.getAttribute("role") !== "button"
        ) {
          notes +=
            '- <code>&lt;button&gt;</code> has a <code>role</code> set that is not <code>button</code>. It is set to "' +
            button.getAttribute("role") +
            '". This overrides the native role and will likely confused assistive tech users<br>';
          warn = true;
        }
      }
      if (button.tagName === "A") {
        if (!button.getAttribute("href") && !button.getAttribute("tabindex")) {
          notes +=
            "- button is based on an <code>&lt;a&gt;</code> element, does not have an <code>href</code> or <code>tabindex</code>,  and therefore is not focusable<br>";
          warn = true;
        }

        if (
          !button.getAttribute("href") &&
          button.getAttribute("tabindex") &&
          button.getAttribute("tabindex") !== "-1"
        ) {
          notes +=
            "- button is based on an <code>&lt;a&gt;</code> element, does not have an <code>href</code>, but is focusable because it has been provided with a positive <code>tabindex</code><br>";
          warn = true;
        }

        if (
          button.getAttribute("href") &&
          button.getAttribute("tabindex") &&
          button.getAttribute("tabindex") !== "-1"
        ) {
          notes +=
            "- button is based on an <code>&lt;a&gt;</code>. It is focusable because there is a <code>tabindex</code> present<br>";
          warn = true;
        }

        if (
          button.getAttribute("tabindex") &&
          button.getAttribute("tabindex") !== "-1" &&
          button.getAttribute("tabindex") !== "0"
        ) {
          notes +=
            '- Button has a positive <code>tabindex</code> (not -1 or 0). Could cause a <a href="https://www.w3.org/TR/WCAG21/#focus-order" target="_blank">2.4.3 Focus order</a> failure.<br>';
          warn = true;
        }
      }

      if (
        button.tagName !== "BUTTON" &&
        button.tagName !== "A" &&
        button.getAttribute("role") === "button"
      ) {
        notes +=
          "- This has a <code>role</code> of <code>button</code> but is not a <code>button</code> element.";
        if (button.getAttribute("tabindex") === "-1") {
          notes +=
            "<br>- <strong>Note</strong>: this button has a negative <code>tabindex</code> and will not be keyboard-focusable.";
        } else {
          notes +=
            "Check that it is keyboard-operable (should activate with <kbd>Enter</kbd> and <kbd>Space</kbd> key)<br>";
        }
        warn = true;
      }

      if (accName === "") {
        if (button.getAttribute("title")) {
          accName = button.getAttribute("title");
        } else {
          accName = "‼️ Empty button";
        }
        tc = "‼️ Empty button";
        notes += "‼️ Empty button<br>";
        err = true;
      } else {
        if (tc.trim() === "") {
          tc = "‼️ No visible text on button";
        }
      }

      if (imgBtn && accName === "‼️ Empty button") {
        notes += " - image is missing alternative text content<br>";
      }

      /*
    if (button.href) {
      href=button.href;
    }
    */

      if (err) {
        warn = false;
      }
      row += "<tr";
      row += ' data-button-ref="' + i + '"';

      if (warn) {
        row += ' class="issue warn"';
      }

      if (err) {
        row += ' class="issue err"';
      }

      row += ">";

      if (button.tagName === "BUTTON") {
        btnType = "<code>&lt;button&gt;</code>";
      } else {
        btnType = '<code>role="button"</code>';
      }

      row += "<td>" + btnType + "</td>";
      row += "<td>" + tc + "</td>";
      row += "<td>" + accName;
      if (accName.trim() !== tc.trim() && tc.trim() !== "") {
        row += '<div class="anDiff">Accessible name differs</div>';
      }
      row += "</td>";
      row += "<td>";
      if (warn) {
        row +=
          '<div class="issues">Possible issue(s) found with this button</div>';
      }
      if (err) {
        row +=
          '<div class="issues">Definite issue(s) found with this button</div>';
      }
      consoleOutput =
        "Button '" +
        tc.trim() +
        "':\n" +
        notes +
        "Markup with issue:\n" +
        snippet +
        "\n---------------\n";
      row +=
        notes +
        '<button class="showSnippet" type="button" aria-label="Show markup snippet" aria-expanded="false"><code>&lt;/&gt;</code></button><div class="snippet" hidden><label for="snip' +
        i +
        '">Markup snippet</label><textarea id="snip' +
        i +
        '" aria-label="Markup snippet for this node">' +
        snippet +
        '</textarea><button type="button" class="decrapulate" aria-label="De-crapulate this markup snippet">De-crapulate</button></div></td>';

      row +=
        '<td><button data-button-ref="' +
        i +
        '" class="highlightButton" type="button" aria-pressed="false" aria-label="Highlight this issue on the page visually">Show</button></td>';
      row += "</tr>";
      i++;

      if (warn || err) {
        issueCount++;
      }
      if (err) {
        consoleOutput = consoleOutput
          .split("<code>")
          .join("`")
          .split("</code>")
          .join("`")
          .split("<br>")
          .join("\n")
          .split("\n\n")
          .join("\n");
        console.log(consoleOutput);
      }
    });
    s =
      '<style>[aria-pressed=true]{color:white;background:darkgreen;}div.issues{font-weight:bold;};textarea {margin:5px 0;}.snippet label {font-weight:bold;font-size:0.8em;color:black;}.snippet{background:#efefef;outline:1px solid #666;padding:5px;margin-top:5px;}.anDiff{color:red;font-weight:bold;font-size:10px;display:block}.warn {background:lightyellow;}.err {background:PapayaWhip;color:red;}.visually-hidden,.a11y,.visuallyhidden,.sr-text,.sr-only {clip-path: inset(100%);clip: rect(1px, 1px, 1px, 1px);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;}* {-webkit-box-sizing: border-box;box-sizing: border-box;}html {/*border: .75em solid #fff;*/min-height: 100vh;}body {background: #f7f7f5;color: #333;font: 400 105%/1.4 "Work Sans", sans-serif;margin: 1.5em auto;max-width: 54em;width: 90%;}a:button,a:visited {border-bottom: 1px solid rgba(42, 122, 130, .5);color: #2b7a82;text-decoration: none;}a:hover {border-bottom: 2px solid;color: #1e565c;}button:focus,a:focus {box-shadow: none;outline-offset: 2px;outline: 3px solid rgba(42, 122, 130, .75);}a:focus {border-bottom: none;}a:active {background: #333;color: #fff;}code {font-family: Consolas, monaco, monospace;-moz-tab-size: 4;tab-size: 4;text-transform: none;white-space: pre-wrap;color:brown;}textarea {width: 100%}legend h2, legend h3 {margin: 0;}table {border-collapse: collapse;}th,td {padding: 10px;border:2px solid #2b7a82;}table caption {font-weight: bold;text-align: left;margin:1em 0;}</style><h1>List of buttons on this page.</h1>';
    s +=
      '<input type="checkbox" id="showPotentialProblemsOnly"><label for="showPotentialProblemsOnly">Show only buttons where there *may* be issues (' +
      issueCount +
      " found)</label>";
    s +=
      ' <button class="highlightButtonAll" type="button" aria-pressed="false">Highlight all buttons on page</button>';
    s +=
      '<table border="1" cellpadding="5"><caption>All buttons (&lt;button&gt; or elements with role="button") on this page, the accessible name and any issues found</caption><thead><tr valign=top><th>Button type</th><th scope="col">Button text</th><th scope="col">Accessible name</th><th scope="col">Notes</th><th>Highlight on the page</th></tr></thead><tbody>' +
      row +
      "</tbody></table>";
    s += "<script>function showbtns(){";
    s += "var refWindow=window.opener;";
    s +=
      'var highlightButtons=document.querySelectorAll(".highlightButton");var buttonToHighlight;Array.from(highlightButtons).forEach(highlightButton => {highlightButton.addEventListener("click", e => {buttonToHighlight="[data-button-ref=\'" + highlightButton.getAttribute("data-button-ref") + "\']";if (highlightButton.getAttribute("aria-pressed")==="false") {refWindow.document.querySelector(buttonToHighlight).focus();refWindow.document.querySelector(buttonToHighlight).style.outline="4px dashed darkgreen";refWindow.document.querySelector(buttonToHighlight).style.outlineOffset="-4px";highlightButton.setAttribute("aria-pressed","true");} else {refWindow.document.querySelector(buttonToHighlight).style.outline="";highlightButton.setAttribute("aria-pressed","false");}});});';
    s +=
      'var highlightButtonAll=document.querySelector(".highlightButtonAll");highlightButtonAll.addEventListener("click", e => {if (highlightButtonAll.getAttribute("aria-pressed")==="false") {Array.from(highlightButtons).forEach(highlightButton => {highlightButton.setAttribute("aria-pressed","false");highlightButton.click();});highlightButtonAll.setAttribute("aria-pressed","true");} else {Array.from(highlightButtons).forEach(highlightButton => {highlightButton.setAttribute("aria-pressed","true");highlightButton.click();});highlightButtonAll.setAttribute("aria-pressed","false");}});';
    s +=
      'function hideGoodRows(){Array.from(trsWithoutIssue).forEach(trWithoutIssue => {trWithoutIssue.setAttribute("hidden","hidden");});}function showGoodRows(){Array.from(trsWithoutIssue).forEach(trWithoutIssue => {trWithoutIssue.removeAttribute("hidden");});}var trsWithoutIssue=document.querySelectorAll("tbody tr:not(.issue)");var showProblemCheckbox=document.querySelector("#showPotentialProblemsOnly");showProblemCheckbox.addEventListener("click", e => {if (showProblemCheckbox.checked) {hideGoodRows();} else {showGoodRows();}});';
    s += '}window.addEventListener("load", (event) => {showbtns();});</script>';

    const popUpWinButtons = window.open(
      "",
      "popUpWinButtons",
      "height=800,width=1000"
    );
    popUpWinButtons.document.open();
    popUpWinButtons.document.write(s);
    popUpWinButtons.document.close();
  }
  listButtons();
})();
