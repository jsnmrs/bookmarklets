/**
 * @bookmarklet Save to Internet Archive
 * @description Submit current URL to the Internet Archive
 * @author Jesse Gardner
 * @authorUrl https://plasticmind.com/0s-and-1s/bookmarklet-archive-to-wayback-machine/
 * @tags utility
 * @pageTest self
 */
void window.open("https://web.archive.org/save/" + escape(window.location));
