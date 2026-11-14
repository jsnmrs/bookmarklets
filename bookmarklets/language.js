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
  parts = page ? el.length - 1 : el.length,
  msg = "Language of page/parts: ";
if (!page) {
  msg += "the page is missing a lang attribute. ";
} else {
  msg += 'the page lang attribute is "' + page.getAttribute("lang") + '". ';
}
msg +=
  parts +
  (parts === 1 ? " other element sets" : " other elements set") +
  " a lang attribute.";
if (el.length > 0) {
  msg += " See the browser console for details.";
  console.group("Language of page/parts");
  for (var i = 0; i < el.length; i++) {
    console.log(
      el[i].tagName.toLowerCase() +
        ' has lang="' +
        el[i].getAttribute("lang") +
        '"',
      el[i]
    );
  }
  console.groupEnd();
}

alert(msg);
