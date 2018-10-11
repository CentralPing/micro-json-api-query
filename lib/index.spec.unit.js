const {schema, parse} = require('./index');

describe('[Unit] `index`', () => {
  describe('with `schema`', () => {
    it('should be a function', () => {
      expect(schema).toBeInstanceOf(Object);
    });
  });

  describe('with `parse`', () => {
    it('should be a function', () => {
      expect(parse).toBeInstanceOf(Function);
    });
  });
});
