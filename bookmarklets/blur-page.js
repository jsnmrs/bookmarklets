(function () {
  document.body.setAttribute(
    "style",
    'filter:url("data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="blur"><feGaussianBlur stdDeviation="10" /></filter></svg>#blur"); -webkit-filter:blur(10px); filter:blur(10px);'
  );
})();
