<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { bluetoothManager } from 'boot/managers';
import { BluetoothDeviceWrapper } from 'types/bluetooth/BluetoothDeviceWrapper';

export interface Props {
  device?: BluetoothDevice;
  service?: BluetoothRemoteGATTService;
  characteristic?: BluetoothRemoteGATTCharacteristic;
}

const props = defineProps<Props>();
const emit = defineEmits([
  'update:device',
  'update:service',
  'update:characteristic',
]);

const { t } = useI18n();
const i18n = (relativePath: string) => {
  return t('components.BluetoothSelectors.' + relativePath);
};

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

const deviceLabel = computed(() => {
  let result = i18n('labels.device');
  if (currentDevice.value) {
    result += currentDevice.value.name ?? currentDevice.value.id;
  } else {
    result += i18n('labels.noDevice');
  }
  return result;
});

const serviceLabel = computed(() => {
  let result = i18n('labels.service');
  if (currentService.value) {
    result += currentService.value.uuid;
  } else {
    result += i18n('labels.noService');
  }
  return result;
});

const characteristicLabel = computed(() => {
  let result = i18n('labels.characteristic');
  if (currentCharacteristic.value) {
    result += currentCharacteristic.value.uuid;
  } else {
    result += i18n('labels.noCharacteristic');
  }
  return result;
});

const updateDevice = async (deviceWrapper: BluetoothDeviceWrapper) => {
  currentDeviceWrapper.value = deviceWrapper;
  currentDevice.value = deviceWrapper.device;
  currentService.value = undefined;
  currentCharacteristic.value = undefined;
  serviceList.value = await deviceWrapper.listPrimaryServices();
};

const updateService = async (service: BluetoothRemoteGATTService) => {
  currentService.value = service;
  currentCharacteristic.value = undefined;
  characteristicList.value =
    (await currentDeviceWrapper.value?.listCharacteristics(service.uuid)) ?? [];
};
</script>

<template>
  <div>
    <q-select
      v-model="currentDevice"
      :display-value="deviceLabel"
      :label="i18n('labels.targetDevice')"
      :options="deviceList"
      dense
      outlined
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
      :display-value="serviceLabel"
      :label="i18n('labels.targetService')"
      :options="serviceList"
      dense
      outlined
      @update:modelValue="updateService"
    >
      <template v-slot:option="{ itemProps, opt }">
        <q-item v-bind="itemProps">
          <q-item-section>
            <q-item-label>{{ opt['uuid'] }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
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
      :display-value="characteristicLabel"
      :label="i18n('labels.targetCharacteristic')"
      :options="characteristicList"
      dense
      outlined
    >
      <template v-slot:option="{ itemProps, opt }">
        <q-item v-bind="itemProps">
          <q-item-section>
            <q-item-label>{{ opt['uuid'] }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
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
