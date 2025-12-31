/**
 * @bookmarklet User Agent
 * @description Display current user agent string
 * @author Thomas Orlita
 * @authorUrl https://github.com/ThomasOrlita/awesome-bookmarklets#get-user-agent
 * @tags diagnostic
 * @pageTest self
 */
void (() => {
  prompt("User agent:", navigator.userAgent);
})();
