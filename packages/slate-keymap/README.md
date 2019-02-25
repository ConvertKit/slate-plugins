# Slate Keymap

![](https://img.shields.io/circleci/project/github/ConvertKit/slate-plugins/master.svg?style=flat)

[View on Github](https://github.com/ConvertKit/slate-plugins)

A plugin for simplifying keyboard shortcuts with SlateJS. `slate-keymap` uses
`is-hotkey` under the hood to check if an event matches the configured keys.

## Install

```sh
yarn add @convertkit/slate-keymap
```

## Usage

`Keymap(object: Object, options: Object)`

### Example

```javascript
import Keymap from "@convertkit/slate-keymap";

const plugins = [
  Keymap({
    "mod+a": (event, editor) => editor.selectAll(),
    // You can also pass a string and it will call the command with that name
    "shift+enter": "softBreak"
  })
];
```

### Options

- `if`: A function that is passed the `editor` instance. If it returns true,
  then the Keymap is active. Defaults to `() => true`
