const HEX_MAPPING = '0123456789ABCDEF';

export const buffer2hex = (arrayBuffer: BufferSource) => {
  let result = '';
  new Uint8Array(
    'buffer' in arrayBuffer ? arrayBuffer.buffer : arrayBuffer,
  ).forEach((value) => {
    result += HEX_MAPPING[value >> 4] + HEX_MAPPING[value & 15];
  });
  return result;
};

export const hex2buffer = (hexString: string) => {
  return new Uint8Array(
    hexString.match(/../g)?.map((hexChar) => {
      return parseInt(hexChar, 16);
    }) ?? [],
  ).buffer;
};

export const mergeUint8Arrays = (...arrays: Uint8Array[]): Uint8Array => {
  const totalSize = arrays.reduce((acc, e) => acc + e.length, 0);
  const merged = new Uint8Array(totalSize);

  arrays.forEach((array, i, arrays) => {
    const offset = arrays.slice(0, i).reduce((acc, e) => acc + e.length, 0);
    merged.set(array, offset);
  });

  return merged;
};
