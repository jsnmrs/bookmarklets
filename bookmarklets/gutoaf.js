/* eslint-disable */
// Grand Unified Theory of Accessibility Favlets (GUToAF)

// CSS Styles for items that get injected

var fontFamily =
  "font-family: Arial,'Helvetica Neue',Helvetica,sans-serif !important;";
var textAlign = "text-align: left !important;";
var lineHeight = "line-height: 16px !important;";
var boxFont = fontFamily + textAlign + lineHeight;
var anchorPad = "margin:0 0 0 7px !important; padding:0 !important;";
var liPad = "margin:0 !important; padding: 3px 0 !important;";

var blackBorder =
  " border-radius: 4px !important; border: 1px solid #000 !important;";
var alertPre =
  fontFamily +
  " position: absolute; font-size: 14px; margin: 0 !important; padding: 4px !important; z-index: 99999;";
var alertStyle =
  alertPre +
  blackBorder +
  " color: #000; background-color: #FFD700; border: 1px solid #000; font-weight: normal; font-style: normal;";
var alertBox =
  fontFamily +
  blackBorder +
  " line-height: 10px !important; font-size: 10px !important; margin: 4px !important; padding: 4px !important; z-index: 99999; color: #000 !important; background-color: #FFD700 !important; ";

var alertStyleTight =
  fontFamily +
  "color: #000 !important; background-color: #FFD700 !important; border: 1px solid #000 !important; font-weight: normal !important; font-style: normal !important; font-size: 11px !important; margin: 0 !important; padding: 0 !important; z-index: 99999 !important;";
var borderStyle =
  "border: 3px solid #5cd344; border-radius: 4px !important; padding: 4px !important; z-index: 99998 !important;";
var highlightStyle =
  "border: 3px solid #5cd344 !important; margin: 4px !important; border-radius: 4px !important; padding: 4px !important; z-index: 99998 !important";
var blackoutStyle =
  "background-color:#000 !important; color:#000 !important; opacity: 1 !important; border: 3px solid #5cd344 !important; border-radius: 4px !important;";

// CSS Styles for the box

var GUToAFStyle =
  "#GUToAFDiv {" +
  fontFamily +
  " position:fixed; z-index:999998; background-color:#f1f1f1; border:1px solid #d7d7d7; border-radius: 6px; box-shadow: 0px 3px 15px rgba(0,0,0,0.2);top:25px; left:25px;}";
GUToAFStyle +=
  "#GUToAFDivheader {" +
  fontFamily +
  lineHeight +
  " font-size: 14px !important; padding:2px 7px !important; cursor:move; z-index:999999; background-color:#5cd344; color:#000; font-weight:bold; border-top-left-radius: 6px; border-top-right-radius: 6px;}";
GUToAFStyle += "#GUToAFInner {overflow:auto !important;}";
GUToAFStyle +=
  "#GUToAFUl { list-style-type:none !important; list-style-image:none !important; margin:0 !important; padding:0 !important;}";
GUToAFStyle +=
  "#GUToAFUl li {" +
  boxFont +
  liPad +
  " border-top: 1px solid #d7d7d7 !important; font-size:12px !important;}";
GUToAFStyle += "#GUToAFUl li:first-child { border-top: 0 !important; }";
GUToAFStyle +=
  "#GUToAFUl li:hover {" +
  lineHeight +
  liPad +
  "background-color:#d3d3d3 !important;}";
GUToAFStyle +=
  "#GUToAFUl li a:link, #GUToAFUl li a:visited, #GUToAFUl li a:active {" +
  boxFont +
  anchorPad +
  " color:#3359ec !important; text-decoration:none !important;}";
GUToAFStyle +=
  "#GUToAFUl li a:hover {" +
  lineHeight +
  anchorPad +
  "color:#552c9f !important; text-decoration:underline !important;}";
GUToAFStyle +=
  "#GUToAFResults {" +
  boxFont +
  "color: #000;  font-size: 12px !important; font-weight: bold !important; margin: 3px 0 !important; padding-left: 7px !important; border-bottom: 2px solid #5cd344 !important; max-height: 6em !important; overflow: auto !important; background-color: #eff !important;}";
