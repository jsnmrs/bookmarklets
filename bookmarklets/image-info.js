/**
 * @bookmarklet Image info
 * @description Display image alt, role, title, aria-label, aria-labelledby
 * @author Jonathan Avila
 * @authorUrl https://github.com/mraccess77/mraccess77.github.io/blob/master/favlets/images.js
 * @tags 1.1.1 Non-text Content (A), 1.4.5 Images of Text (A), 2.4.4 Link Purpose (In Context) (A)
 * @pageTest true
 */
// *********************************** //
function traverseFrames(doc, _framesObj) {
  // check for alt, aria-label,title, or aria-labelledby attribute in current document and then check it's frames

  displayAlt(doc, _framesObj);

  // go through for each frame's document if there are any frames
  var frametypes = ["frame", "iframe"];
  for (var i = 0; i < frametypes.length; i++) {
    var myframes = doc.getElementsByTagName(frametypes[i]);
    for (var z = 0; z < myframes.length; z++) {
      try {
        traverseFrames(myframes[z].contentWindow.document, _framesObj);
      } catch (e) {
        //errors are stored in _framesObj too
        _framesObj.extFrameSrcList =
          _framesObj.extFrameSrcList + "\n" + myframes[z].src;
        _framesObj.frameErrorCount = _framesObj.frameErrorCount + 1;
      }
    }
  }
  return _framesObj;
}

function displayAlt(doc, _framesObj) {
  var el = doc.querySelectorAll("img,*[role='image']");
  _framesObj.foundCount = _framesObj.foundCount + el.length;
  var str;
  var headers = [];
  var sentinel;
  var s;
  var t;

  if (el.length > 0) {
    for (var i = 0; i < el.length; i++) {
      s = doc.createElement("span");
      if (el.item(i).getAttribute("alt"))
        t = 'alt="' + el.item(i).getAttribute("alt") + '" ';
      else if (el.item(i).hasAttribute("alt")) t = 'alt="" ';
      else t = "NO alt attribute! ";
      if (el.item(i).getAttribute("title"))
        t = t + 'title="' + el.item(i).getAttribute("title") + '" ';
      if (el.item(i).getAttribute("aria-label"))
        t = t + 'aria-label="' + el.item(i).getAttribute("aria-label") + '" ';
      if (el.item(i).getAttribute("aria-labelledby"))
        t =
          t +
          'aria-labelledby="' +
          el.item(i).getAttribute("aria-labelledby") +
          '" → ' +
          doc.getElementById(el.item(i).getAttribute("aria-labelledby"))
            .innerHTML;
      s.appendChild(doc.createTextNode(t));
      s.style.backgroundColor = "cyan";
      s.style.border = "thin solid black";
      s.style.color = "black";
      s.style.fontSize = "small";
      s.zIndex = "99999";
      el.item(i).style.border = "thin dotted cyan";
      el.item(i).parentNode.insertBefore(s, el.item(i));
    }
  }
}

// *********************************** //
function run(doc) {
  // initialize variables
  // our SR object
  var _framesObj = [];

  // number of element with class name of sr-only found
  _framesObj.foundCount = 0;

  // Message and count of frames outside domain for messaging purposes
  _framesObj.extFrameSrcList = "";
  _framesObj.frameErrorCount = 0;
  // End initilization

  // Recurse through document and frames
  _framesObj = traverseFrames(doc, _framesObj);

  // Display alert dialog with message with count of found properties
  alert(
    _framesObj.foundCount +
      " element(s) with alt, title, aria-label, aria-labelledby attributes found. "
  );
}

run(document);
