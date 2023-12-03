(function () {
  const htmlElement = document.querySelector("html");
  const currentFontSize = htmlElement.style.getPropertyValue("font-size");
  const isZoomed = currentFontSize === "200%";
  const newFontSize = isZoomed ? null : "200%";
  htmlElement.style.setProperty("font-size", newFontSize);
})();
