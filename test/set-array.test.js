const { SetArray, get, put, pop } = require('..');
const assert = require('assert');

describe('SetArray', () => {
  describe('get()', () => {
    it('returns undefined if not present', () => {
      const array = new SetArray();

      assert.strictEqual(get(array, 'test'), undefined);
      assert.strictEqual(get(array, 'foo'), undefined);

      put(array, 'test');
      assert.strictEqual(get(array, 'test'), 0);

      assert.strictEqual(get(array, 'foo'), undefined);
      put(array, 'foo');
      assert.strictEqual(get(array, 'foo'), 1);

      assert.deepEqual(array.array, ['test', 'foo']);
    });
  });

  describe('put()', () => {
    it('puts string in if not present', () => {
      const array = new SetArray();

      put(array, 'test');
      assert.deepEqual(array.array, ['test']);
      put(array, 'test');
      assert.deepEqual(array.array, ['test']);

      put(array, 'foo');
      assert.deepEqual(array.array, ['test', 'foo']);
      put(array, 'bar');
      assert.deepEqual(array.array, ['test', 'foo', 'bar']);

      put(array, 'bar');
      assert.deepEqual(array.array, ['test', 'foo', 'bar']);
      put(array, 'foo');
      assert.deepEqual(array.array, ['test', 'foo', 'bar']);
    });

    it('returns index of string in array', () => {
      const array = new SetArray();

      assert.strictEqual(put(array, 'test'), 0);
      assert.strictEqual(put(array, 'foo'), 1);
      assert.strictEqual(put(array, 'bar'), 2);
    });

    it('returns original index of string in array', () => {
      const array = new SetArray();

      put(array, 'test');
      put(array, 'foo');
      put(array, 'bar');

      assert.strictEqual(put(array, 'test'), 0);
      assert.strictEqual(put(array, 'foo'), 1);
      assert.strictEqual(put(array, 'bar'), 2);
    });

    it('handles empty string', () => {
      const array = new SetArray();

      assert.strictEqual(put(array, ''), 0);
      assert.strictEqual(put(array, ''), 0);
      assert.deepEqual(array.array, ['']);
    });
  });

  describe('pop()', () => {
    it('removes last item from array', () => {
      const array = new SetArray();

      put(array, 'test');
      put(array, 'foo');
      put(array, 'bar');

      pop(array);
      assert.deepEqual(array.array, ['test', 'foo']);
      pop(array);
      assert.deepEqual(array.array, ['test']);
      pop(array);
      assert.deepEqual(array.array, []);
    });

    it('unsets the key', () => {
      const array = new SetArray();

      put(array, 'test');
      pop(array);
      assert.strictEqual(get(array, 'test'), undefined);
    });

    it('putting afterwards writes to array at old index', () => {
      const array = new SetArray();

      put(array, 'test');
      pop(array);
      put(array, 'foo');
      assert.deepEqual(array.array, ['foo']);
    });

    it('getting after put gets old key ', () => {
      const array = new SetArray();

      put(array, 'test');
      pop(array);
      put(array, 'foo');
      assert.strictEqual(get(array, 'foo'), 0);
    });
  });
});
