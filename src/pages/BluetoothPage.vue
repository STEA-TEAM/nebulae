<script lang="ts" setup>
import { ref } from 'vue';

import { Bluetooth } from 'types/Bluetooth';

const bluetooth = ref(new Bluetooth());
const handleCharacteristicValueChanged = (event: any) => {
  console.log(
    'TX message is' + new TextDecoder('utf-8').decode(event.target?.value)
  );
};
const connect = async () => {
  if (await bluetooth.value.connect(['xxx'])) {
    await bluetooth.value.addListener(
      'xxx',
      'xxx',
      handleCharacteristicValueChanged
    );
    await bluetooth.value.write(
      'xxx',
      'xxx',
      'Hello World'
    );
  }
};
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <q-btn label="connect" @click="connect" />
  </q-page>
</template>

<style scoped></style>
