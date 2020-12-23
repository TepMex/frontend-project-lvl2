import { readFileSync } from 'fs';
import path from 'path';

function genStrDiff(str1, str2, format) {
  if (format === 'JSON') {
    return 'yoba';
  }
  return '';
}

function genFilesDiff(filepath1, filepath2, format) {
  const string1 = readFileSync(path.resolve(process.cwd(), filepath1)).toString();
  const string2 = readFileSync(path.resolve(process.cwd(), filepath2)).toString();

  return genStrDiff(string1, string2, format);
}

export {
  genFilesDiff,
  genStrDiff,
};
