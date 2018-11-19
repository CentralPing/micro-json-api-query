const {schema, parse} = require('./main');

describe('[Unit] `main`', () => {
  describe('with `schema`', () => {
    it('should be an object', () => {
      expect(schema).toBeInstanceOf(Object);
    });

    it('should return a unique copy for each import', () => {
      const {schema: secondSchema} = require('./main');
      secondSchema.foo = 'bar';

      expect(schema.foo).toBeUndefined();
      expect(secondSchema.foo).toBe('bar');
    });
  });

  describe('with `parse`', () => {
    it('should be a function', () => {
      expect(parse).toBeInstanceOf(Function);
    });

    it('should parse and validate valid querystrings', () => {
      const parser = parse();

      expect(parser({url: '/'})).toMatchObject({
        href: '/',
        pathname: '/',
        query: {}
      });

      expect(parser({url: '/foo/bar'})).toMatchObject({
        href: '/foo/bar',
        pathname: '/foo/bar',
        query: {}
      });

      expect(parser({url: '/foo/bar?include=author&fields%5Barticles%5D=title%2Cbody&fields%5Bpeople%5D=name'})).toMatchObject({
        href: '/foo/bar?include=author&fields%5Barticles%5D=title%2Cbody&fields%5Bpeople%5D=name',
        pathname: '/foo/bar',
        query: {
          include: ['author'],
          fields: {
            articles: ['title', 'body'],
            people: ['name']
          }
        }
      });
    });

    it('should throw with invalid querystrings', () => {
      const parser = parse();

      expect(() => parser({url: '/?fields=foo'})).toThrow('Invalid JSON API query');
    });
  });
});
