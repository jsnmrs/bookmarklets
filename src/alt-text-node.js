// This is an example of how you can split up a script into multiple files and import them into the main script.

const node =
  'img{outline: 4px solid #f0f !important;position: relative;} img[alt]{outline: none !important;} body::after{ position: absolute; top: 0; right: 0; background-color: #f0f; color: #fff; z-index: 9999; font-size: 12px; font-weight: 400; padding: 1px 3px;content: "Alt attribute check";}';

export { node };
