(function () {
  function checkRules(sheet) {
    var rules = sheet.cssRules || sheet.rules;
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      if (rule.style && rule.style.textOverflow === "ellipsis") {
        var elements = document.querySelectorAll(rule.selectorText);
        elements.forEach(function (element) {
          element.style.border = "5px solid red";
        });
      }
    }
  }

  var styles = document.querySelectorAll("style");
  styles.forEach(function (style) {
    checkRules(style.sheet);
  });

  var links = document.querySelectorAll('link[rel="stylesheet"]');
  links.forEach(function (link) {
    var sheet = link.sheet;
    if (sheet) {
      checkRules(sheet);
    }
  });

  var elements = document.querySelectorAll("*");
  elements.forEach(function (element) {
    if (element.style.textOverflow === "ellipsis") {
      element.style.border = "5px solid red";
    }
  });
})();
