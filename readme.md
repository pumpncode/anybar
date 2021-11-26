# anybar

Control [AnyBar](https://github.com/tonsky/AnyBar)

## Usage

```js
import anybar from "https://x.nest.land/anybar@1.0.0/module.js";

anybar("red");
// This turns AnyBar menu bar dot red.
// 🔴

anybar("green", {anybar: 9876});
// AnyBar could run on a specific port.
// 🟢

anybar("blue", {anybar: 9876, deno: 54321});
// If this module needs to run on a specific port for some reason.
// 🔵

```

## API

### anybar(style, ports)

- Returns: A promise that resolves after the style got sent to AnyBar.

#### style

- Type: `string`

The [style](https://github.com/tonsky/AnyBar#usage) of the dot you want AnyBar to display.

#### ports

- Type: `object`

The port options.

##### ports.anybar

- Type: `number`
- Default: The value of the environment variable `ANYBAR_PORT` or, if that is undefined, `1738`, which is the default port number for AnyBar.

The UDP port AnyBar runs on.

##### ports.deno

- Type: `number`
- Default: The lowest free port number in the ["unassignable"](https://www.rfc-editor.org/rfc/rfc6335.html#section-8.1.2) range (`49152`-`65535`).

The port this module should use to communicate with AnyBar. Only numbers between 1024 and 65535 are allowed, anything else will throw a `RangeError`.

## Acknowledgments

This module, especially the API, was heavily inspired by the [node module for the same purpose](https://github.com/sindresorhus/anybar) by [sindresorhus](https://github.com/sindresorhus).
