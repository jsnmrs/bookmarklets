/**
 * @bookmarklet Focus everything
 * @description A technique for testing 1.3.2 Meaningful Sequence a tab path visualizer
 * @author Ian Lloyd
 * @authorUrl https://a11y-tools.com/bookmarklets/
 * @tags 1.3.2 Meaningful Sequence (A)
 * @auditing true
 * @pageTest true
 */
document.querySelectorAll("body *").forEach(function (el) {
  el.setAttribute("tabindex", "0");
});
