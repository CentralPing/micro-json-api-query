// ESM syntax is supported.
// export {};

/**
 * @module microJsonApiQuery
*/

const {createError} = require('micro');
const jsonApiQuery = require('@centralping/json-api-query');

const {parse, validate} = jsonApiQuery;

/**
 * Module property that generates a new deep copy of the default schema
 * on every import. Apply any extensions and provide as an optional schema
 * for the `validate` method.
 * @member {Object} schema JSON Schema
 */
Object.defineProperty(
  exports,
  'schema',
  Object.getOwnPropertyDescriptor(jsonApiQuery, 'schema')
);

/**
 *
 * @example
const parser = parse();
 * @name parse
 * @param {Object} [options] Any AJV option.
 * @param {Boolean|String} [options.coerceTypes='array'] Coerces validated
 * values to specified types in the schema.
 * @param {Boolean} [options.ownProperties=true] Restricts validation to own
 * properties of data object.
 * @param {Object} [schema] A JSON Schema for a JSON API query. Defaults to the included `schema`.
 * @return {Function} The configured parser function
 */
exports.parse = (...args) => {
  const validator = validate(...args);

  return (req) => parser(req, validator);
};

/**
 * @private
 * @example
 *
const url = '/foo/bar?include=author&fields%5Barticles%5D=title%2Cbody&fields%5Bpeople%5D=name';
const {query, pathname, ...extra} = parser(url);
// query
// {
//   include: [ 'author' ],
//   fields: {
//     articles: ['title', 'body'],
//     people: ['name']
//   }
// }
// pathname
// '/foo/bar'
  * @param {Object} req A micro request object.
  * @param {Function} validator An AJV validator.
  * @throws {Error} When non valid JSON API is parsed.
  * @return {Object} A url parse object.
 */
function parser(req, validator) {
  const {url} = req;
  const {query, ...extra} = parse(url);
  const valid = validator(query);

  if (valid) {
    return {query, ...extra};
  }

  throw createError(400, 'Invalid JSON API query', validator.errors);
}
