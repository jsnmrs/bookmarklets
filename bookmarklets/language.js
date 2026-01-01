/**
 * @bookmarklet Language of page/parts
 * @description Display all lang attributes on page
 * @author Jason Morris
 * @authorUrl https://jasonmorris.com
 * @tags accessibility, wcag:3.1.1, wcag:3.1.2
 * @auditing true
 * @pageTest true
 */
var el = document.querySelectorAll("[lang]"),
  page = document.querySelector("html[lang]"),
  msg = "";
if (!page) {
  msg += "Page is missing lang attribute\n";
} else {
  msg += "The page lang attribute is " + page.getAttribute("lang") + "\n";
}
for (var i = 0; i < el.length; i++) {
  msg += el[i].tagName + " tag has " + el[i].getAttribute("lang") + "\n";
}

alert(msg);
