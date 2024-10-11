<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { bluetoothManager } from 'boot/managers';
import { BluetoothDeviceWrapper } from 'types/bluetooth/BluetoothDeviceWrapper';
import { createI18n } from 'utils/common.ts';

export interface Props {
  mobile?: boolean;
  device?: BluetoothDevice;
  service?: BluetoothRemoteGATTService;
  characteristic?: BluetoothRemoteGATTCharacteristic;
}

const props = withDefaults(defineProps<Props>(), {
  mobile: false,
});

const emit = defineEmits([
  'update:device',
  'update:service',
  'update:characteristic',
]);

const i18n = createI18n(useI18n(), 'components.BluetoothSelectors.');

const deviceList = computed(() =>
  Array.from(bluetoothManager.deviceMap.values()),
);

const serviceList = ref<BluetoothRemoteGATTService[]>([]);

const characteristicList = ref<BluetoothRemoteGATTCharacteristic[]>([]);

const currentDeviceWrapper = ref<BluetoothDeviceWrapper>();

const currentDevice = computed({
  get: () => props.device,
  set: (e) => emit('update:device', e),
});

const currentService = computed({
  get: () => props.service,
  set: (e) => emit('update:service', e),
});

const currentCharacteristic = computed({
  get: () => props.characteristic,
  set: (e) => emit('update:characteristic', e),
});

const updateService = async (service?: BluetoothRemoteGATTService) => {
  currentService.value = service;
  currentCharacteristic.value = undefined;
  if (service) {
    characteristicList.value =
      (
        await currentDeviceWrapper.value?.listCharacteristics(service.uuid)
      )?.filter((characteristic) => characteristic.properties.write) ?? [];
  } else {
    characteristicList.value = [];
  }
  currentCharacteristic.value = characteristicList.value[0];
};

const updateDevice = async (deviceWrapper?: BluetoothDeviceWrapper) => {
  currentDeviceWrapper.value = deviceWrapper;
  currentDevice.value = deviceWrapper?.device;
  serviceList.value = (await deviceWrapper?.listPrimaryServices()) ?? [];
  await updateService(serviceList.value[0]);
  currentCharacteristic.value = undefined;
};
</script>

<template>
  <div :class="$q.screen.lt.md ? 'column q-gutter-y-sm' : 'row q-gutter-x-sm'">
    <q-select
      v-model="currentDevice"
      :display-value="currentDevice?.name ?? currentDevice?.id"
      :label="i18n('labels.targetDevice')"
      :options="deviceList"
      clearable
      dense
      outlined
      style="min-width: 9rem"
      @update:modelValue="updateDevice"
    >
      <template v-slot:option="{ itemProps, opt }">
        <q-item v-bind="itemProps">
          <q-item-section>
            <q-item-label>{{ opt['device'].name }}</q-item-label>
            <q-item-label caption>{{ opt['device'].id }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-italic text-grey">
            {{ i18n('labels.noDevice') }}
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-select
      v-model="currentService"
      :label="i18n('labels.targetService')"
      :options="serviceList"
      clearable
      dense
      option-label="uuid"
      option-value="uuid"
      outlined
      style="min-width: 10rem"
      @update:modelValue="updateService"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-italic text-grey">
            {{ i18n('labels.noService') }}
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-select
      v-model="currentCharacteristic"
      :label="i18n('labels.targetCharacteristic')"
      :options="characteristicList"
      clearable
      dense
      option-label="uuid"
      option-value="uuid"
      outlined
      style="min-width: 12rem"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-italic text-grey">
            {{ i18n('labels.noCharacteristic') }}
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<style scoped></style>
