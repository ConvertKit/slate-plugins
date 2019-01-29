const CODES = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  control: 17,
  alt: 18,
  pause: 19,
  capslock: 20,
  escape: 27,
  " ": 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  arrowleft: 37,
  arrowup: 38,
  arrowright: 39,
  arrowdown: 40,
  insert: 45,
  delete: 46,
  meta: 91,
  numlock: 144,
  scrolllock: 145,
  ";": 186,
  "=": 187,
  ",": 188,
  "-": 189,
  ".": 190,
  "/": 191,
  "`": 192,
  "[": 219,
  "\\": 220,
  "]": 221,
  "'": 222
};

for (var f = 1; f < 20; f++) {
  CODES["f" + f] = 111 + f;
}

const toKeyCode = name => CODES[name] || name.toUpperCase().charCodeAt(0);

const keyDown = ({ key, ...options }) => {
  const keyCode = toKeyCode(key.toLowerCase());

  return new KeyboardEvent("keydown", {
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
    ...options,
    key,
    keyCode,
    which: keyCode
  });
};

export default { keyDown };
