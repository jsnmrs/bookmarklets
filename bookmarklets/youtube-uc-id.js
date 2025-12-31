/**
 * @bookmarklet Get YouTube UC ID
 * @description Fetches UC ID while on a YouTube profile page
 * @author Jason Morris
 * @authorUrl https://jasonmorris.com
 * @tags diagnostic, bmxfeed, YouTube
 * @pageTest false
 */
var result = document
  .querySelector("link[rel=canonical]")
  .getAttribute("href")
  .replace("https://www.youtube.com/channel/", "");

if (result) {
  prompt("UC ID:", result);
}
