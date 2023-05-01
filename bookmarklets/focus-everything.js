var allElements = document.querySelectorAll("body *");
Array.from(allElements).forEach((el) => {
  el.setAttribute("tabindex", "0");
});
