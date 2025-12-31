/**
 * @bookmarklet Autocomplete
 * @description Display all fields with autocomplete
 * @author Rachele DiTullio
 * @authorUrl https://racheleditullio.com/blog/2023/11/autocomplete-accessibility-bookmarklet/
 * @tags 1.3.5 Identify Input Purpose (AA)
 * @auditing true
 * @pageTest true
 */
(function () {
  let divs = document.querySelectorAll(".autocomplete-info");
  if (divs.length > 0) {
    divs.forEach((div) => {
      div.remove();
    });
  } else {
    let inputs = document.querySelectorAll("input[autocomplete]");
    if (inputs.length > 0) {
      inputs.forEach((input) => {
        let autocomplete = input.getAttribute("autocomplete");
        let rect = input.getBoundingClientRect();
        let div = document.createElement("div");
        div.classList.add("autocomplete-info");
        div.style.position = "absolute";
        div.style.top = window.scrollY + rect.top + "px";
        div.style.left = window.scrollX + rect.left + "px";
        div.style.backgroundColor = "yellow";
        div.style.color = "black";
        div.style.padding = "5px";
        div.style.border = "2px solid #000";
        div.style.zIndex = "9999";
        div.innerHTML = `autocomplete=<strong>${autocomplete}</strong>`;
        document.body.appendChild(div);
      });
    } else {
      alert("No input fields with autocomplete attribute found on this page.");
    }
  }
})();
