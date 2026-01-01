/**
 * @bookmarklet Validate
 * @description Validate HTML of DOM
 * @author Deque
 * @authorUrl https://dequeuniversity.com/validator
 * @tags diagnostic, external, wcag:4.1.1
 * @auditing true
 * @pageTest self
 */
(function () {
  (function () {
    var doctypeNode = document.doctype;
    var doctypeHtml =
      "<!DOCTYPE " +
      doctypeNode.name +
      (doctypeNode.publicId ? ' PUBLIC "' + doctypeNode.publicId + '"' : "") +
      (!doctypeNode.publicId && doctypeNode.systemId ? " SYSTEM" : "") +
      (doctypeNode.systemId ? ' "' + doctypeNode.systemId + '"' : "") +
      ">";
    var htmlWrapper = document.documentElement.outerHTML;
    var allContent = doctypeHtml + htmlWrapper;
    var validatorForm = document.getElementById(
      "deque-w3c-validator-bookmarklet"
    );
    if (validatorForm) {
      validatorForm.remove();
    }
    var form = document.createElement("form");
    form.id = "deque-w3c-validator-bookmarklet";
    form.method = "POST";
    form.action =
      "https://validator.w3.org/nu/?showsource=yes&nocache=" + Math.random();
    form.target = "_blank";
    form.enctype = "multipart/form-data";
    var textarea = document.createElement("textarea");
    textarea.name = "content";
    textarea.value = allContent;
    form.appendChild(textarea);
    document.body.appendChild(form);
    form.submit();
    validatorForm = document.getElementById("deque-w3c-validator-bookmarklet");
    if (validatorForm) {
      validatorForm.remove();
    }
  })();
})();
