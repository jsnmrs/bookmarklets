/* eslint-disable no-unused-vars */
(function () {
  "use strict";
  function listLinks() {
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

    let href;
    let s = "";
    let row = "";
    const links = document.querySelectorAll("a,[role=link]");
    let i = 1;
    let linkType;
    let issueCount = 0;
    let snippet = "";
    let consoleOutput = "";

    Array.from(links).forEach(function (link) {
      const wrap = document.createElement("div");
      wrap.appendChild(link.cloneNode(true));
      snippet = wrap.innerHTML;
      let imgLink = false;
      let notes = "";
      const imgs = link.querySelectorAll("img");
      let warn = false;
      let err = false;
      imgLink = imgs.length > 0;

      const ariaHiddenEl = link.querySelector("[aria-hidden=true]");
      if (ariaHiddenEl) {
        ariaHiddenEl.classList.add("remove-from-accname");
      }

      if (imgLink) {
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

      link.setAttribute("data-link-ref", i);
      let tc = link.textContent;
      const ariaHidden = link.querySelector(".remove-from-accname");
      if (ariaHidden) {
        ariaHidden.remove();
      }
      let accName = link.textContent;
      if (link.getAttribute("aria-label")) {
        accName = link.getAttribute("aria-label");
        notes += "- Link gets accessible name from <code>aria-label</code>";
        if (tc.trim() !== "") {
          notes +=
            " Check that the accessible name does not contradict the text on screen<br>";
        }
        warn = true;
        if (
          accName.trim().toLowerCase().indexOf(tc.trim().toLowerCase()) === -1
        ) {
          notes +=
            '- On-screen text does not appear in <code>aria-label</code>. Looks like a <a href="https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html" target="_blank">2.5.3 Label In Name</a> failure<br>';
        }
      }

      if (link.getAttribute("aria-labelledby")) {
        const source = link.getAttribute("aria-labelledby");
        const sources = source.split(" ");

        if (sources.length > 1) {
          accName = "";
          Array.from(sources).forEach(function (source) {
            accName += document.querySelector("#" + source).textContent + " ";
          });
          accName = accName.trim();
          notes +=
            "- Link gets accessible name from <code>aria-labelledby</code> (multiple sources). Check that the accessible name does not contradict the text on screen<br>";
          warn = true;
        } else {
          accName = document.querySelector(
            "#" + link.getAttribute("aria-labelledby")
          ).textContent;
          notes +=
            "- Link gets accessible name from <code>aria-labelledby</code> (single source). Check that the accessible name does not contradict the text on screen<br>";
          warn = true;
        }
        if (
          accName.trim().toLowerCase().indexOf(tc.trim().toLowerCase()) === -1
        ) {
          notes +=
            '- On-screen text does not appear in <code>aria-labelledby sources</code>. Looks like a <a href="https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html" target="_blank">2.5.3 Label In Name</a> failure<br>';
        }
      }

      if (isHidden(link)) {
        attemptoToUnhide(link);
        if (isHidden(link)) {
          notes += "Link is hidden<br>";
        } else {
          notes +=
            "Link *was* hidden but has been temporarily revealed on the page<br>";
        }
      }

      if (imgLink) {
        notes += "🌄 Image link<br>";
      }

      if (link.getAttribute("role") === "button") {
        notes +=
          "- Link has a <code>role</code> of <code>button</code>. Check that it behaves like a <code>button</code> and is not used as navigation.<br>";
        warn = true;
      }

      if (link.getAttribute("title") && link.getAttribute("title") !== tc) {
        notes +=
          '- Link has a <code>title</code> which is different from text content. This <code>title</code> content -- "' +
          link.getAttribute("title") +
          '" -- will not be perceivable to assistive tech, keyboard and touch screen users<br>';
        warn = true;
      }

      if (link.getAttribute("title") && link.getAttribute("title") === tc) {
        notes +=
          'Link has a <code>title</code> which is the same as the text content and therefore adds no extra useful information/context. This <code>title</code> content -- "' +
          link.getAttribute("title") +
          '" -- will not be perceivable to assistive tech, keyboard and touch screen users<br>';
      }

      if (link.tagName === "A") {
        if (
          link.getAttribute("href") === null &&
          !link.getAttribute("tabindex") &&
          link.getAttribute("tabindex") !== "-1"
        ) {
          notes +=
            "- Link does not have an <code>href</code>, is not keyboard-focusable<br>";
          warn = true;
        }

        if (
          link.getAttribute("href") !== null &&
          !link.getAttribute("href") &&
          !link.getAttribute("tabindex") &&
          link.getAttribute("tabindex") !== "-1"
        ) {
          notes +=
            "- Link does have an <code>href</code> but it has no value, so it is keyboard-focusable<br>";
          warn = true;
        }

        if (
          !link.getAttribute("href") &&
          link.getAttribute("tabindex") &&
          link.getAttribute("tabindex") !== "-1"
        ) {
          notes +=
            "- Link does not have an <code>href</code>, but is focusable because it has been provided with a positive <code>tabindex</code><br>";
          warn = true;
        }

        if (
          link.getAttribute("tabindex") &&
          link.getAttribute("tabindex") !== "-1" &&
          link.getAttribute("tabindex") !== "0"
        ) {
          notes +=
            '- Link has a positive <code>tabindex</code> (not -1 or 0). Could cause a <a href="https://www.w3.org/TR/WCAG21/#focus-order" target="_blank">2.4.3 Focus order</a> failure.<br>';
          warn = true;
        }

        if (
          link.getAttribute("href") &&
          link.getAttribute("tabindex") &&
          link.getAttribute("tabindex") !== "-1"
        ) {
          notes +=
            "Link has a <code>tabindex</code> but it is not needed because the <code>href</code> makes it focusable<br>";
        }

        if (link.getAttribute("role") === "link") {
          notes +=
            "Link has a <code>role</code> of <code>link</code>. Not needed as it is an <code>a</code> element that is a link by default<br>";
        }
      }

      if (link.tagName !== "A" && link.getAttribute("role") === "link") {
        notes +=
          "- This has a <code>role</code> of <code>link</code> but is not an <code>a</code> element. Check that it is keyboard-operable (should activate with <kbd>Enter</kbd> key)<br>";
        warn = true;
      }

      if (accName === "") {
        if (link.getAttribute("title")) {
          accName = link.getAttribute("title");
        } else {
          accName = "‼️ Empty link";
        }
        tc = "‼️ Empty link";
        notes += "‼️ Empty link<br>";
        err = true;
      }

      if (imgLink && accName === "‼️ Empty link") {
        notes += " - image is missing alternative text content<br>";
      }

      if (link.href) {
        href = link.href;
      }

      if (err) {
        warn = false;
      }
      row += "<tr";
      row += ' data-link-ref="' + i + '"';

      if (warn) {
        row += ' class="issue warn"';
      }

      if (err) {
        row += ' class="issue err"';
      }

      row += ">";

      if (link.tagName === "A") {
        linkType = "<code>&lt;a&gt;</code>";
      } else {
        linkType = '<code>role="link"</code>';
      }
      row += "<td>" + linkType + "</td>";
      row += "<td>" + tc + "</td>";
      row += "<td>" + accName;
      if (accName.trim() !== tc.trim() && tc.trim() !== "") {
        row += '<div class="anDiff">Accessible name differs</div>';
      }
      row += "</td>";
      if (
        accName.trim() !== tc.trim() &&
        accName.trim().toLowerCase() === tc.trim().toLowerCase()
      ) {
        notes += "- Same text but case difference noted (likely not an issue)";
      }
      row += "<td>";
      if (warn) {
        row +=
          '<div class="issues">Possible issue(s) found with this link</div>';
      }
      if (err) {
        row +=
          '<div class="issues">Definite issue(s) found with this link</div>';
      }
      consoleOutput =
        "Link '" +
        tc.trim() +
        "':\n" +
        notes +
        "Markup with issue:\n" +
        snippet +
        "\n---------------\n";
      row +=
        notes +
        '<a href="' +
        href +
        '" target="_blank" aria-label="' +
        accName +
        '">🔗</a> <label for="l' +
        i +
        '">Links to:</label><input id="l' +
        i +
        '" class="linkToCopy" type="text" value="' +
        href +
        '"> <button class="showSnippet" type="button" aria-label="Show markup snippet" aria-expanded="false"><code>&lt;/&gt;</code></button><div class="snippet" hidden><label for="snip' +
        i +
        '">Markup snippet</label><textarea id="snip' +
        i +
        '" aria-label="Markup snippet for this node">' +
        snippet +
        '</textarea><button type="button" class="decrapulate" aria-label="De-crapulate this markup snippet">De-crapulate</button></div></td>';
      row +=
        '<td><button data-link-ref="' +
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
      '<style>[aria-pressed=true]{color:white;background:darkblue;}div.issues{font-weight:bold;};textarea {margin:5px 0;}.snippet label {font-weight:bold;font-size:0.8em;color:black;}.snippet{background:#efefef;outline:1px solid #666;padding:5px;margin-top:5px;}.checkDiffs{background:PapayaWhip;}.anDiff{color:red;font-weight:bold;font-size:10px;display:block}.warn {background:lightyellow;}.err {background:PapayaWhip;color:red;}.visually-hidden,.a11y,.visuallyhidden,.sr-text,.sr-only {clip-path: inset(100%);clip: rect(1px, 1px, 1px, 1px);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;}* {-webkit-box-sizing: border-box;box-sizing: border-box;}html {/*border: .75em solid #fff;*/min-height: 100vh;}body {background: #f7f7f5;color: #333;font: 400 105%/1.4 "Work Sans", sans-serif;margin: 1.5em auto;max-width: 54em;width: 90%;}a:link,a:visited {border-bottom: 1px solid rgba(42, 122, 130, .5);color: #2b7a82;text-decoration: none;}a:hover {border-bottom: 2px solid;color: #1e565c;}button:focus,a:focus {box-shadow: none;outline-offset: 2px;outline: 3px solid rgba(42, 122, 130, .75);}a:focus {border-bottom: none;}a:active {background: #333;color: #fff;}code {font-family: Consolas, monaco, monospace;-moz-tab-size: 4;tab-size: 4;text-transform: none;white-space: pre-wrap;color:brown;}textarea {width: 100%}legend h2, legend h3 {margin: 0;}table {border-collapse: collapse;}th,td {padding: 10px;border:2px solid #2b7a82;}table caption {font-weight: bold;text-align: left;margin:1em 0;}</style><h1>List of links on this page.</h1>';
    s +=
      '<input type="checkbox" id="showPotentialProblemsOnly"><label for="showPotentialProblemsOnly">Show only links where there *may* be issues (' +
      issueCount +
      " found)</label>";
    s +=
      ' <button class="highlightButtonAll" type="button" aria-pressed="false">Highlight all links on page</button>';
    s +=
      '<table border="1" cellpadding="5"><caption>All links (anchors or elements with role="link") on this page, the accessible name and any issues found</caption><thead><tr valign=top><th>Link type</th><th scope="col">Link text</th><th scope="col">Accessible name</th><th scope="col">Notes</th><th>Highlight on the page</th></tr></thead><tbody>' +
      row +
      "</tbody></table>";
    s += "<script>function showLinks(){";
    s += "var refWindow=window.opener;";
    s +=
      'var highlightButtons=document.querySelectorAll(".highlightButton");var linkToHighlight;Array.from(highlightButtons).forEach(highlightButton => {highlightButton.addEventListener("click", e => {linkToHighlight="[data-link-ref=\'" + highlightButton.getAttribute("data-link-ref") + "\']";if (highlightButton.getAttribute("aria-pressed")==="false") {refWindow.document.querySelector(linkToHighlight).focus();refWindow.document.querySelector(linkToHighlight).style.outline="4px dashed darkblue";refWindow.document.querySelector(linkToHighlight).style.outlineOffset="-4px";highlightButton.setAttribute("aria-pressed","true");} else {refWindow.document.querySelector(linkToHighlight).style.outline="";highlightButton.setAttribute("aria-pressed","false");}});});';
    s +=
      'var highlightButtonAll=document.querySelector(".highlightButtonAll");highlightButtonAll.addEventListener("click", e => {if (highlightButtonAll.getAttribute("aria-pressed")==="false") {Array.from(highlightButtons).forEach(highlightButton => {highlightButton.setAttribute("aria-pressed","false");highlightButton.click();});highlightButtonAll.setAttribute("aria-pressed","true");} else {Array.from(highlightButtons).forEach(highlightButton => {highlightButton.setAttribute("aria-pressed","true");highlightButton.click();});highlightButtonAll.setAttribute("aria-pressed","false");}});';
    s +=
      'var linksToCopy=document.querySelectorAll(".linkToCopy");Array.from(linksToCopy).forEach(linkToCopy => {linkToCopy.addEventListener("focus", e => {linkToCopy.select();});});';
    s +=
      'function hideGoodRows(){Array.from(trsWithoutIssue).forEach(trWithoutIssue => {trWithoutIssue.setAttribute("hidden","hidden");});}function showGoodRows(){Array.from(trsWithoutIssue).forEach(trWithoutIssue => {trWithoutIssue.removeAttribute("hidden");});}var trsWithoutIssue=document.querySelectorAll("tbody tr:not(.issue)");var showProblemCheckbox=document.querySelector("#showPotentialProblemsOnly");showProblemCheckbox.addEventListener("click", e => {if (showProblemCheckbox.checked) {hideGoodRows();} else {showGoodRows();}});';
    s +=
      '}window.addEventListener("load", (event) => {showLinks();});</script>';

    const popUpWinLinks = window.open(
      "",
      "popUpWinLinks",
      "height=800,width=1000"
    );
    popUpWinLinks.document.open();
    popUpWinLinks.document.write(s);
    popUpWinLinks.document.close();
  }
  listLinks();
})();
