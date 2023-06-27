const HEX_MAPPING = '0123456789ABCDEF';

export const buffer2hex = (arrayBuffer: BufferSource) => {
  let result = '';
  new Uint8Array(
    'buffer' in arrayBuffer ? arrayBuffer.buffer : arrayBuffer
  ).forEach((value) => {
    result += HEX_MAPPING[value >> 4] + HEX_MAPPING[value & 15];
  });
  return result;
};

export const hex2buffer = (hexString: string) => {
  return new Uint8Array(
    hexString.match(/../g)?.map((hexChar) => {
      return parseInt(hexChar, 16);
    }) ?? []
  ).buffer;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const trueThen = (condition: unknown, value: string | undefined) =>
  condition ? value : undefined;

export const falseThen = (condition: unknown, value: string | undefined) =>
  condition ? undefined : value;
