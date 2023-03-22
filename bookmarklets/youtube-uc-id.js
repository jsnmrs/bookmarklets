var result = document
    .querySelector("link[rel=canonical]")
    .getAttribute("href")
    .replace("https://www.youtube.com/channel/", ""),
  output = document.createElement("p"),
  page = document.getElementsByTagName("body");

if (result) {
  output.textContent = result;
  output.setAttribute(
    "style",
    "position: absolute; top: 0; right: 4px; background-color: #000; color: #01ff70; z-index: 9999; font-size: 16px; font-weight: 400; padding: 3px 9px; outline: 4px solid #01ff70 !important;"
  );
  page[0].prepend(output);
}
