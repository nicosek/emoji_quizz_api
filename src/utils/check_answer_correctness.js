const removeDiacritics = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const normalize = (str) => {
  return removeDiacritics(str)
    .toLowerCase()
    .replace(/[\s'’"“”\-_.(),!?;:]/g, "")
    .replace(/\s+/g, "")
    .trim();
};

const levenshteinDistance = (a, b) => {
  const matrix = [];

  const lenA = a.length;
  const lenB = b.length;

  for (let i = 0; i <= lenB; i++) matrix[i] = [i];
  for (let j = 0; j <= lenA; j++) matrix[0][j] = j;

  for (let i = 1; i <= lenB; i++) {
    for (let j = 1; j <= lenA; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[lenB][lenA];
};

const checkAnswerCorrectness = (value, expected) => {
  if (typeof value !== "string" || typeof expected !== "string") return false;

  const v = normalize(value);
  const e = normalize(expected);

  return levenshteinDistance(v, e) <= 1;
};

module.exports = checkAnswerCorrectness;
