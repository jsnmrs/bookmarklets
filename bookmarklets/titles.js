/**
 * @bookmarklet Titles
 * @description Display all titles
 * @author Ian Lloyd
 * @authorUrl https://a11y-tools.com/bookmarklets/
 * @tags accessibility, wcag:2.4.2
 * @auditing true
 * @pageTest false
 */
(function () {
  "use strict";
  function listThingsWithTitles() {
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
    const elsWithTitles = document.querySelectorAll("body [title],iframe");
    let i = 1;
    let identCount = 0;
    let issueCount = 0;
    let snippet = "";
    let isInteractive;
    let consoleOutput = "";
    Array.from(elsWithTitles).forEach(function (elWithTitle) {
      isInteractive = "No";
      if (
        (elWithTitle.getAttribute("tabindex") &&
          elWithTitle.getAttribute("tabindex") !== "-1") ||
        ((elWithTitle.tagName === "INPUT" ||
          elWithTitle.tagName === "BUTTON" ||
          elWithTitle.tagName === "TEXTAREA" ||
          elWithTitle.tagName === "SELECT" ||
          elWithTitle.tagName === "IFRAME" ||
          elWithTitle.tagName === "A") &&
          elWithTitle.getAttribute("tabindex") !== "-1" &&
          !elWithTitle.disabled)
      ) {
        isInteractive = "Yes";
      }
      const wrap = document.createElement("div");
      wrap.appendChild(elWithTitle.cloneNode(true));
      snippet = wrap.innerHTML;
      let notes = "";
      let warn = false;
      let err = false;
      elWithTitle.setAttribute("data-title-ref", i);

      let titleContainsImage = false;
      const images = elWithTitle.querySelectorAll("img");
      titleContainsImage = images.length > 0;
      if (titleContainsImage) {
        const imageText = "";
        Array.from(images).forEach(function (image) {
          const newSpan = document.createElement("SPAN");
          newSpan.setAttribute("class", "visually-hidden");
          newSpan.setAttribute(
            "style",
            "clip-path: inset(100%);clip: rect(1px, 1px, 1px, 1px);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;"
          );
          newSpan.setAttribute("aria-hidden", "true");
          if (image.getAttribute("alt")) {
            newSpan.textContent = " " + image.getAttribute("alt") + " ";
          } else {
            newSpan.textContent = "** Image with empty or missing alt **";
          }
          insertAfter(newSpan, image);
        });
      }

      let tc = elWithTitle.textContent;

      if (elWithTitle.tagName === "IMG") {
        tc = elWithTitle.getAttribute("alt");
      }
      let accName = tc;
      let titleText = elWithTitle.getAttribute("title");

      if (accName === null) {
        accName = "";
      }
      if (titleText === null) {
        titleText = "";
      }

      if (isHidden(elWithTitle)) {
        attemptoToUnhide(elWithTitle);
        if (isHidden(elWithTitle)) {
          notes += "- Element is hidden<br>";
        } else {
          notes +=
            "- Element *was* hidden but has been temporarily revealed on the page<br>";
        }
      }
      if (err) {
        warn = false;
      }
      row += "<tr";
      row += ' data-title-ref="' + i + '"';
      if (accName.trim() === titleText.trim()) {
        warn = false;
        err = false;
      } else {
        if (elWithTitle.tagName !== "IFRAME") {
          warn = false;
          err = true;
          identCount++;
          notes += "- The title text differs from the on-screen text.<br>";
          if (isInteractive === "Yes") {
            notes +=
              "- This is an interactive element, but the title attribute *may* be ignored by assistive tech (depending on user settings).<br>";
          }
          if (isInteractive === "No") {
            notes +=
              "- As this is a non-interactive element, the title attribute will be ignored by assistive tech.<br>";
          }
        }
      }

      if (elWithTitle.tagName === "IFRAME") {
        if (titleText.trim() === "") {
          warn = false;
          err = true;
          identCount++;
          notes += "An <code>iframe</code> MUST have a title attribute.<br>";
        }
      }
      if (warn) {
        row += ' class="warn"';
      }
      if (err) {
        row += ' class="issue err"';
      }
      row += ">";
      row += "<td>" + tc + "</td>";
      row += "<td>" + titleText + "</td>";
      if (accName.trim() === titleText.trim()) {
        if (accName.trim() !== "") {
          notes +=
            "- title text is identical to on-screen text (superfluous, but not harmful).<br>";
        }
      }
      if (isInteractive === "No") {
        notes +=
          "- This is not an interactive/focusable element. The title attribute will not be available to anyone expect mouse users (touch screen, keyboard-only, assistive tech users all excluded).<br>";
      }
      row += "<td>" + isInteractive + "</td>";
      row += "<td>";
      if (warn) {
        row +=
          '<div class="issues">Possible title issue found with this element</div>';
      }
      if (err) {
        row +=
          '<div class="issues">Definite title issue found with this element</div>';
      }
      consoleOutput =
        "Element with title '" +
        tc.trim() +
        "':\n" +
        notes +
        "Markup with issue:\n" +
        snippet +
        "\n---------------\n";
      row +=
        notes +
        '<br><button class="showSnippet" type="button" aria-label="Show markup snippet" aria-expanded="false"><code>&lt;/&gt;</code></button><div class="snippet" hidden><label for="snip' +
        i +
        '">Markup snippet</label><textarea id="snip' +
        i +
        '" aria-label="Markup snippet for this node">' +
        snippet +
        '</textarea><button type="button" class="decrapulate" aria-label="De-crapulate this markup snippet">De-crapulate</button></div></td>';
      row +=
        '<td><button data-title-ref="' +
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
      '<style>[aria-pressed=true]{color:white;background:rebeccapurple;}div.issues{font-weight:bold;};textarea {margin:5px 0;}.snippet label {font-weight:bold;font-size:0.8em;color:black;}.snippet{background:#efefef;outline:1px solid #666;padding:5px;margin-top:5px;}.checkDiffs{background:PapayaWhip;}.checkDiffs:after{content:"Accessible name differs";color:#a50202;font-weight:bold;font-size:10px;display:block}.warn {background:lightyellow;}.err {background:PapayaWhip;color:#a50202;}.visually-hidden,.a11y,.visuallyhidden,.sr-text,.sr-only {clip-path: inset(100%);clip: rect(1px, 1px, 1px, 1px);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;}* {-webkit-box-sizing: border-box;box-sizing: border-box;}html {/*border: .75em solid #fff;*/min-height: 100vh;}body {background: #f7f7f5;color: #333;font: 400 105%/1.4 "Work Sans", sans-serif;margin: 1.5em auto;max-width: 54em;width: 90%;}a:elWithTitle,a:visited {border-bottom: 1px solid rgba(42, 122, 130, .5);color: #2b7a82;text-decoration: none;}a:hover {border-bottom: 2px solid;color: #1e565c;}button:focus,a:focus {box-shadow: none;outline-offset: 2px;outline: 3px solid rgba(42, 122, 130, .75);}a:focus {border-bottom: none;}a:active {background: #333;color: #fff;}code {font-family: Consolas, monaco, monospace;-moz-tab-size: 4;tab-size: 4;text-transform: none;white-space: pre-wrap;color:brown;}textarea {width: 100%}legend h2, legend h3 {margin: 0;}table {border-collapse: collapse;}th,td {padding: 10px;border:2px solid #2b7a82;}table caption {font-weight: bold;text-align: left;margin:1em 0;}</style><h1>List of elements with titles on this page.</h1>';
    if (identCount > 0) {
      s +=
        '<input type="checkbox" id="showPotentialProblemsOnly"><label for="showPotentialProblemsOnly">Show only elements with definite title issues(' +
        issueCount +
        ").</label><br>"; /*s+=identCount + ' elements with identical titles were found.';*/
    }
    s +=
      ' <button class="highlightButtonAll" type="button" aria-pressed="false">Highlight all elements with `title` on page</button>';
    s +=
      '<table border="1" cellpadding="5"><caption>All things with title attributes on this page</caption><thead><tr valign=top><th scope="col">On-screen text</th><th>Title text</th><th>Interactive?</th><th scope="col">Notes</th><th>Highlight on the page</th></tr></thead><tbody>' +
      row +
      "</tbody></table>";
    s += "<script>function showElsWithTitles(){";
    s += "var refWindow=window.opener;";
    s +=
      'var highlightButtons=document.querySelectorAll(".highlightButton");var titleToHighlight;Array.from(highlightButtons).forEach(highlightButton => {highlightButton.addEventListener("click", e => {titleToHighlight="[data-title-ref=\'" + highlightButton.getAttribute("data-title-ref") + "\']";if (highlightButton.getAttribute("aria-pressed")==="false") {refWindow.document.querySelector(titleToHighlight).setAttribute("tabindex","-1");refWindow.document.querySelector(titleToHighlight).focus();refWindow.document.querySelector(titleToHighlight).style.outline="4px dashed rebeccapurple";refWindow.document.querySelector(titleToHighlight).style.outlineOffset="-4px";highlightButton.setAttribute("aria-pressed","true");} else {refWindow.document.querySelector(titleToHighlight).style.outline="";highlightButton.setAttribute("aria-pressed","false");}});});';
    s +=
      'var highlightButtonAll=document.querySelector(".highlightButtonAll");highlightButtonAll.addEventListener("click", e => {if (highlightButtonAll.getAttribute("aria-pressed")==="false") {Array.from(highlightButtons).forEach(highlightButton => {highlightButton.setAttribute("aria-pressed","false");highlightButton.click();});highlightButtonAll.setAttribute("aria-pressed","true");} else {Array.from(highlightButtons).forEach(highlightButton => {highlightButton.setAttribute("aria-pressed","true");highlightButton.click();});highlightButtonAll.setAttribute("aria-pressed","false");}});';
    s +=
      'function hideGoodRows(){Array.from(trsWithoutIssue).forEach(trWithoutIssue => {trWithoutIssue.setAttribute("hidden","hidden");});}function showGoodRows(){Array.from(trsWithoutIssue).forEach(trWithoutIssue => {trWithoutIssue.removeAttribute("hidden");});}var trsWithoutIssue=document.querySelectorAll("tbody tr:not(.issue)");var showProblemCheckbox=document.querySelector("#showPotentialProblemsOnly");showProblemCheckbox.addEventListener("click", e => {if (showProblemCheckbox.checked) {hideGoodRows();} else {showGoodRows();}});';
    s +=
      '}window.addEventListener("load", (event) => {showElsWithTitles();});</script>';

    const popUpWinTitles = window.open(
      "",
      "popUpWinTitles",
      "height=800,width=1000"
    );
    popUpWinTitles.document.open();
    popUpWinTitles.document.write(s);
    popUpWinTitles.document.close();
  }
  listThingsWithTitles();
})();
