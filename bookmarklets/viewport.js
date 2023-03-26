void (function (d) {
  if (
    self != top ||
    (d.getElementById("toolbar") &&
      d.getElementById("toolbar").getAttribute("data-resizer"))
  )
    return false;
  d.write(
    '<!DOCTYPE HTML><html style="opacity:0;"><head><meta charset="utf-8"/></head><body><a data-viewport="240x240" data-icon="handy">Tiny</a><a data-viewport="320x480" data-icon="mobile">Small</a><a data-viewport="768x1024" data-icon="tablet">Medium</a><a data-viewport="1024x768" data-icon="display">Large</a><a data-viewport="1280x800" data-icon="notebook">Wide</a><a data-viewport="2560x1600" data-icon="display">Very large</a><script src="https://lab.maltewassermann.com/viewport-resizer/resizer.min.js"></script></body></html>'
  );
})(document);
