(function () {
  var ellipsisFound = false;

  // Helper function to check for "text-overflow: ellipsis" and outline the element
  function checkAndOutline(element) {
    if (element.style.cssText.indexOf("text-overflow: ellipsis") !== -1) {
      ellipsisFound = true;
      element.style.outline = "red solid 2px";
    }
  }

  // Check stylesheets for "text-overflow: ellipsis"
  var stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  for (var i = 0; i < stylesheets.length; i++) {
    var sheet = stylesheets[i];
    var rules = sheet.sheet.cssRules;

    for (var j = 0; j < rules.length; j++) {
      var rule = rules[j];
      if (rule.selectorText) {
        var elements = document.querySelectorAll(rule.selectorText);
        for (var k = 0; k < elements.length; k++) {
          checkAndOutline(elements[k]);
        }
      }
    }
  }

  // Check style tags for "text-overflow: ellipsis"
  var styleTags = document.querySelectorAll("style");
  for (i = 0; i < styleTags.length; i++) {
    var styleText = styleTags[i].textContent;
    rules = styleText.match(/([^{}]+)\s*\{(.*?)\}\s*/g);

    if (rules) {
      for (j = 0; j < rules.length; j++) {
        rule = rules[j].split("{");
        var selector = rule[0].trim();
        var styles = rule[1].trim();

        if (selector && styles) {
          elements = document.querySelectorAll(selector);
          for (k = 0; k < elements.length; k++) {
            if (styles.indexOf("text-overflow:ellipsis") !== -1) {
              checkAndOutline(elements[k]);
            }
          }
        }
      }
    }
  }

  // Check inline styles for "text-overflow: ellipsis"
  elements = document.querySelectorAll("*");
  for (i = 0; i < elements.length; i++) {
    checkAndOutline(elements[i]);
  }

  // Show an alert if "text-overflow: ellipsis" was found
  if (ellipsisFound) {
    alert(
      'This page uses "text-overflow: ellipsis" on some elements. Outlined in red.'
    );
  }
})();
