// Remove onpaste attributes from password inputs – fixes security theatre of preventing paste
document
  .querySelectorAll("input[type=password]")
  // eslint-disable-next-line strict
  .forEach(function (el) {
    return el.removeAttribute("onpaste");
  });
