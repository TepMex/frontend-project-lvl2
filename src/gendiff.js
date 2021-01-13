import { readFileSync } from 'fs';
import path from 'path';

function getJSONDiff(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = Array.from(new Set(keys1.concat(keys2))).sort();

  const diffStrings = allKeys.map((key) => {
    const existInFirst = keys1.includes(key);
    const existInSecond = keys2.includes(key);
    const existInBoth = existInFirst && existInSecond;
    const existInBothAndHasDifferentValue = existInBoth && obj1[key] !== obj2[key];

    if (existInBothAndHasDifferentValue) {
      return `  - ${key}: ${obj1[key]}
  + ${key}: ${obj2[key]}`;
    }

    if (existInBoth) {
      return `    ${key}: ${obj1[key]}`;
    }

    if (existInFirst) {
      return `  - ${key}: ${obj1[key]}`;
    }

    return `  + ${key}: ${obj2[key]}`;
  });

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
