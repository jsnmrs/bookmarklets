/**
 * @bookmarklet Placeholder contrast checker
 * @description Measure contrast of placeholder text
 * @author  Jason Morris
 * @authorUrl https://jasonmorris.com
 * @tags accessibility, wcag:1.4.3
 * @auditing true
 * @pageTest true
 */
javascript: (function () {
  // Detect WebKit browsers (Safari, iOS browsers)
  let isWebKit =
    navigator.userAgent.indexOf("AppleWebKit") !== -1 &&
    navigator.userAgent.indexOf("Chrome") === -1 &&
    navigator.userAgent.indexOf("Chromium") === -1;

  // Helper function to convert RGB to relative luminance
  function getLuminance(r, g, b) {
    let [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  // Helper function to calculate contrast ratio
  function getContrastRatio(l1, l2) {
    let lighter = Math.max(l1, l2);
    let darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  // Helper function to convert RGB string to array
  function rgbToArray(rgb) {
    return rgb.match(/\d+/g).map(Number);
  }

  // Helper function to get computed color for ::placeholder
  function getPlaceholderColor(element) {
    const style = document.createElement("style");
    const id = "temp-" + Math.random().toString(36).substr(2, 9);
    element.classList.add(id);

    style.textContent = `.${id}::placeholder { background-color: inherit; }`;
    document.head.appendChild(style);

    const placeholderStyles = window.getComputedStyle(element, "::placeholder");
    const color = placeholderStyles.color;

    element.classList.remove(id);
    style.remove();

    return color;
  }

  // Find all input and textarea elements
  let elements = document.querySelectorAll(
    "input[placeholder], textarea[placeholder]"
  );

  console.group("Placeholder Contrast Analysis");
  if (isWebKit) {
    console.warn(
      "⚠️ WebKit browsers (Safari, iOS) cannot accurately compute placeholder text colors."
    );
    console.log(
      "Found " + elements.length + " form elements with placeholders."
    );
    console.groupEnd();
    return;
  }
  console.log("Analyzing " + elements.length + " form elements...\n");

  elements.forEach((el, index) => {
    let styles = window.getComputedStyle(el);
    let placeholderColor = getPlaceholderColor(el);
    let backgroundColor = styles.backgroundColor;

    let textRGB = rgbToArray(placeholderColor);
    let bgRGB = rgbToArray(backgroundColor);

    let textLuminance = getLuminance(...textRGB);
    let bgLuminance = getLuminance(...bgRGB);
    let ratio = getContrastRatio(textLuminance, bgLuminance);

    let selector =
      el.tagName.toLowerCase() +
      (el.id ? "#" + el.id : "") +
      (el.className ? "." + el.className.split(" ").join(".") : "") +
      "::placeholder";

    console.group(`Element ${index + 1}: ${selector}`);
    console.log("Placeholder Text:", el.placeholder);
    console.log("Placeholder Color:", placeholderColor);
    console.log("Background:", backgroundColor);
    ratio < 4.5
      ? console.log("🛑 Contrast Ratio:", ratio.toFixed(2))
      : console.log("✅ Contrast Ratio:", ratio.toFixed(2));
    console.groupEnd();

    el.style.outline = ratio < 4.5 ? "5px solid #ff0000" : "2px solid#00ff00";
  });

  console.groupEnd();
})();
