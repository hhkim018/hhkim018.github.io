const encoderCache = new Map();

function legacyCharacterMap(encoding) {
  if (encoderCache.has(encoding)) return encoderCache.get(encoding);

  const decoder = new TextDecoder(encoding, { fatal: true });
  const map = new Map();
  const addBytes = (bytes) => {
    try {
      const decoded = decoder.decode(Uint8Array.from(bytes));
      if (Array.from(decoded).length === 1 && !map.has(decoded)) map.set(decoded, bytes);
    } catch {}
  };

  for (let first = 0; first < 256; first++) addBytes([first]);
  for (let first = 0; first < 256; first++) {
    for (let second = 0; second < 256; second++) addBytes([first, second]);
  }

  encoderCache.set(encoding, map);
  return map;
}

function encodeToCharset(value, encoding) {
  if (encoding === 'utf-8') return { bytes: new TextEncoder().encode(value), replacements: 0 };
  if (encoding === 'utf-16le') {
    const bytes = new Uint8Array(value.length * 2);
    for (let index = 0; index < value.length; index++) {
      const code = value.charCodeAt(index);
      bytes[index * 2] = code & 255;
      bytes[index * 2 + 1] = code >> 8;
    }
    return { bytes, replacements: 0 };
  }

  const map = legacyCharacterMap(encoding);
  const output = [];
  let replacements = 0;
  for (const character of value) {
    const encoded = map.get(character);
    if (encoded) output.push(...encoded);
    else {
      output.push(0x3f);
      replacements++;
    }
  }
  return { bytes: Uint8Array.from(output), replacements };
}

self.onmessage = ({ data }) => {
  const { id, value, source, target } = data;
  try {
    const sourceEncoded = encodeToCharset(value, source);
    const sourceText = new TextDecoder(source, { ignoreBOM: true }).decode(sourceEncoded.bytes);
    const targetEncoded = encodeToCharset(sourceText, target);
    const text = new TextDecoder(target, { ignoreBOM: true }).decode(targetEncoded.bytes);
    self.postMessage({
      id,
      text,
      bytes: Array.from(targetEncoded.bytes),
      sourceReplacements: sourceEncoded.replacements,
      targetReplacements: targetEncoded.replacements,
    });
  } catch (error) {
    self.postMessage({ id, error: error?.message || 'Unsupported encoding' });
  }
};