GUToAFStyle +=
  "#GUToAFUl li.GUToAFlineAbove { border-top: 2px solid #5cd344 !important; }";
GUToAFStyle +=
  ".GUToAFsummary { " +
  boxFont +
  liPad +
  "border: 2px solid #5cd344 !important; border-radius: 4px; background-color: #fff !important; color: #000 !important; }";

GUToAFStyle +=
  "#GUToAFUlDetails { list-style-type:disc !important; list-style-image:none !important; margin:0 !important; padding:0 !important;}";
GUToAFStyle +=
  "#GUToAFUlDetails li {" +
  boxFont +
  " font-weight: normal; padding: 0 !important; margin: 0 0 0 9px !important; font-size:9px !important;}";

// List of all links

var linkList = [
  {
    key: "GUToAF-describedby",
    title: "ARIA: Described By",
    click: "showDescribedBy()",
    desc: "Shows relationship between aria-describedby and what the content is. Also flags if there is an invalid reference.",
  },
  {
    key: "GUToAF-ariaHidden",
    title: "ARIA: Hidden",
    click: "cssAriaHidden()",
  },
  {
    key: "GUToAF-ariaLabel",
    title: "ARIA: Label/By",
    click: "showAriaLabel()",
  },
  {
    key: "GUToAF-ariaPresentation",
    title: "ARIA: Presentation",
    click: "cssAriaPresentation()",
  },
  {
    key: "GUToAF-showRoles",
    title: "ARIA: Roles",
    click: "showRoles()",
  },
  /*{
      key: "GUToAF-forms",
      title: "Forms",
      click: "showForms()"
   },*/

  {
    key: "GUToAF-autoComplete",
    title: "Forms: Auto Complete",
    click: "showAutocomplete()",
  },

  {
    key: "GUToAF-fieldset",
    title: "Forms: Fieldset",
    click: "cssFieldset()",
  },
  {
    key: "GUToAF-label",
    title: "Forms: Label",
    click: "cssLabel()",
  },
  {
    key: "GUToAF-showAlt",
    title: "Images: Alt Text",
    click: "showAlt()",
  },
  {
    key: "GUToAF-focusOrder",
    title: "Keyboard: Focus Order",
    click: "showFocusOrder()",
  },
  {
    key: "GUToAF-tabIndex",
    title: "Keyboard: TabIndex",
    click: "showTabIndex()",
    desc: "Shows all elements that has a tabIndex attribute",
  },
  {
    key: "GUToAF-showHeadings",
    title: "Page: Headings",
    click: "showHeadings()",
  },
  {
    key: "GUToAF-showLang",
    title: "Page: Language",
    click: "showLang()",
  },
  {
    key: "GUToAF-showRegions",
    title: "Page: Regions",
    click: "showRegions()",
  },
  {
    key: "GUToAF-tables",
    title: "Tables",
    click: "showTables()",
  },
  {
    key: "GUToAF-titles",
    title: "Titles",
    click: "showTitles()",
  },
  {
    key: "GUToAF-grayScale",
    title: "Stylus: Grayscale",
    style: "GUToAFlineAbove",
    click: "cssGrayscale()",
  },
  {
    key: "GUToAF-focusShow",
    title: "Stylus: Show Focus",
    click: "cssFocusShow()",
  },
  {
    key: "GUToAF-textSpacing",
    title: "Stylus: Text Spacing",
    click: "cssTextspacing()",
  },
  {
    key: "GUToAF-andi",
    title: "ANDI (SSA)",
    script: "https://www.ssa.gov/accessibility/andi/andi.js",
    style: "GUToAFlineAbove",
    removeSelf: "yes",
  },
  {
    key: "GUToAF-tota11y",
    title: "Tota11y (Khan)",
    script: "https://khan.github.io/tota11y/dist/tota11y.min.js",
    removeSelf: "yes",
  },

  {
    key: "GUToAF-visualAria",
    title: "Visual ARIA (WhatSock)",
    script:
      "https://gutterstar.bizland.com/whatsock/training/matrices/visual-aria/roles.js",
    removeSelf: "yes",
  },
  {
    key: "GUToAF-reset",
    title: "Reset",
    style: "GUToAFlineAbove",
  },
  {
    key: "GUToAF-close",
    title: "Close",
    removeSelf: "yes",
    keepDOM: "yes",
  },
];

