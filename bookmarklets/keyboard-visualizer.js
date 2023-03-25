const visualizerStyles = `
.sh-keyboard-viz {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50%;
  max-width: 300px;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  border: 2px solid white;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.75);
  font-size: 18px;
  font-weight: bold;
  font-family: sans-serif;
  z-index: 999999;
  max-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
}

.sh-keyboard-viz ul {
  flex: 1 1 auto;
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
}

.sh-keyboard-viz li {
  margin-bottom: 8px;
}

.sh-keyboard-viz h3 {
  flex: 0 0 auto;
  font-size: 24px;
  margin: 0;
  padding: 10px 0 15px;
}
`;

/* returns a data object of { element, timerId } */
function createKeyLine(parentEl, contentString) {
  const keyEl = document.createElement("li");
  keyEl.innerHTML = renderKeyString(contentString);
  parentEl.appendChild(keyEl);

  const timerId = window.setTimeout(() => {
    destroyKeyLine(keyEl);
  }, 5000);

  return { element: keyEl, timerId };
}

/* Removes the passed-in element from the DOM */
function destroyKeyLine(keyLineElement) {
  const parentEl = keyLineElement.parentNode;
  parentEl && parentEl.removeChild(keyLineElement);
}

/* takes and returns a data object of { element, timerId } */
function updateKeyLine(keyLine, contentString) {
  let { element, timerId } = keyLine;

  // update the text
  element.innerHTML += renderKeyString(contentString);

  // reset the timeout
  window.clearTimeout(timerId);
  timerId = window.setTimeout(() => {
    destroyKeyLine(element);
  }, 20000);

  return { element, timerId };
}

function isPrintableKey(key) {
  return (
    key.length === 1 &&
    key.match(/^[a-z0-9!"#$%&'()*+,./:;<=>?@[\] ^_`{|}~-]*$/i).length > 0
  );
}

function isModifierKey(key) {
  const metaKeys = ["control", "shift", "os", "alt", "fn", "meta"];
  return metaKeys.includes(key.toLowerCase());
}

function renderKeyString(keyString) {
  let isModifier = isModifierKey(keyString);
  return isModifier ? `${keyString} ` : keyString;
}

function renderVisualizer() {
  const container = document.createElement("div");
  container.className = "sh-keyboard-viz";
  container.setAttribute("role", "region");
  container.setAttribute("aria-labelledby", "sh-viz-heading");

  // heading
  const heading = document.createElement("h3");
  heading.id = "sh-viz-heading";
  heading.innerText = "Pressed Keys";
  container.appendChild(heading);

  // list
  const keyList = document.createElement("ul");
  container.appendChild(keyList);

  return container;
}

function init() {
  // if a keyboard visualizer element already exists, use that
  let visualizerEl = document.querySelector(".sh-keyboard-viz");

  // otherwise, create one
  if (!visualizerEl) {
    visualizerEl = renderVisualizer();
    document.body.appendChild(visualizerEl);

    // add stylesheet
    const styles = document.createElement("style");
    styles.appendChild(document.createTextNode(visualizerStyles));
    document.head.appendChild(styles);
  }

  // update keylines on keydown
  const keyLineParent = visualizerEl.querySelector("ul");

  // save ref to the keyline that should be used.
  // this is cleared if the next key should use a new line
  let currentKeyLine;
  let hasModifier = false;

  document.body.addEventListener(
    "keydown",
    (event) => {
      const keyString = event.key === " " ? "Space" : event.key;

      // if the key is a modifier key, clear currentKeyLine
      if (isModifierKey(keyString)) {
        if (!hasModifier) {
          currentKeyLine = undefined;
        }
        hasModifier = true;
      }

      // if the key is not a printable key, clear currentKeyLine
      if (!isPrintableKey(keyString) && !hasModifier) {
        currentKeyLine = undefined;
      }

      // create or update keyline
      if (currentKeyLine) {
        updateKeyLine(currentKeyLine, keyString);
      } else {
        currentKeyLine = createKeyLine(keyLineParent, keyString);
      }

      // scroll into view, if needed
      if (keyLineParent.scrollHeight > keyLineParent.clientHeight) {
        currentKeyLine.element.scrollIntoView();
      }

      // clear next key line for non-printable keys
      if (!isPrintableKey(keyString) && !hasModifier) {
        currentKeyLine = undefined;
      }
    },
    true
  );

  document.body.addEventListener(
    "keyup",
    (event) => {
      // clear currentKeyLine if the modifier key is released
      if (isModifierKey(event.key)) {
        hasModifier = false;
        currentKeyLine = undefined;
      }
    },
    true
  );
}

init();
