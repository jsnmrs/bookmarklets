/**
 * @bookmarklet Lighthouse report
 * @description Run a Lighthouse scan on current URL (regardless of broswer)
 * @author Jeremy Keith
 * @authorUrl https://adactio.com/journal/16523
 * @tags diagnostic, external
 * @pageTest self
 */
void window.open(
  "https://googlechrome.github.io/lighthouse/viewer/?psiurl=" +
    escape(window.location) +
    "&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa"
);
