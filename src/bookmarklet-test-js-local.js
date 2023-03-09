// Test for local JS support via bookmark

var script = document.createElement("script"),
  scriptContent = document.createTextNode(
    'alert("Your browser is not blocking JavaScript in favorites/bookmarks");'
  ),
  head = document.getElementsByTagName("head");

script.appendChild(scriptContent);
head[0].appendChild(script);
