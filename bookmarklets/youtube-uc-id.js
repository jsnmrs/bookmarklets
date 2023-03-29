var result = document
  .querySelector("link[rel=canonical]")
  .getAttribute("href")
  .replace("https://www.youtube.com/channel/", "");

if (result) {
  prompt("UC ID:", result);
}
