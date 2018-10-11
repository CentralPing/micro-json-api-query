# @CentralPing/micro-json-api-query

[![Build Status](https://travis-ci.org/CentralPing/micro-json-api-query.svg?branch=master)](https://travis-ci.org/CentralPing/micro-json-api-query)
[![Coverage Status](https://coveralls.io/repos/github/CentralPing/micro-json-api-query/badge.svg)](https://coveralls.io/github/CentralPing/micro-json-api-query)
[![Dependency Status](https://david-dm.org/CentralPing/micro-json-api-query.svg)](https://david-dm.org/CentralPing/micro-json-api-query)
[![Greenkeeper Status](https://badges.greenkeeper.io/CentralPing/micro-json-api-query.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/centralping/micro-json-api-query/badge.svg)](https://snyk.io/test/github/centralping/micro-json-api-query)

A [micro](https://github.com/zeit/micro) wrapper for parsing and validating querystrings with [json-api-query](https://github.com/CentralPing/json-api-query).

## Installation

`npm i --save @centralping/micro-json-api-query`

## API Reference

<a name="module_microJsonApiQuery..schema"></a>

### microJsonApiQuery~schema : <code>Object</code>
Module property that generates a new deep copy of the default schema
on every import. Apply any extensions and provide as an optional schema
for the `validate` method.

**Kind**: inner property of [<code>microJsonApiQuery</code>](#module_microJsonApiQuery)  
<a name="module_microJsonApiQuery..parse"></a>

### microJsonApiQuery~parse ⇒ <code>function</code>
**Kind**: inner property of [<code>microJsonApiQuery</code>](#module_microJsonApiQuery)  
**Returns**: <code>function</code> - The configured parser function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | Any AJV option. |
| [options.coerceTypes] | <code>Boolean</code> \| <code>String</code> | <code>&#x27;array&#x27;</code> | Coerces validated values to specified types in the schema. |
| [options.ownProperties] | <code>Boolean</code> | <code>true</code> | Restricts validation to own properties of data object. |
| [schema] | <code>Object</code> |  | A JSON Schema for a JSON API query. Defaults to the included `schema`. |

**Example**  
```js
const parser = parse();
```

## Examples

### For Default Parsing

```js
const {parse} = require('@centralping/micro-json-api-query');

const parser = parse();

// req is the micro request object
const {query} = parser(req);
```

### For AJV Options

```js
const {parse} = require('@centralping/micro-json-api-query');

const parser = parse({allErrors: true});

// req is the micro request object
const {query} = parser(req);
```

### For Extended Verification

```js
const {parse, schema} = require('@centralping/micro-json-api-query');

// extend schema

const parser = parse(undefined, schema);

// req is the micro request object
const {query} = parser(req);
```

## Test

`npm test`

With coverage reporting:

`npm test -- --coverage`

With file watch:

`npm run watch`

## License

MIT
