/**
 * @bookmarklet Horizontal scroll
 * @description Alert when a horizontal scrollbar appears
 * @author  Jason Morris
 * @authorUrl https://jasonmorris.com
 * @tags accessibility
 * @auditing true
 * @pageTest true
 */
(function () {
  let prevWidth = document.documentElement.clientWidth;
  let scrollbarAppeared = false;

  function checkForScrollbar() {
    const currentWidth = document.documentElement.clientWidth;
    const hasHorizontalScrollbar =
      document.body.scrollWidth > document.documentElement.clientWidth;

    if (
      hasHorizontalScrollbar &&
      !scrollbarAppeared &&
      currentWidth < prevWidth
    ) {
      console.log(
        "%cHorizontal scrollbar detected!%c\n" +
          "Window width: " +
          currentWidth +
          "px\n" +
          "Content width: " +
          document.body.scrollWidth +
          "px\n" +
          "Overflow: " +
          (document.body.scrollWidth - currentWidth) +
          "px",
        "color: #ff0000; font-size: 14px; font-weight: bold;",
        "color: inherit; font-size: inherit;"
      );
      scrollbarAppeared = true;
    } else if (!hasHorizontalScrollbar) {
      scrollbarAppeared = false;
    }

    prevWidth = currentWidth;
  }

  window.addEventListener("resize", checkForScrollbar);

  // Initial check
  checkForScrollbar();

  console.log(
    "%cHorizontal scrollbar detector activated!%c\nResize the window to test.",
    "color: #4CAF50; font-size: 14px; font-weight: bold;",
    "color: inherit; font-size: inherit;"
  );
})();
