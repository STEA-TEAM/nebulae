<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

import { bus } from 'boot/bus';
import { bluetoothManager } from 'boot/managers';
import { useBluetoothStore } from 'stores/bluetooth';
import { createI18n } from 'utils/common.ts';

const { recognizedDevices } = storeToRefs(useBluetoothStore());
const { connect, removeRecognizedDevice } = useBluetoothStore();

const i18n = createI18n(
  useI18n(),
  'components.BluetoothDeviceComponents.RecognizedDevices.',
);

const toggleDevice = async (deviceId: string) => {
  if (bluetoothManager.deviceMap.has(deviceId)) {
    await bluetoothManager.disconnect(deviceId);
    return;
  }
  if (await connect(deviceId)) {
    bus.emit('drawer', 'close', 'right');
  }
};
</script>

<template>
  <q-card bordered flat>
    <q-card-section>
      <div class="text-h6">
        {{ i18n('labels.recognizedDevices') }}
      </div>
    </q-card-section>
    <q-separator inset />
    <q-list class="q-mx-md">
      <q-item
        v-for="(recognizedDevice, deviceId, index) in recognizedDevices"
        :key="index"
        :active="bluetoothManager.deviceMap.has(recognizedDevice.id)"
        active-class="text-positive"
        clickable
        @click="toggleDevice(deviceId.toString())"
      >
        <q-item-section avatar>
          <q-icon
            :name="
              bluetoothManager.deviceMap.has(recognizedDevice.id)
                ? 'mdi-bluetooth'
                : 'mdi-bluetooth-off'
            "
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ i18n('labels.deviceName') }}
            {{ recognizedDevice.name ?? i18n('labels.noName') }}
          </q-item-label>
          <q-item-label class="text-grey" caption>
            {{ i18n('labels.deviceId') }}{{ recognizedDevice.id }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            color="negative"
            flat
            icon="mdi-delete"
            round
            @click.prevent.stop="removeRecognizedDevice(deviceId)"
          />
        </q-item-section>
        <q-tooltip
          anchor="top middle"
          :offset="[10, 10]"
          :self="`bottom middle`"
        >
          {{ recognizedDevice.options }}
        </q-tooltip>
      </q-item>
    </q-list>
  </q-card>
</template>

<style scoped></style>
