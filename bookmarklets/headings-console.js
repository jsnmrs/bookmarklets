/**
 * @bookmarklet Document outline in console
 * @description Display level of all page headings in console
 * @author Mu-An Chiou
 * @authorUrl https://github.com/muan/headings
 * @tags accessibility, wcag:1.3.1, wcag:2.4.6
 * @auditing true
 * @pageTest self
 */
let map = "";

for (const heading of document.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
  const text = getAccesibleName(heading);
  if (
    screenaderVisible(heading) &&
    (heading.offsetHeight > 0 || heading.offsetWidth) &&
    text
  ) {
    // visible
    const n = parseInt(heading.tagName.match(/\d/)[0]);
    map +=
      new Array((n - 1) * 2).fill("-").join("") +
      heading.tagName.toLowerCase() +
      ": " +
      text +
      "\n";
  }
}
console.log(map);

function getAccesibleName(element) {
  const labelledby = element.getAttribute("aria-labelledby");
  const name =
    element.getAttribute("alt") ||
    element.getAttribute("aria-label") ||
    (labelledby && getText(document.getElementById(labelledby))) ||
    getText(element);
  return name.trim();
}

function getText(heading) {
  let text = "";
  for (const node of heading.childNodes) {
    text +=
      node instanceof HTMLElement
        ? getAccesibleName(node)
        : node.textContent || "";
  }

  return text;
}

function screenaderVisible(element) {
  return !element.closest('[aria-hidden=""], [aria-hidden="true"]');
}
