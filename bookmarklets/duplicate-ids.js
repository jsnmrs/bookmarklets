function runDuplicateIds() {
  var clone = document.cloneNode(true);
  var col = clone.querySelectorAll("[id]");

  var results = [];
  find_duplicate_ids(col, results);
  var strResults = results.length + " elements with duplicate ids" + "\n";

  results.forEach(function (item) {
    //item.style.border = "thin solid magenta";
    item.innerHTML = "";
    strResults = strResults + item.outerHTML + "\n";
  });
  alert(strResults);
}

function find_duplicate_ids(arIDs, results) {
  arIDs.forEach(function (item) {
    var ids = document.querySelectorAll('[id="' + item.id + '"]');
    if (ids.length > 1) results.push(item);
  });
}
runDuplicateIds();
