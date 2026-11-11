self.onmessage = ({ data }) => {
  const { id, pattern, flags, input, maxMatches = 10000 } = data;
  try {
    const regex = new RegExp(pattern, [...new Set(flags)].join(''));
    const matches = [];
    let truncated = false;

    if (regex.global) {
      for (const match of input.matchAll(regex)) {
        if (matches.length >= maxMatches) {
          truncated = true;
          break;
        }
        matches.push({ text: match[0], index: match.index });
      }
    } else {
      const match = regex.exec(input);
      if (match) matches.push({ text: match[0], index: match.index });
    }

    self.postMessage({ id, matches, truncated });
  } catch (error) {
    self.postMessage({ id, error: error?.message || 'Invalid regular expression' });
  }
};
