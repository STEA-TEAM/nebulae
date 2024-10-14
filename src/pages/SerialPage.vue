<script setup lang="ts">
import { useQuasar } from 'quasar';
import { reactive, ref } from 'vue';

import { serialManager } from 'boot/managers';
import { LineData } from 'components/DataVisualizers/LineChart.vue';
import { SerialPortWrapper } from 'types/serial/SerialPortWrapper';
import { hex2buffer } from 'utils/data.ts';

const { notify } = useQuasar();

const baudRates = [
  { label: '110', value: 110 },
  { label: '300', value: 300 },
  { label: '600', value: 600 },
  { label: '1200', value: 1200 },
  { label: '2400', value: 2400 },
  { label: '4800', value: 4800 },
  { label: '9600', value: 9600 },
  { label: '19200', value: 19200 },
  { label: '38400', value: 38400 },
  { label: '57600', value: 57600 },
  { label: '115200', value: 115200 },
  { label: '230400', value: 230400 },
  { label: '460800', value: 460800 },
  { label: '921600', value: 921600 },
];

const colorMatrix = reactive({
  6: '#000000',
  5: '#000000',
  4: '#000000',
  3: '#000000',
  2: '#000000',
  1: '#000000',
  12: '#000000',
  11: '#000000',
  10: '#000000',
  9: '#000000',
  8: '#000000',
  7: '#000000',
  18: '#000000',
  17: '#000000',
  16: '#000000',
  15: '#000000',
  14: '#000000',
  13: '#000000',
  24: '#000000',
  23: '#000000',
  22: '#000000',
  21: '#000000',
  20: '#000000',
  19: '#000000',
  30: '#000000',
  29: '#000000',
  28: '#000000',
  27: '#000000',
  26: '#000000',
  25: '#000000',
  36: '#000000',
  35: '#000000',
  34: '#000000',
  33: '#000000',
  32: '#000000',
  31: '#000000',
});

const baudRate = ref(115200);
const isColorData = ref(false);
const isHexData = ref(false);
const portWrapper = ref<SerialPortWrapper>();
const sendData = ref('');
const sensorDataList = ref<LineData[]>([
  {
    name: 'left',
    data: [],
  },
  {
    name: 'right',
    data: [],
  },
  {
    name: 'diff',
    data: [],
  },
]);

const connect = async () => {
  portWrapper.value = await serialManager.connect(baudRate.value);
  if (!portWrapper.value) {
    console.error('Failed to connect');
    return;
  }
  notify({
    type: 'positive',
    message: 'Connected',
  });

  portWrapper.value.addMessageCallback('main', (message) => {
    sensorDataList.value
      .find((data: LineData) => data.name === 'left')
      ?.data.push({
        x: Date.now(),
        y: Number(message.split(',')[0]),
      });
    if (sensorDataList.value[0].data.length > 500) {
      sensorDataList.value[0].data.shift();
    }
    sensorDataList.value
      .find((data: LineData) => data.name === 'right')
      ?.data.push({
        x: Date.now(),
        y: Number(message.split(',')[1]),
      });
    if (sensorDataList.value[1].data.length > 500) {
      sensorDataList.value[1].data.shift();
    }
    sensorDataList.value
      .find((data: LineData) => data.name === 'diff')
      ?.data.push({
        x: Date.now(),
        y: Number(message.split(',')[0]) - Number(message.split(',')[1]),
      });
    if (sensorDataList.value[2].data.length > 500) {
      sensorDataList.value[2].data.shift();
    }
  });
};

const setColor = (index: number) => {
  const addressHex = index.toString(16).padStart(2, '0');
  sendData.value = `0401${addressHex}${(<string>(<never>colorMatrix)[index]).substring(1)}`;
  isHexData.value = true;
  write();
};

let write = () => {
  if (!portWrapper.value) {
    console.error('Not connected');
    return;
  }
  if (isHexData.value) {
    portWrapper.value.write(new Uint8Array(hex2buffer(sendData.value)));
  } else {
    portWrapper.value.write(new TextEncoder().encode(sendData.value));
  }
};
</script>

<template>
  <q-page class="column q-gutter-y-lg q-pa-lg">
    <q-select
      label="Baud Rate"
      :options="baudRates"
      outlined
      v-model="baudRate"
    />
    <q-btn color="primary" label="Connect" @click="connect" />
    <q-toggle label="Color Data" v-model="isColorData" />
    <div v-if="isColorData" class="row justify-center q-pb-xl">
      <div class="col-6 row">
        <q-color
          v-for="(_, name, index ) in colorMatrix"
          :key="index"
          class="col-2"
          format-model="hex"
          no-header
          no-footer
          v-model="colorMatrix[name]"
          @update:modelValue="setColor(name)"
        />
      </div>
    </div>
    <div v-else class="row q-gutter-x-md">
      <q-input class="col-grow" outlined v-model="sendData" />
      <q-checkbox label="Hex Value" v-model="isHexData" />
      <q-btn color="primary" label="Send" @click="write" />
    </div>
    <!--    <LineChart style="height: 500px" :model-value="sensorDataList" />-->
  </q-page>
</template>

<style scoped></style>
