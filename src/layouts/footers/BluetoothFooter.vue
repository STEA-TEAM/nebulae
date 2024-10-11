<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { bluetoothManager } from 'boot/managers';
import BluetoothSelectors from 'components/BluetoothSelectors.vue';
import { useBluetoothStore } from 'stores/bluetooth';
import { createI18n } from 'utils/common.ts';

const { sendMessage } = useBluetoothStore();

const currentDevice = ref<BluetoothDevice>();
const currentService = ref<BluetoothRemoteGATTService>();
const currentCharacteristic = ref<BluetoothRemoteGATTCharacteristic>();
const isHex = ref(false);
const payload = ref('');

const i18n = createI18n(useI18n(), 'layouts.footers.BluetoothFooter.');

const sendPayload = async () => {
  if (
    currentDevice.value &&
    currentService.value &&
    currentCharacteristic.value
  ) {
    await sendMessage(
      currentDevice.value.id,
      currentService.value.uuid,
      currentCharacteristic.value.uuid,
      payload.value,
    );
  }
};
</script>

<template>
  <q-footer
    class="q-pa-md"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-1'"
    bordered
  >
    <q-toolbar>
      <div
        :class="$q.screen.lt.md ? 'column q-gutter-y-sm' : 'row q-gutter-x-sm'"
      >
        <BluetoothSelectors
          v-model:device="currentDevice"
          v-model:service="currentService"
          v-model:characteristic="currentCharacteristic"
        />
        <div class="row q-gutter-x-sm">
          <q-input
            v-model="payload"
            :disable="bluetoothManager.deviceMap.size === 0"
            :placeholder="i18n('labels.payload')"
            autogrow
            clearable
            dense
            outlined
            type="text"
          >
            <template v-slot:after>
              <q-btn
                :color="isHex ? 'accent' : 'primary'"
                :disable="bluetoothManager.deviceMap.size === 0"
                icon="mdi-send"
                round
                @click="sendPayload"
              />
            </template>
          </q-input>
          <q-checkbox
            v-model="isHex"
            :disable="bluetoothManager.deviceMap.size === 0"
            :label="i18n('labels.hex')"
          />
        </div>
      </div>
    </q-toolbar>
  </q-footer>
</template>

<style scoped></style>
