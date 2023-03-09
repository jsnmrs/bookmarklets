// Fetches UC ID from YouTube profile page

// Get UC ID from canonical link in <head>
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
    "position: absolute; top: 0; left: 0; font-size: 2rem; z-index: 9999; color: #fff; padding: 1rem; background-color: #000; border: 0.25rem solid #f00;"
  );
  page[0].prepend(output);
}
