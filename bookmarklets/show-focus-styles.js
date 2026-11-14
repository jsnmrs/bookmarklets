/**
 * @bookmarklet Show focus styles
 * @description Show every focus, focus-visible, and hover style on the page at once
 * @author Jason Morris
 * @authorUrl https://github.com/jsnmrs/bookmarklets
 * @tags accessibility, wcag:2.4.7, wcag:2.4.11, wcag:2.4.12, wcag:2.4.13
 * @pageTest true
 */
(function () {
  "use strict";

  // Inspired by Ian Lloyd's "Show all focus styles" bookmarklet
  // (https://a11y-tools.com/bookmarklets/), which focused each element in
  // turn and copied its computed styles inline. Browsers only apply
  // :focus-visible to script-initiated focus under heuristics a page cannot
  // control, so that approach misses :focus-visible rules. This version
  // clones the page's own :focus, :focus-visible, :focus-within, and :hover
  // rules with each pseudo-class swapped for a marker class of the same
  // specificity, then adds those classes to every focusable element.
  // Repeat activations cycle through modes: focus, hover, both, off.

  const PREFIX = "sfs";
  const STYLE_ID = PREFIX + "-styles";
  const BADGE_ID = PREFIX + "-badge";
  const MODES = ["focus", "hover", "both"];
  const LABELS = {
    focus: "keyboard focus styles",
    hover: "hover styles",
    both: "focus and hover styles",
  };
  const FOCUSABLE =
    'a[href],button,select,input:not([type="hidden"]),textarea,summary,details,area,[tabindex],[contenteditable]:not([contenteditable="false"])';
  const PSEUDO = /:(focus(?:-visible|-within)?|hover)\b/;
  const PSEUDO_ALL = new RegExp(PSEUDO.source, "g");
  const FOCUS_CLASSES = [
    PREFIX + "-focus",
    PREFIX + "-focus-visible",
    PREFIX + "-ua-ring",
  ];
  const FOCUS_ANCESTOR_CLASSES = [PREFIX + "-focus-within"];
  const HOVER_CLASSES = [PREFIX + "-hover"];

  // Emulates the user agent focus ring so elements with no author focus
  // styles still show an indicator. It comes first in the injected sheet so
  // any author focus rule of equal or higher specificity overrides it, as
  // author styles override the user agent stylesheet. The last outline
  // declaration wins where the browser supports it.
  const BASE_CSS =
    "." +
    PREFIX +
    "-ua-ring{outline:1px auto Highlight;outline:1px auto -webkit-focus-ring-color}" +
    "." +
    PREFIX +
    "-focus,." +
    PREFIX +
    "-hover{transition:none!important}";

  function prelude(rule) {
    return rule.cssText.slice(0, rule.cssText.indexOf("{"));
  }

  async function readSheet(sheet, context) {
    try {
      return sheet.cssRules;
    } catch (error) {
      // Cross-origin stylesheets hide their rules. Fetching the file works
      // when the server sends CORS headers.
    }
    try {
      const response = await fetch(sheet.href);
      if (!response.ok) {
        throw new Error(response.status + " " + response.statusText);
      }
      const copy = new CSSStyleSheet();
      copy.replaceSync(await response.text());
      return copy.cssRules;
    } catch (error) {
      context.unreadable.push(sheet.href);
      return null;
    }
  }

  async function collectRules(rules, context) {
    const parts = await Promise.all(
      Array.from(rules, (rule) => collectRule(rule, context))
    );
    return parts.filter(Boolean).join("\n");
  }

  async function collectRule(rule, context) {
    if (rule instanceof CSSImportRule) {
      if (!rule.styleSheet) {
        context.unreadable.push(rule.href);
        return "";
      }
      const rules = await readSheet(rule.styleSheet, context);
      let text = rules ? await collectRules(rules, context) : "";
      if (text && rule.media.mediaText) {
        text = "@media " + rule.media.mediaText + "{" + text + "}";
      }
      if (text && rule.layerName) {
        text = "@layer " + rule.layerName + "{" + text + "}";
      }
      return text;
    }
    if (rule instanceof CSSStyleRule && PSEUDO.test(rule.selectorText)) {
      context.ruleCount += 1;
      return rule.cssText;
    }
    if (!rule.cssRules || rule.cssRules.length === 0) {
      return "";
    }
    // Grouping rules (@media, @supports, @layer, @container) and nested
    // style rules keep their wrapper so cloned rules stay in the same
    // cascade position as the originals.
    const inner = await collectRules(rule.cssRules, context);
    return inner ? prelude(rule) + "{" + inner + "}" : "";
  }

  function addClasses(element, classNames) {
    element.classList.add(...classNames);
  }

  function addAncestorClasses(element, classNames) {
    for (let node = element; node; node = node.parentElement) {
      addClasses(node, classNames);
    }
  }

  function removeAll() {
    document
      .querySelectorAll('[class*="' + PREFIX + '-"]')
      .forEach((element) => {
        Array.from(element.classList)
          .filter((name) => name.startsWith(PREFIX + "-"))
          .forEach((name) => element.classList.remove(name));
      });
    [STYLE_ID, BADGE_ID].forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.remove();
      }
    });
  }

  function showBadge(mode) {
    const next = MODES[MODES.indexOf(mode) + 1];
    const badge = document.createElement("div");
    badge.id = BADGE_ID;
    badge.setAttribute("role", "status");
    badge.textContent =
      "Showing " +
      LABELS[mode] +
      ". Click the bookmarklet again " +
      (next ? "for " + LABELS[next] + "." : "to remove them.");
    badge.style.cssText =
      "position:fixed;right:1rem;bottom:1rem;z-index:2147483647;max-width:20rem;padding:.5rem .75rem;background:#000;color:#fff;font:14px/1.3 system-ui,sans-serif;border-radius:4px;pointer-events:none";
    document.body.appendChild(badge);
  }

  async function apply(mode) {
    removeAll();
    const context = { unreadable: [], ruleCount: 0 };
    const sheetTexts = await Promise.all(
      Array.from(document.styleSheets, async (sheet) => {
        const rules = await readSheet(sheet, context);
        return rules ? collectRules(rules, context) : "";
      })
    );
    const css = sheetTexts
      .filter(Boolean)
      .join("\n")
      .replace(PSEUDO_ALL, "." + PREFIX + "-$1");

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.dataset.mode = mode;
    style.textContent = BASE_CSS + "\n" + css;
    document.head.appendChild(style);

    const focusables = document.querySelectorAll(FOCUSABLE);
    focusables.forEach((element) => {
      if (mode !== "hover") {
        addClasses(element, FOCUS_CLASSES);
        addAncestorClasses(element, FOCUS_ANCESTOR_CLASSES);
      }
      if (mode !== "focus") {
        addAncestorClasses(element, HOVER_CLASSES);
      }
    });
    showBadge(mode);

    console.log(
      "Show focus styles: showing " +
        LABELS[mode] +
        " on " +
        focusables.length +
        " elements from " +
        context.ruleCount +
        " cloned rules."
    );
    if (!style.sheet) {
      console.warn(
        "Show focus styles: the page's Content Security Policy blocked the injected stylesheet."
      );
    }
    if (context.unreadable.length > 0) {
      console.warn(
        "Show focus styles: could not read these stylesheets (no CORS headers), so their rules are not shown:",
        context.unreadable
      );
    }
  }

  const current = document.getElementById(STYLE_ID);
  const next = current
    ? MODES[MODES.indexOf(current.dataset.mode) + 1]
    : MODES[0];
  if (!next) {
    removeAll();
    console.log("Show focus styles: off.");
    return;
  }
  apply(next).catch((error) => {
    console.error("Show focus styles failed:", error);
  });
})();
