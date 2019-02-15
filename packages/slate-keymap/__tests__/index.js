import KeyMap from "../src";
import { createEvent } from "@convertkit/slate-testing-library";

describe("KeyMap", () => {
  it("should call a function when the key is pressed", () => {
    const enterFn = jest.fn();
    const keyMap = KeyMap({ enter: enterFn });

    keyMap.onKeyDown(createEvent.keyDown({ key: "Enter" }), {}, jest.fn());

    expect(enterFn).toHaveBeenCalled();
  });

  it("should call editor.command if the argument is a string", () => {
    const command = jest.fn();
    const keyMap = KeyMap({ "shift+enter": "softBreak" });

    keyMap.onKeyDown(
      createEvent.keyDown({ key: "Enter", shiftKey: true }),
      { command },
      jest.fn()
    );

    expect(command).toHaveBeenCalledWith("softBreak");
  });

  it("should handle modifiers", () => {
    const shiftEnterFn = jest.fn();
    const keyMap = KeyMap({ "shift+enter": shiftEnterFn });

    keyMap.onKeyDown(
      createEvent.keyDown({ key: "Enter", shiftKey: true }),
      {},
      jest.fn()
    );

    expect(shiftEnterFn).toHaveBeenCalled();
  });

  it("should call `next()` if unhandled", () => {
    const next = jest.fn();
    const keyMap = KeyMap({});

    keyMap.onKeyDown(createEvent.keyDown({ key: "Enter" }), {}, next);

    expect(next).toHaveBeenCalled();
  });

  it("should call the function if `options.if` returns true", () => {
    const enterFn = jest.fn();
    const keyMap = KeyMap({ enter: enterFn }, { if: () => true });

    keyMap.onKeyDown(createEvent.keyDown({ key: "Enter" }), {}, jest.fn());
    expect(enterFn).toHaveBeenCalled();
  });

  it("should not call the function if `options.if` returns false", () => {
    const enterFn = jest.fn();
    const keyMap = KeyMap({ enter: enterFn }, { if: () => false });

    keyMap.onKeyDown(createEvent.keyDown({ key: "Enter" }), {}, jest.fn());
    expect(enterFn).not.toHaveBeenCalled();
  });
});
