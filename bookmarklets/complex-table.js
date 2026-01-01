/**
 * @bookmarklet Complex table
 * @description Visualize headers and IDs in a complex table
 * @author Jonathan Avila
 * @authorUrl https://labs.levelaccess.com/index.php/Complex_Tables_Favlet
 * @tags accessibility, wcag:1.3.1
 * @pageTest true
 */
(function () {
  var el = document.querySelectorAll("td, th");

  var str;

  var headers = [];

  var sentinel;

  if (el.length > 0) {
    for (var i = 0; i < el.length; i++) {
      if (el.item(i).hasAttribute("headers")) {
        str = el.item(i).getAttribute("headers");

        headers = str.split(" ");

        for (var ii = 0; ii < headers.length; ii++) {
          if (document.getElementById(headers[ii])) {
            sentinel = 1;

            var s = document.createElement("Span");

            var t = document.createTextNode(
              document.getElementById(headers[ii]).textContent + " "
            );

            s.appendChild(t);

            s.style.backgroundColor = "antiqueWhite";

            s.style.color = "black";

            el.item(i).appendChild(s);
          }
        }
      }

      str = "";

      headers = "";

      t = "";
    }

    if (!sentinel) {
      alert("no valid headers found");
    }
  } else {
    alert("No table cells found");
  }
})();
