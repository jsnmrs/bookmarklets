/**
 * @bookmarklet Duplicate IDs
 * @description Display duplicated ID values
 * @author Jonathan Avila
 * @authorUrl https://github.com/mraccess77/mraccess77.github.io/blob/master/favlets/duplicateIds.js
 * @tags accessibility, wcag:4.1.1
 * @pageTest true
 */
function runDuplicateIds() {
  var clone = document.cloneNode(true);
  var col = clone.querySelectorAll("[id]");

  var results = [];
  find_duplicate_ids(col, results);

  if (results.length === 0) {
    alert("Duplicate IDs: no duplicate ids found on this page.");
    return;
  }

  console.group("Duplicate IDs");
  results.forEach(function (item) {
    //item.style.border = "thin solid magenta";
    item.innerHTML = "";
    console.warn(
      item.outerHTML,
      document.querySelectorAll('[id="' + item.id + '"]')
    );
  });
  console.groupEnd();
  alert(
    "Duplicate IDs: " +
      results.length +
      " elements share an id with another element. See the browser console for details."
  );
}

function find_duplicate_ids(arIDs, results) {
  arIDs.forEach(function (item) {
    var ids = document.querySelectorAll('[id="' + item.id + '"]');
    if (ids.length > 1) results.push(item);
  });
}
runDuplicateIds();
