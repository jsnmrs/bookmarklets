(function () {
  var d = document,
    w = window,
    b = d.body,
    s,
    p,
    y = "top",
    x = "left";
  if (w["vpbkmklt"]) {
    b.removeChild(d.getElementById("vpbkmklt1"));
    b.removeChild(d.getElementById("vpbkmklt2"));
    w.vpbkmklt = 0;
    return;
  }
  s = d.createElement("style");
  s.setAttribute("id", "vpbkmklt1");
  s.innerText = ".foo{ content:bar;}";
  b.appendChild(s);
  s = d.createElement("script");
  s.setAttribute("id", "vpbkmklt2");
  s.innerText =
    "var u=undefined,d=document,w=window,b=d.body;s=d.getElementById('vpbkmklt1'),or=function(){b.setAttribute('data-vp','width:  '+w.innerWidth+'px\\nheight: '+w.innerHeight+'px');},dc=function(e){   x=(e!==u && e.x/w.innerWidth > .5)?'right':'left';   y=(e!==u && e.y/w.innerHeight > .5)?'bottom':'top';if(e!==u ){console.log(e.x/w.innerWidth);}  s.innerText='body:before{'+y+':5px;'+x+':5px;content:attr(data-vp);background:#000;color:#01ff70;white-space:pre;display:inline-block;padding:5px;position:fixed;opacity:0.95;-webkit-font-smoothing:subpixel-antialiased;font:11px/1.4 monospace;z-index:9999 !important;}'; };";
  b.appendChild(s);
  w.vpbkmklt = 1;
  w.onresize = or;
  d.ondblclick = dc;
  or();
  dc();
})();
void 0;
