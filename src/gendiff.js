import { readFileSync } from 'fs';
import path from 'path';

function generateDiffString({
  key, val1, val2, has1, has2,
}) {
  if (has2 && has1 && val1 !== val2) {
    return `  - ${key}: ${val1}
  + ${key}: ${val2}`;
  }

  if (has1 && has2) {
    return `    ${key}: ${val1}`;
  }

  if (has1) {
    return `  - ${key}: ${val1}`;
  }

  return `  + ${key}: ${val2}`;
}

function getJSONDiff(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = Array.from(new Set(keys1.concat(keys2))).sort();

  const changes = allKeys.map((key) => ({
    key,
    val1: obj1[key],
    val2: obj2[key],
    has1: key in obj1,
    has2: key in obj2,
  }));

  const diffStrings = changes.map(generateDiffString);

  return `{
${diffStrings.join('\n')}
}`;
}

function genStrDiff(str1, str2, format) {
  if (format === 'JSON') {
    const json1 = JSON.parse(str1);
    const json2 = JSON.parse(str2);

    const result = getJSONDiff(json1, json2);

    return result;
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
