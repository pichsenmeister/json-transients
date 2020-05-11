# json-transients

<a href="https://www.npmjs.com/package/json-transients">
    <img src="https://img.shields.io/npm/v/json-transients.svg" alt="npm version" />
</a>
<a href="https://david-dm.org/pichsenmeister/json-transients">
    <img src="https://david-dm.org/pichsenmeister/json-transients.svg" alt="Dependency Status" />
</a>
<a href="https://david-dm.org/pichsenmeister/json-transients#info=devDependencies">
    <img src="https://david-dm.org/pichsenmeister/json-transients/dev-status.svg" alt="devDependency Status" />
</a>

A simple and minimalist wrapper library to deal with JavaScript object to JSON transformations that supports removing transient fields.

* [Installation](#installation)
* [Getting started](#getting-started)
* [License](#license)

## Installation

Install via npm

```
npm install json-transients
```

or yarn

```
yarn add json-transients
```

## Getting started

Let's take a very simple JSON object as example ...
```
const json = {
    $_transient: '',
    isUndefined: undefined,
    str: "string",
    number: 1,
    bool: true,
    fn: () => { }
}
```

... and transform it to remove transient fiels (properties prefixed with `$_` in this example)
```
const JST = require('json-transients')

const jst = new JST()
const result = jst.transform(json)
```

This will remove all transient fields and return a valid JSON object:

```
{
    isUndefined: null,
    str: "string",
    number: 1,
    bool: true
}
```

## Config

Each instances of JST take a configuration object with following properties:

| Property | Required | Default | Description |
| ---- | ---- | ---- | ---- |
| `prefix` | no | `$_` | Prefix for transients fields that are being removed |
| `transformUndefined` | no | `true` | Sets all `undefined` properties to `null`. If set to `false` all `undefined` properties will be removed. You can also define a custom handler. |
| `transformDate` | no | `toISOString()` | Define a custom handler to transfrom `Date` objects. Sets all date properties to ISO string by default. |

### Example
```
const jst = new JST({
    // use a custom prefix
    prefix: 'CUSTOM_`,
    // transform all undefined properties to "not_defined" string
    transformUndefined: () => { 
        return 'not_defined'
    },
    // transform all dates to timestamp
    transformDate: (value) => { 
        return value.getTime()
    }
})
```

## License

This project is licensed under the MIT license, Copyright (c) 2020 David Pichsenmeister | [pichsenmeister.com](https://pichsenmeister.com). For more information see [LICENSE](LICENSE).