// Nuke out the elements that this script added

function removeDOM() {
  if (document.querySelectorAll("[data-GUToAFset]")) {
    document
      .querySelectorAll("[data-GUToAFset]")
      .forEach((e) => e.parentNode.removeChild(e));
  }
}

function removeSELF() {
  document.getElementById("GUToAFDiv").remove();
  document.getElementById("GUToAFCSS").remove();
}

// Add the results to the tool

function showResults(name, count, name2, count2) {
  var resultsDiv = document.createElement("div");
  var results = name + ": " + count;

  if (name2) {
    results += "<br />" + name2 + ": " + count2;
  }
  resultsDiv.innerHTML = results;
  resultsDiv.id = "GUToAFResults";
  resultsDiv.setAttribute("data-GUToAFSet", "showResults");
  document
    .getElementById("GUToAFUl")
    .insertAdjacentElement("beforebegin", resultsDiv);
}

// Make the box draggable

function dragElement(elmnt, side) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e, side) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    if (side == "right") {
      elmnt.style.right = elmnt.offsetRight - pos1 + "px";
    } else {
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Build CSS

function buildCSS(css, dataID) {
  var style = document.createElement("style");
  style.innerHTML = css;
  if (dataID) {
    style.setAttribute("data-GUToAFSet", dataID);
  } else {
    style.id = "GUToAFCSS";
  }
  document.head.appendChild(style);
}

// Create CSS Content for labels, etc.

function createCSSContent(element, content, position, attr) {
  var CSS = "";
  CSS += element + "::" + position + " {";
  CSS += alertStyle;

  if (attr) {
    CSS += "content: '" + content + ": '";
    CSS += " attr(" + attr + ")";
  } else {
    CSS += "content: '" + content + "'";
  }
  CSS += ";}";
  return CSS;
}

// Favelets that are more than highlighting the CSS

function showLang() {
  var el = document.querySelectorAll("[lang]");
  if (el.length > 0) {
    for (var i = 0; i < el.length; i++) {
      s = document.createElement("span");
      t = document.createTextNode("@lang='" + el.item(i).lang + "'");
      s.setAttribute("title", el.item(i).nodeName);
      s.appendChild(t);
      s.style = alertStyle;
      s.setAttribute("data-GUToAFSet", "showLang");
      el.item(i).insertBefore(s, el.item(i).firstChild);
    }
  }
  showResults("@lang", el.length);
}

function showTabIndex() {
  var el = document.querySelectorAll("[tabindex]");
  if (el.length > 0) {
    for (var i = 0; i < el.length; i++) {
      s = document.createElement("span");
      t = document.createTextNode("@tabindex='" + el.item(i).tabIndex + "'");
      s.setAttribute("title", el.item(i).nodeName);
      s.appendChild(t);
      s.style = alertStyle;
      s.setAttribute("data-GUToAFSet", "showTabIndex");
      el.item(i).insertBefore(s, el.item(i).firstChild);
    }
  }
  showResults("@tabindex", el.length);
}

function showAlt() {
  var col = document.querySelectorAll("img,[role='img']");
  var altList = "";
  if (col.length > 0) {
    altList += '<ul id="GUToAFUlDetails">';
    for (var i = 0; i < col.length; i++) {
      var alttext;
      altList += "<li>";
      if (col[i].hasAttribute("aria-label")) {
        alttext = document.createTextNode(
          "aria-label=" + col[i].getAttribute("aria-label")
        );
        altList += "ARIA: " + col[i].getAttribute("aria-label");
      } else if (col[i].hasAttribute("alt") && col[1].alt) {
        alttext = document.createTextNode("alt=" + col[i].alt);
        altList += "ALT: " + col[i].alt;
      } else if (col[i].hasAttribute("alt")) {
        alttext = document.createTextNode("alt=NULL");
        altList += "ALT: NULL";
      } else if (col[i].hasAttribute("title")) {
        alttext = document.createTextNode("title=" + col[i].title);
        altList += "Title: " + col[i].title;
      } else {
        alttext = document.createTextNode("No alt");
        altList += "No ALT";
      }
      altList += "</li>";
      var node = document.createElement("span");
      node.setAttribute("data-GUToAFSet", "showAlt");
      node.style = alertStyle;
      node.appendChild(alttext);
      col[i].parentNode.insertBefore(node, col[i]);
    }
    altList += "</ul>";
  }
  showResults("Images", col.length, "Text", altList);
}

function showHeadings() {
  var col = document.querySelectorAll("h1,h2,h3,h4,h5,h6,[role='heading']");
  if (col.length > 0) {
    for (var i = 0; i < col.length; i++) {
      var textStr = col[i].tagName + " ";
      if (col[i].hasAttribute("role")) {
        textStr = textStr + "role=" + col[i].getAttribute("role") + " ";
      }
      if (col[i].hasAttribute("aria-level")) {
        textStr = textStr + "aria-level=" + col[i].getAttribute("aria-level");
      }
      var text = document.createTextNode(textStr);
      var node = document.createElement("span");
      node.style = alertStyle;
      node.setAttribute("data-GUToAFSet", "showHeadings");
      node.appendChild(text);
      col[i].parentNode.insertBefore(node, col[i]);
    }
    buildCSS(
      "h1,h2,h3,h4,h5,h6,[role='heading']{ " + borderStyle + "}",
      "showHeadings"
    );
  }
  var count = document.querySelectorAll("h1,h2,h3,h4,h5,h6").length;
  var count2 = document.querySelectorAll("[role='heading']").length;
  showResults("Headings", count, "@role=heading", count2);
}

function showAutocomplete() {
  var col = document.querySelectorAll("[autocomplete]");
  if (col.length > 0) {
    for (var i = 0; i < col.length; i++) {
      s = document.createElement("span");
      t = document.createTextNode("Autocomplete=" + col.item(i).autocomplete);
      s.setAttribute("data-GUToAFSet", "showAutocomplete");
      s.appendChild(t);
      s.style = alertStyle;
      col.item(i).parentNode.insertBefore(s, col.item(i));
    }
  }
  showResults("@autocomplete", col.length);
}

function showTitles() {
  var el = document.querySelectorAll("[title]:not(.GUToAFLI)");
  if (el.length > 0) {
    for (var i = 0; i < el.length; i++) {
      s = document.createElement("span");
      t = document.createTextNode("@title='" + el.item(i).title + "'");
      s.setAttribute("title", el.item(i).nodeName);
      s.appendChild(t);
      s.setAttribute("data-GUToAFSet", "showTitles");
      s.style = alertStyle;
      el.item(i).parentNode.insertBefore(s, el.item(i));
    }
  }
  showResults("@title", el.length);
}

function showFocusOrder() {
  var gi_order = 1;

  traverseFrames(document);

  function traverseFrames() {
    // check for sr-only class in current document and then check it's frames
    var nl = document.querySelectorAll(
      "[tabindex], button, a[href], area, input:not([type=hidden]) , select, textarea, iframe"
    );

    initHelper(document, nl);
    // go through for each frame's document if there are any frames
    var frametypes = ["frame", "iframe"];
    for (var i = 0; i < frametypes.length; i++) {
      var myframes = document.getElementsByTagName(frametypes[i]);
      for (var z = 0; z < myframes.length; z++) {
        try {
          traverseFrames(myframes[z].contentWindow.document);
        } catch (e) {}
      }
    }
  }

  function initHelper(document, nl) {
    var ar = [];
    var positive = [];
    var ar_position = 0;
    var positive_position = 0;

    for (var i = 0; i < nl.length; i++) {
      if (
        !nl[i].hasAttribute("disabled") &&
        !nl[i].hasAttribute("data-GUToAFLink")
      ) {
        if (nl[i].hasAttribute("tabindex")) {
          if (nl[i].getAttribute("tabindex") == 0) {
            ar[ar_position] = nl[i];
            ar_position++;
          } else if (parseInt(nl[i].getAttribute("tabindex")) > 0) {
            positive[positive_position] = nl[i];
            positive_position++;
          }
        } else {
          // no tabindex

          ar[ar_position] = nl[i];
          ar_position++;
        }
      }
    }

    positive.sort(function (a, b) {
      return (
        parseInt(a.getAttribute("tabindex"), 10) -
        parseInt(b.getAttribute("tabindex"), 10)
      );
    });

    for (var i = 0; i < positive.length; i++) {
      s = document.createElement("span");
      t = document.createTextNode(gi_order);
      gi_order++;
      s.appendChild(t);
      s.style = alertStyle;
      s.setAttribute("data-GUToAFSet", "showAutocomplete");
      positive[i].parentNode.insertBefore(s, positive[i]);
    }
    for (var i = 0; i < ar.length; i++) {
      s = document.createElement("span");
      t = document.createTextNode(gi_order);
      gi_order++;
      s.appendChild(t);
      s.style = alertStyle;
      s.setAttribute("data-GUToAFSet", "showAutocomplete");
      ar[i].parentNode.insertBefore(s, ar[i]);
    }
  }
  gi_order--;
  showResults("Focus order", gi_order);
}

function showRegions() {
  var regions = [
    {
      css: "header",
      role: "banner",
      title: "Header",
      color: "#f0f",
      font: "#000",
    },
    {
      css: "main",
      role: "main",
      title: "Main",
      color: "#f00",
      font: "#000",
    },
    {
      css: "aside",
      role: "complementary",
      title: "Aside",
      color: "#00ff00",
      font: "#000",
    },
    {
      css: "nav",
      role: "navigation",
      title: "Navigation",
      color: "#00f",
      font: "#fff",
    },
    {
      css: "form",
      role: "form",
      title: "Form",
      color: "#ff0",
      font: "#000",
    },
    {
      css: "search",
      role: "search",
      title: "Search",
      color: "#800000",
      font: "#fff",
    },
    {
      css: "footer",
      role: "contentinfo",
      title: "Footer",
      color: "#0ff;",
      font: "#000",
    },
  ];

  var CSS = "";
  var count = 0;
  regions.forEach(function (element) {
    var thisRole = "[role='" + element.role + "']";
    var thisID = element.css + "," + thisRole;
    var el = document.querySelectorAll(thisID);
    if (el.length > 0) {
      for (var i = 0; i < el.length; i++) {
        s = document.createElement("span");
        t = document.createTextNode(element.title);
        s.appendChild(t);
        s.style =
          alertPre +
          " background-color: " +
          element.color +
          "; color: " +
          element.font +
          "; font-weight: bold;";
        s.setAttribute("data-GUToAFSet", "showRegions");
        el.item(i).parentNode.insertBefore(s, el.item(i));
        CSS +=
          element.css +
          ", " +
          thisRole +
          " { padding: 20px !important;  border-radius: 4px; border: 3px dotted " +
          element.color +
          "; }";
        count++;
      }
    }
  });
  buildCSS(CSS, "cssRegions");
  showResults("Regions", count);
}

function showDescribedBy() {
  var col = document.querySelectorAll("[aria-describedby]");

  if (col.length > 0) {
    for (var i = 0; i < col.length; i++) {
      var dbID = col[i].getAttribute("aria-describedby");

      if (document.getElementById(dbID)) {
        text = document.getElementById(dbID);

        var parentNode = document.createElement("span");
        parentNode.style = alertStyle;
        parentNode.setAttribute("data-GUToAFSet", "showDescribedByParent");
        parentNode.setAttribute("title", text.innerText);
        var pNtext = document.createTextNode("DescribedBy: " + dbID);
        parentNode.appendChild(pNtext);
        col[i].parentNode.insertBefore(parentNode, col[i]);

        var destinationNode = document.createElement("span");
        destinationNode.style = alertStyle;
        destinationNode.setAttribute(
          "data-GUToAFSet",
          "showDescribedByDestination"
        );
        var dNtext = document.createTextNode("ID: " + dbID);
        destinationNode.appendChild(dNtext);
        document
          .getElementById(dbID)
          .insertAdjacentElement("beforebegin", destinationNode);
        var CSS = "#" + dbID + "{ " + highlightStyle + "}";
        buildCSS(CSS, "DescribedBy");
      } else {
        var parentNode = document.createElement("span");
        parentNode.style = alertStyle;
        parentNode.setAttribute("data-GUToAFSet", "showDescribedByParent");
        var pNtext = document.createTextNode(
          "DescribedBy: " + dbID + " INVALID ID"
        );
        parentNode.appendChild(pNtext);
        col[i].parentNode.insertBefore(parentNode, col[i]);
      }
    }
  }
  showResults("@aria-descriedby", col.length);
}

function showForms() {
  var CSS = "form{ " + highlightStyle + "}";
  buildCSS(CSS, "cssFieldset");

  var count = document.querySelectorAll("form").length;
  var count2 = document.querySelectorAll("input,select").length;
  showResults("Forms", count, "Input/Select", count2);
}

function showRoles() {
  var el = document.querySelectorAll("[role]");
  if (el.length > 0) {
    for (var i = 0; i < el.length; i++) {
      s = document.createElement("span");
      t = document.createTextNode(
        "@role='" + el.item(i).getAttribute("role") + "'"
      );
      s.setAttribute("title", el.item(i).nodeName);
      s.appendChild(t);
      s.style = alertStyle;
      s.setAttribute("data-GUToAFSet", "showRole");
      el.item(i).insertBefore(s, el.item(i).firstChild);
    }
  }
  showResults("@roles", el.length);
}

function showAriaLabel() {
  var el = document.querySelectorAll("[aria-label]");
  if (el.length > 0) {
    for (var i = 0; i < el.length; i++) {
      s = document.createElement("span");
      t = document.createTextNode(
        "@aria-label='" + el.item(i).getAttribute("aria-label") + "'"
      );
      s.setAttribute("title", el.item(i).nodeName);
      s.appendChild(t);
      s.style = alertStyle;
      s.setAttribute("data-GUToAFSet", "showAriaLabel");
      el.item(i).insertBefore(s, el.item(i).firstChild);
    }
  }

  var col = document.querySelectorAll("[aria-labelledby]");
  if (col.length > 0) {
    for (var i = 0; i < col.length; i++) {
      var dbID = col[i].getAttribute("aria-labelledby");

      if (document.getElementById(dbID)) {
        text = document.getElementById(dbID);

        var parentNode = document.createElement("span");
        parentNode.style = alertStyle;
        parentNode.setAttribute("data-GUToAFSet", "showLabelledByParent");
        parentNode.setAttribute("title", text.innerText);
        var pNtext = document.createTextNode("LabelledBy: " + dbID);
        parentNode.appendChild(pNtext);
        col[i].parentNode.insertBefore(parentNode, col[i]);

        var destinationNode = document.createElement("span");
        destinationNode.style = alertStyle;
        destinationNode.setAttribute(
          "data-GUToAFSet",
          "showLabelledByDestination"
        );
        var dNtext = document.createTextNode("ID: " + dbID);
        destinationNode.appendChild(dNtext);
        document
          .getElementById(dbID)
          .insertAdjacentElement("beforebegin", destinationNode);
        var CSS = "#" + dbID + "{ " + highlightStyle + "}";
        buildCSS(CSS, "LabelledBy");
      } else {
        var parentNode = document.createElement("span");
        parentNode.style = alertStyle;
        parentNode.setAttribute("data-GUToAFSet", "showLabelledByDestination");
        var pNtext = document.createTextNode(
          "LabelledBy: " + dbID + " INVALID ID"
        );
        parentNode.appendChild(pNtext);
        col[i].parentNode.insertBefore(parentNode, col[i]);
      }
    }
  }

  var mspel = document.querySelectorAll("[aria-labeledby]");
  if (mspel.length > 0) {
    for (var i = 0; i < mspel.length; i++) {
      for (var i = 0; i < mspel.length; i++) {
        s = document.createElement("span");
        t = document.createTextNode("labeledby is misspelled");
        s.setAttribute("title", mspel.item(i).nodeName);
        s.appendChild(t);
        s.style = alertStyle;
        s.setAttribute("data-GUToAFSet", "showAriaLabel");
        mspel.item(i).insertBefore(s, mspel.item(i).firstChild);
      }
    }
    showResults("Misspelled Labeledby", mspel.length);
  }

  showResults("@aria-label", el.length, "@aria-labelledby", col.length);
}

function showTables() {
  var tableParts = [
    {
      css: "tbody",
      title: "TBody",
      color: "#ff0",
      pad: "4",
    },
    {
      css: "thead",
      title: "THead",
      color: "#0ff",
      pad: "4",
    },
    {
      css: "tfoot",
      title: "TFoot",
      color: "#f0f",
      pad: "4",
    },
    {
      css: "td",
      title: "TD",
      color: "#00f",
      bg: "rgba(0,0,256,0.2)",
    },
    {
      css: "th",
      title: "TH",
      color: "#f00",
      bg: "rgba(256,0,0,0.2)",
    },
    {
      css: "caption",
      title: "Caption",
      color: "#0f0",
      bg: "rgba(0,256,0,0.2)",
    },
  ];

  var CSS = "table {border-collapse: collapse;}";

  tableParts.forEach(function (element) {
    CSS +=
      element.css + " { border: 3px dotted " + element.color + " !important;";
    if (element.bg) {
      CSS += " background-color: " + element.bg + " !important;";
    }
    if (element.pad) {
      CSS +=
        " margin: " +
        element.pad * 2 +
        "px !important; padding: " +
        element.pad +
        "px !important;";
    }
    CSS += "}";
  });

  var table = document.querySelectorAll("table");
  if (table.length > 0) {
    for (var t = 0; t < table.length; t++) {
      var thisTable = table.item(t);
      var thisCaption = "NONE";
      if (thisTable.getElementsByTagName("caption")[0]) {
        thisCaption = thisTable.getElementsByTagName("caption")[0].innerText;
      }

      var thisSummary = "NONE";
      if (thisTable.getAttribute("summary")) {
        thisSummary = thisTable.getAttribute("summary");
      }

      var tbodyCount = thisTable.getElementsByTagName("tbody").length;
      var theadCount = thisTable.getElementsByTagName("thead").length;
      var tfootCount = thisTable.getElementsByTagName("tfoot").length;
      var tdCount = thisTable.getElementsByTagName("td").length;
      var thCount = thisTable.getElementsByTagName("th").length;
      var trCount = thisTable.getElementsByTagName("tr").length;

      tableParts.forEach(function (element) {
        var el = thisTable.querySelectorAll(element.css);
        if (el.length > 0) {
          for (var i = 0; i < el.length; i++) {
            el.item(i).innerHTML =
              '<span style="' +
              alertStyleTight +
              '" data-GUToAFSet="ShowTables">' +
              element.title +
              "</span>" +
              el.item(i).innerHTML;
          }
        }
      });

      var div = document.createElement("div");
      var text = "<strong>Table #" + (t + 1) + "</strong>";
      text += "<br />Caption: " + thisCaption;
      text += "<br />Summary: " + thisSummary + "<br />";
      text +=
        "THEAD:" +
        theadCount +
        " | TBODY:" +
        tbodyCount +
        " | TFOOT:" +
        tfootCount +
        " | TR:" +
        trCount +
        " | TH:" +
        thCount +
        " | TD:" +
        tdCount;

      div.setAttribute("style", alertBox);
      div.setAttribute("data-GUToAFSet", "ShowTableSummary");
      div.innerHTML = text;
      thisTable.insertAdjacentElement("beforebegin", div);
    }
  }
  buildCSS(CSS, "cssTables");
  showResults("Tables", table.length);
}

// Functions that just modify the CSS

function cssFieldset() {
  var CSS = "fieldset{ " + highlightStyle + "}";
  CSS += createCSSContent("legend", "Legend", "before");
  CSS += createCSSContent("fieldset", "Fieldset", "before");
  buildCSS(CSS, "cssFieldset");

  var count = document.querySelectorAll("fieldset").length;
  var count2 = document.querySelectorAll("legend").length;
  showResults("Fieldset", count, "Legend", count2);
}

function cssLabel() {
  var CSS = "label{ " + highlightStyle + "}";
  CSS += createCSSContent("label", "Label (for)", "before", "for");
  buildCSS(CSS, "cssLabel");
  var count = document.querySelectorAll("label").length;
  var count2 = document.querySelectorAll("input,select").length;
  showResults("Label", count, "Form Fields", count2);
}

function cssAriaHidden() {
  var CSS = '[aria-hidden="true"] { ' + blackoutStyle + "}";
  CSS += createCSSContent('[aria-hidden="true"]', "ARIA-Hidden", "before");
  buildCSS(CSS, "cssAriaHidden");

  var count = document.querySelectorAll('[aria-hidden="true"]').length;
  showResults("@aria-hidden", count);
}

// EVENTUALLY REMOVE THIS AND MAKE THE ROLE FUNCTION FILTERABLE
function cssAriaPresentation() {
  var CSS = '[role="presentation"] { ' + borderStyle + "}";
  CSS += createCSSContent(
    '[role="presentation"]',
    "role=Presentation",
    "before"
  );
  buildCSS(CSS, "cssAriaPresentation");

  var count = document.querySelectorAll('[role="presentation"]').length;
  showResults("@role=presentation", count);
}

// Style the page rather than show results (Stylus replacement)

function cssFocusShow() {
  var CSS = "*:focus { outline: #ff0000 solid 4px !important; }";
  buildCSS(CSS, "cssShowFocus");
}

function cssTextspacing() {
  var CSS =
    "*{line-height:1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p {margin-bottom: 2em !important;}";
  buildCSS(CSS, "cssTextSpacing");
}

function cssGrayscale() {
  var CSS =
    "html { filter: grayscale(100%) !important; -webkit-filter: grayscale(1) !important; }";
  buildCSS(CSS, "cssGrayscale");
}

// Build the links for the box

function GUToAFBuildLinks() {
  var thisUL = document.createElement("ul");
  thisUL.id = "GUToAFUl";

  linkList.forEach(function (element) {
    var thisID = element.key;
    var url = document.createElement("a");
    var linkText = document.createTextNode(element.title);
    var onclick;
    url.appendChild(linkText);
    url.href = "#";
    url.id = thisID;
    url.setAttribute("data-gutoaflink", thisID);

    if (element.script) {
      onclick =
        "javascript:(function(){var element=document.createElement('script'); element.setAttribute('src','" +
        element.script +
        "');document.body.appendChild(element);})();";
    } else if (element.click) {
      onclick = element.click + ";";
    }

    if (element.removeSelf) {
      onclick = "removeSELF(); " + onclick;
    }

    if (!element.keepDOM) {
      onclick = "removeDOM(); " + onclick;
    }

    url.setAttribute("onclick", onclick);

    if (url) {
      var thisLI = document.createElement("li");
      thisLI.appendChild(url);

      if (element.style) {
        thisLI.className = element.style + " GUToAFLI";
      } else {
        thisLI.className = "GUToAFLI";
      }
      if (element.desc) {
        thisLI.title = element.desc;
      }

      thisLI.appendChild(url);
      thisUL.appendChild(thisLI);
    }
  });

  return thisUL;
}

// run on the page

function run(doc) {
  // Add the CSS if it isn't already present

  if (!document.getElementById("GUToAFCSS")) {
    buildCSS(GUToAFStyle);
  }

  // If the box isn't already on the page, add it when the script runs

  if (!document.getElementById("GUToAFDiv")) {
    var elemDiv = document.createElement("div");
    elemDiv.id = "GUToAFDiv";

    var elemTitle = document.createElement("div");
    elemTitle.id = "GUToAFDivheader";

    var elemTitleText = document.createTextNode("Accessibility Favlets");
    elemTitle.appendChild(elemTitleText);

    var elemDivInner = document.createElement("div");
    elemDivInner.id = "GUToAFInner";

    elemDiv.appendChild(elemTitle);
    elemDivInner.appendChild(GUToAFBuildLinks());
    elemDiv.appendChild(elemDivInner);

    document.body.insertAdjacentElement("beforeend", elemDiv);
  }

  // Create the dragable div
  dragElement(document.getElementById("GUToAFDiv"));
}

run(document);
