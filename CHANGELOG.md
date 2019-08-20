# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Until packages are at 1.0.0, MINOR version changes may be breaking.

## 2019-06-12

### [0.1.1] - @convertkit/slate-code

#### Fixed

- Revert wrapping code blocks in `pre` and `code` because Prism breaks them.
  A better fix is coming soon.

## 2019-07-26

### [0.0.3] - @convertkit-slate-blockquotes

### Added

- Initial alpha release. There are probably still bugs.

### [0.2.3] - @convertkit/slate-lists

#### Fixed

- `decreateListItemDepth` no longer throws an error for non list nodes.

## 2019-06-12

### [0.1.0] - @convertkit/slate-code

#### Added

- Support for setting the language for syntax highlighting
- Basic indent prediction on enter

#### Changed

- Wrap code blocks in `pre` and `code` instead of `div` by default

### [0.2.0] - @convertkit/slate-lists

#### Added

- Support for `renderBlock`, while maintaining `renderNode` support
