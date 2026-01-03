/**
 * @bookmarklet WAVE report
 * @description Run WebAIM WAVE on the current URL
 * @author WebAIM
 * @authorUrl https://wave.webaim.org/help
 * @tags accessibility, external
 * @pageTest self
 */
void window.open(
  "https://wave.webaim.org/report?url=" + escape(window.location)
);
