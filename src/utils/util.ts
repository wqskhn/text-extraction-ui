export function splitString(text: string, word: string): string[] {
  const result: string[] = [];
  const wordWithoutSpaces = word.replace(/\s/g, "");

  let startIndex = 0;

  for (let i = 0; i < text.length; i++) {
    if (
      text.substring(i, i + word.length).replace(/\s/g, "") ===
      wordWithoutSpaces
    ) {
      result.push(text.substring(startIndex, i));
      result.push(text.substring(i, i + word.length));
      startIndex = i + word.length;
    }
  }

  result.push(text.substring(startIndex));

  return result;
}

export function compareString(s1: string, s2: string): boolean {
  return s1.replace(/\s/g, "") === s2.replace(/\s/g, "");
}
