for (var i = 0; i < document.styleSheets.length; i++) {
  void (document.styleSheets.item(i).disabled = true);
}
var el = document.getElementsByTagName("*");
for (i = 0; i < el.length; i++) {
  void (el[i].style.cssText = "");
}
