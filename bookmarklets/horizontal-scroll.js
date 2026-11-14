/**
 * @bookmarklet Horizontal scroll
 * @description Alert when a horizontal scrollbar appears
 * @author  Jason Morris
 * @authorUrl https://jasonmorris.com
 * @tags accessibility, wcag:1.4.10
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
      console.warn(
        "Horizontal scroll: horizontal scrollbar detected. Window width " +
          currentWidth +
          "px, content width " +
          document.body.scrollWidth +
          "px, overflow " +
          (document.body.scrollWidth - currentWidth) +
          "px."
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
    "Horizontal scroll: detector activated. Resize the window to test."
  );
})();
