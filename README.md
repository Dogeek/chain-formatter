# Chain Formatter

A simple function that allows you to chain methods of any JS object based on a JSON configuration object

## Usage

```ts
import format from 'chain-formatter';

const myString = 'abcdef.ghijk.lmnop';

const methods = [
    {
        name: "split",
        args: [ "." ]
    },
    {
        name: "slice",
        args: [ 0, -1 ]
    },
    {
        name: "pop"
    }
];

// Equivalent to calling "abcdef.ghijk.lmnop".split(".").slice(0, -1).pop();
// result === "lmnop"
const result = format({ item: myString, methods });

```

You can also add methods that are not available on Javascript objects by default, for instance :

```ts
import format from 'chain-formatter';

const myString = "123/345";

const methods = [
    {
        name: "split",
        args: ["/"]
    },
    {
        name: "pop"
    },
    {
        name: "toInt"
    }
]

const inject = {
    toInt: (value) => (() => parseInt(value)),
}

// Splits and parses the string into an int
const result = format({item: myString, methods, injectFunctions: inject});

```