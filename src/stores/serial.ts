import { defineStore } from 'pinia';
import { ref } from 'vue';

import { serialManager } from 'boot/managers';

export const useSerialStore = defineStore('serial', () => {
  const baudRate = ref(9600);

  const connect = async () => {
    await serialManager.connect(baudRate.value);
  };

  return { baudRate, connect };
});
