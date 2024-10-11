<script setup lang="ts">
import { ref } from 'vue';

import { serialManager } from 'boot/managers';
import LineChart, { LineData } from 'components/DataVisualizers/LineChart.vue';

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

const baudRate = ref(115200);
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
  const portWrapper = await serialManager.connect(baudRate.value);
  if (!portWrapper) {
    console.error('Failed to connect');
    return;
  }
  portWrapper.addMessageCallback('main', (message) => {
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
    <LineChart style="height: 500px" :model-value="sensorDataList" />
  </q-page>
</template>

<style scoped></style>
