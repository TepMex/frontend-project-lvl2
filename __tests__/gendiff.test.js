import { test, expect } from '@jest/globals';
import path from 'path';
import { genFilesDiff } from '../src/gendiff';

test('Flat JSON', () => {
  const path1 = path.resolve(process.cwd(), '__tests__', '__fixtures__', 'flat1.json');
  const path2 = path.resolve(process.cwd(), '__tests__', '__fixtures__', 'flat2.json');

  const actual = genFilesDiff(path1, path2);
  const expectedDiff = `{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
  }`;
  expect(actual).toBe(expectedDiff);
});
