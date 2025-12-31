/**
 * @bookmarklet WAVE report
 * @description Run WebAIM WAVE on the current URL
 * @author WebAIM
 * @authorUrl https://wave.webaim.org/help
 * @tags 1.1.1 Non-text Content (A), 1.3.1 Info and Relationships (A), 1.4.3 Contrast (Minimum) (AA), 2.1.1 Keyboard (A), 2.2.1 Timing Adjustable (A), 2.2.2 Pause, Stop, Hide (A), 2.4.1 Bypass Blocks (A), 2.4.2 Page Titled (A), 2.4.4 Link Purpose (In Context) (A), 2.4.6 Headings and Labels (AA), 3.1.1 Language of Page (A), 3.3.2 Labels or Instructions (A), 4.1.2 Name, Role, Value (A)
 * @pageTest false
 */
void window.open(
  "https://wave.webaim.org/report?url=" + escape(window.location)
);
