/* eslint-disable no-undef, no-unused-vars */
(function () {
  function showAllAutoCompleteCandidates() {
    !(function () {
      const o = document.querySelectorAll("[aria-hidden=true]");
      Array.from(o).forEach(function (o) {
        o.remove();
      });
    })();
    const o = document.createElement("style");
    (o.innerHTML =
      ".auto-complete-candidate {outline:3px dotted orange;}.auto-complete-required {outline:3px solid red;outline-offset:2px;box-shadow:0 0 0 8px white}"),
      document.querySelector("head").append(o);
    const e = document.querySelectorAll(
      "input:not([autocomplete]):not([type=radio]):not([type=checkbox]):not([type=hidden]):not([type=submit]),select:not([autocomplete])"
    );
    console.clear();
    let n = "",
      t = "",
      a = "",
      i = "",
      l = "",
      p = 0,
      r = "";
    (r += '<option value="">Pick an autocomplete value...</option>\n'),
      (r += '<optgroup label="Title">\n'),
      (r +=
        '<option value="honorific-prefix">honorific-prefix  ----  prefix, title e.g. Mr/Mrs</option>\n'),
      (r +=
        '<option value="honorific-suffix">honorific-suffix  ----  suffix e.g. Jnr/Esq</option>\n'),
      (r += '<optgroup label="Name/Personal Details">\n'),
      (r += '<option value="name">name  ----  full name</option>\n'),
      (r +=
        '<option value="given-name">given-name  ----  first-name, forename</option>\n'),
      (r +=
        '<option value="additional-name">additional-name  ----  middle name</option>\n'),
      (r +=
        '<option value="family-name">family-name  ----  last name, surname</option>\n'),
      (r +=
        '<option value="nickname">nickname  ----  screen name, handle</option>\n'),
      (r +=
        '<option value="username">username  ----  login name, account name</option>\n'),
      (r += '<option value="sex">sex  ----  gender</option>\n'),
      (r += '<option value="language">language</option>\n'),
      (r += '<optgroup label="Address">\n'),
      (r +=
        '<option value="street-address">street-address  ----  full address, postal address</option>\n'),
      (r += '<option value="address-line1">address-line1</option>\n'),
      (r += '<option value="address-line2">address-line2</option>\n'),
      (r += '<option value="address-line3">address-line3</option>\n'),
      (r += '<option value="address-level4">address-level4</option>\n'),
      (r += '<option value="address-level3">address-level3</option>\n'),
      (r +=
        '<option value="address-level2">address-level2  ----  city, town, village</option>\n'),
      (r +=
        '<option value="address-level1">address-level1  ----  state, post-town, province, canton</option>\n'),
      (r +=
        '<option value="country">country  ----  country code, territory code</option>\n'),
      (r += '<option value="country-name">country-name</option>\n'),
      (r +=
        '<option value="postal-code">postal-code  ----  post code, zip code, cedex code</option>\n'),
      (r += '<optgroup label="Telephone">\n'),
      (r += '<option value="tel">tel  ----  full telephone number</option>\n'),
      (r += '<option value="tel-country-code">tel-country-code</option>\n'),
      (r += '<option value="tel-national">tel-national</option>\n'),
      (r += '<option value="tel-area-code">tel-area-code</option>\n'),
      (r += '<option value="tel-local">tel-local</option>\n'),
      (r += '<option value="tel-local-prefix">tel-local-prefix</option>\n'),
      (r += '<option value="tel-local-suffix">tel-local-suffix</option>\n'),
      (r += '<option value="tel-extension">tel-extension</option>\n'),
      (r += '<optgroup label="Passwords">\n'),
      (r += '<option value="new-password">new-password</option>\n'),
      (r += '<option value="current-password">current-password</option>\n'),
      (r +=
        '<option value="one-time-code">one-time-code  ----  one-time-password, otp, otc</option>\n'),
      (r += '<optgroup label="Credit Card/Financial">\n'),
      (r +=
        '<option value="cc-name">cc-name  ----  credit card full name</option>\n'),
      (r +=
        '<option value="cc-given-name">cc-given-name  ----  credit card first name</option>\n'),
      (r +=
        '<option value="cc-additional-name">cc-additional-name  ----  credit card middle-name</option>\n'),
      (r +=
        '<option value="cc-family-name">cc-family-name  ----  credit card surname</option>\n'),
      (r += '<option value="cc-number">cc-number</option>\n'),
      (r +=
        '<option value="cc-exp">cc-exp  ----  credit card expiry date</option>\n'),
      (r +=
        '<option value="cc-exp-month">cc-exp-month  ----  credit card expiry month</option>\n'),
      (r +=
        '<option value="cc-exp-year">cc-exp-year  ----  credit card expiry year</option>\n'),
      (r +=
        '<option value="cc-csc">cc-csc  ----  credit card cvc 3-digit code</option>\n'),
      (r +=
        '<option value="cc-type">cc-type  ----  credit card type</option>\n'),
      (r +=
        '<option value="transaction-currency">transaction-currency</option>\n'),
      (r += '<option value="transaction-amount">transaction-amount</option>\n'),
      (r += '<optgroup label="Date of Birth">\n'),
      (r += '<option value="bday">bday  ----  birthday</option>\n'),
      (r += '<option value="bday-day">bday-day  ----  birthday day</option>\n'),
      (r +=
        '<option value="bday-month">bday-month  ----  birthday month</option>\n'),
      (r +=
        '<option value="bday-year">bday-year  ----  birthday year</option>\n'),
      (r += '<optgroup label="Other">\n'),
      (r +=
        '<option value="organization-title">organization-title  ----  job title</option>\n'),
      (r +=
        '<option value="organization">organization  ----  company-name, company</option>\n'),
      (r += '<option value="email">email</option>\n'),
      (r += '<option value="url">url  ----  web address/homepage</option>\n'),
      (r +=
        '<option value="photo">photo  ----  image, avatar, icon</option>\n'),
      (r += '<option value="impp">impp</option>\n');
    var c = 0;
    Array.from(e).forEach(function (o) {
      (n = o.outerHTML),
        (i = o.getAttribute("id")),
        (fieldName = o.getAttribute("name")),
        null === i &&
          (null === fieldName
            ? (c++,
              o.setAttribute("id", "IDDYNAMICALLYMADEUP_" + c),
              (i = "IDDYNAMICALLYMADEUP_" + c))
            : (o.setAttribute("id", "IDFROMNAME_" + o.getAttribute("name")),
              (i = "IDFROMNAME_" + o.getAttribute("name")))),
        o.classList.add("auto-complete-candidate");
      const e = document.createElement("DIV");
      var t, a;
      (e.innerHTML =
        '<select class="autoCompleteSuggestion" data-field-id="' +
        i +
        '" aria-label="autocomplete suggestion for ' +
        i +
        '">\n<option value="">Pick an autocomplete value...</option>\n<optgroup label="Title">\n<option value="honorific-prefix">honorific-prefix  ----  prefix, title e.g. Mr/Mrs</option>\n<option value="honorific-suffix">honorific-suffix  ----  suffix e.g. Jnr/Esq</option>\n<optgroup label="Name/Personal Details">\n<option value="name">name  ----  full name</option>\n<option value="given-name">given-name  ----  first-name, forename</option>\n<option value="additional-name">additional-name  ----  middle name</option>\n<option value="family-name">family-name  ----  last name, surname</option>\n<option value="nickname">nickname  ----  screen name, handle</option>\n<option value="username">username  ----  login name, account name</option>\n<option value="sex">sex  ----  gender</option>\n<option value="language">language</option>\n<optgroup label="Address">\n<option value="street-address">street-address  ----  full address, postal address</option>\n<option value="address-line1">address-line1</option>\n<option value="address-line2">address-line2</option>\n<option value="address-line3">address-line3</option>\n<option value="address-level4">address-level4</option>\n<option value="address-level3">address-level3</option>\n<option value="address-level2">address-level2  ----  city, town, village</option>\n<option value="address-level1">address-level1  ----  state, post-town, province, canton</option>\n<option value="country">country  ----  country code, territory code</option>\n<option value="country-name">country-name</option>\n<option value="postal-code">postal-code  ----  post code, zip code, cedex code</option>\n<optgroup label="Telephone">\n<option value="tel">tel  ----  full telephone number</option>\n<option value="tel-country-code">tel-country-code</option>\n<option value="tel-national">tel-national</option>\n<option value="tel-area-code">tel-area-code</option>\n<option value="tel-local">tel-local</option>\n<option value="tel-local-prefix">tel-local-prefix</option>\n<option value="tel-local-suffix">tel-local-suffix</option>\n<option value="tel-extension">tel-extension</option>\n<optgroup label="Passwords">\n<option value="new-password">new-password</option>\n<option value="current-password">current-password</option>\n<option value="one-time-code">one-time-code  ----  one-time-password, otp, otc</option>\n<optgroup label="Credit Card/Financial">\n<option value="cc-name">cc-name  ----  credit card full name</option>\n<option value="cc-given-name">cc-given-name  ----  credit card first name</option>\n<option value="cc-additional-name">cc-additional-name  ----  credit card middle-name</option>\n<option value="cc-family-name">cc-family-name  ----  credit card surname</option>\n<option value="cc-number">cc-number</option>\n<option value="cc-exp">cc-exp  ----  credit card expiry date</option>\n<option value="cc-exp-month">cc-exp-month  ----  credit card expiry month</option>\n<option value="cc-exp-year">cc-exp-year  ----  credit card expiry year</option>\n<option value="cc-csc">cc-csc  ----  credit card cvc 3-digit code</option>\n<option value="cc-type">cc-type  ----  credit card type</option>\n<option value="transaction-currency">transaction-currency</option>\n<option value="transaction-amount">transaction-amount</option>\n<optgroup label="Date of Birth">\n<option value="bday">bday  ----  birthday</option>\n<option value="bday-day">bday-day  ----  birthday day</option>\n<option value="bday-month">bday-month  ----  birthday month</option>\n<option value="bday-year">bday-year  ----  birthday year</option>\n<optgroup label="Other">\n<option value="organization-title">organization-title  ----  job title</option>\n<option value="organization">organization  ----  company-name, company</option>\n<option value="email">email</option>\n<option value="url">url  ----  web address/homepage</option>\n<option value="photo">photo  ----  image, avatar, icon</option>\n<option value="impp">impp</option>\n</select>\n'),
        e.classList.add("tempDiv"),
        (e.style = "margin:5px 0 20px 0"),
        (t = e),
        (a = o).parentNode.insertBefore(t, a.nextSibling),
        p++;
    });
    const d = document.querySelectorAll(".autoCompleteSuggestion");
    let u = "";
    Array.from(d).forEach(function (o) {
      o.addEventListener("change", function () {
        (t = ""),
          (a = ""),
          (l = o[o.selectedIndex].value),
          (u = o.getAttribute("data-field-id")),
          document
            .querySelector("#" + u)
            .classList.add("auto-complete-required"),
          document.querySelector("#" + u).setAttribute("autocomplete", l);
        const e = document.querySelectorAll(".auto-complete-required");
        Array.from(e).forEach(function (o) {
          (t +=
            "* " +
            o.getAttribute("id") +
            ": " +
            o.getAttribute("autocomplete") +
            "\n"),
            (a += o.outerHTML + "\n");
        }),
          console.clear(),
          (a = (a = (a = a
            .split('class="amended"')
            .join("")
            .split(" amended")
            .join("")
            .split(' class=""')
            .join(""))
            .split("auto-complete-candidate auto-complete-required")
            .join(""))
            .split(' class=""')
            .join("")),
          console.log(
            "The following " +
              p +
              " fields require an autocomplete attribute as specified:\n\n" +
              t +
              "\nFull details:\n\n{code}\n" +
              a +
              "{code}"
          );
      });
    });
    const s = document.createElement("button");
    s.setAttribute("type", "button"),
      (s.innerHTML = "Prep for screenshot!"),
      (s.style =
        "position:fixed;z-index:10000;top:1em;right:1em;background:red;color:white;font-weight:bold;"),
      document.querySelector("body").append(s),
      s.addEventListener("click", function () {
        s.remove();
        const o = document.querySelectorAll(".auto-complete-candidate");
        Array.from(o).forEach(function (o) {
          o.classList.remove("auto-complete-candidate");
        });
        const e = document.querySelectorAll(".tempDiv");
        Array.from(e).forEach(function (o) {
          o.remove();
        });
      });
  }
  showAllAutoCompleteCandidates();
})();
