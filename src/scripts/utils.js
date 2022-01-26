const byteToHex = [];
for (let n = 0; n <= 0xff; ++n) {
  const hexOctet = n.toString(16).padStart(2, "0");
  byteToHex.push(hexOctet);
}

function charArrToHex(array, split = "") {
  const hexOctets = new Array(array.length);
  for (let i = 0; i < array.length; ++i) {
    hexOctets[i] = byteToHex[array[i]];
  }
  return hexOctets.join(split);
}

function hexToBuffer(hex) {
  if (hex.length % 2 !== 0) {
    this.$q.notify({
      type: 'warning', message: 'Expecting an even number of characters in the HEX', icon: 'link_off'
    });
  }

  const bad = hex.match(/[G-Z\s]/i);
  if (bad) {
    this.$q.notify({
      type: 'warning', message: 'Found non-hex characters' + bad, icon: 'link_off'
    });
  }

  return new Uint8Array(hex.match(/[\dA-F]{2}/gi).map(item => {
    return parseInt(item, 16);
  })).buffer;
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function stringSeparator(string, count, split = " ") {
  return [...string].map((d, i) => (i) % count === 0 ? split + d : d).join('').trim();
}

function tableConstructor(data, rowSeparator = "\n", columnSeparator = ",") {
  let table = [];
  let tempRows = data.split(rowSeparator);
  if (tempRows.length === 1) {
    throw new Error("NoRowException");
  }
  let remains = tempRows.pop();
  tempRows.forEach((row) => {
    table.push(row.split(columnSeparator));
  });
  return [table, remains];
}

export {charArrToHex, hexToBuffer, sleep, stringSeparator, tableConstructor};
