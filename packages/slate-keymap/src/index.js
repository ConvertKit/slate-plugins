import isHotkey from "is-hotkey";

const Keymap = (shortcuts, options) => {
  const config = {
    if: () => true,
    ...options
  };

  const functions = Object.keys(shortcuts).map(key => {
    const isKeyPressed = isHotkey(key);
    const command = shortcuts[key];

    const check = (event, editor) => isKeyPressed(event) && config.if(editor);

    const handler =
      typeof command == "string"
        ? (event, editor) => {
            event.preventDefault();
            editor.command(command);
          }
        : command;

    return {
      check,
      handler
    };
  });

  return {
    onKeyDown(event, editor, next) {
      const shortcut = functions.find(shortcut =>
        shortcut.check(event, editor)
      );
      if (shortcut) {
        return shortcut.handler(event, editor, next);
      } else {
        return next();
      }
    }
  };
};

export default Keymap;
