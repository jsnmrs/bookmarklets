// Highlight images without alt attributes

import { node } from "./alt-text-node.js";

var style = document.createElement("style"),
  styleContent = document.createTextNode(node),
  head = document.getElementsByTagName("head");

style.appendChild(styleContent);
head[0].appendChild(style);
