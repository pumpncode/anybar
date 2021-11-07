# anybar

Control [AnyBar](https://github.com/tonsky/AnyBar)

## Usage

```js
import anybar from "https://x.nest.land/anybar@v0.1.0/module.js";

anybar("purple");
// The Anybar menu bar icon turned purple
```

## API

### anybar(style, anybarPort, denoPort)

Returns a promise, but AnyBar doesn't send back a reply, so really the only point of waiting for the promise to resolve is in case of an obscure DNS error.

#### style

Type: `string`

The [style](https://github.com/tonsky/AnyBar#usage) of the dot you want AnyBar to display.

#### anybarPort

Type: `number`
Default: `1738`

The UDP port AnyBar runs on.

#### denoPort

Type: `number`
Default: `1738`

The port this module uses to communicate with AnyBar.

## Acknowledgments

This module, especially the API, is heavily inspired by the [node module for the same purpose](https://github.com/sindresorhus/anybar) by [sindresorhus](https://github.com/sindresorhus).
