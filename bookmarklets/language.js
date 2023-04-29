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
