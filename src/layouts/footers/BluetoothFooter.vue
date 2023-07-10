<script lang="ts" setup>
import { computed, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { bluetoothManager } from 'boot/managers';
import { BluetoothDeviceWrapper } from 'types/bluetooth/BluetoothDeviceWrapper';

const { t } = useI18n();
const i18n = (relativePath: string) => {
  return t('layouts.footers.BluetoothFooter.' + relativePath);
};

const currentDevice: Ref<BluetoothDeviceWrapper | undefined> = ref();
const currentService: Ref<BluetoothServiceUUID | undefined> = ref();
const currentCharacteristic: Ref<string> = ref('');
const isHex = ref(false);
const payload = ref('');

const deviceList = computed(() => {
  return Array.from(bluetoothManager.deviceMap.values());
});

const deviceLabel = computed(() => {
  let result = i18n('labels.device');
  if (currentDevice.value) {
    result += currentDevice.value.device.name ?? currentDevice.value.device.id;
  } else {
    result += i18n('labels.noDevice');
  }
  return result;
});

const serviceLabel = computed(() => {
  let result = i18n('labels.service');
  if (currentService.value) {
    result += currentService.value;
  } else {
    result += i18n('labels.noService');
  }
  return result;
});

const updateService = async (service: string) => {
  currentService.value = service;
  console.log(
    await currentDevice.value?.server.listCharacteristics(
      String(currentService.value)
    )
  );
};

const sendPayload = () => {
  if (
    currentDevice.value &&
    currentService.value &&
    currentCharacteristic.value
  ) {
    currentDevice.value.server.write(
      currentService.value.toString(),
      currentCharacteristic.value,
      payload.value
    );
  }
};
</script>

<template>
  <q-footer bordered class="bg-dark q-pa-md">
    <q-toolbar>
      <div class="column q-gutter-y-sm">
        <div class="row q-gutter-x-sm">
          <q-select
            v-model="currentDevice"
            :display-value="deviceLabel"
            :label="i18n('labels.targetDevice')"
            :options="deviceList"
            dense
            outlined
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
            :options="currentDevice?.services"
            dense
            outlined
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
          <q-input
            v-model="currentCharacteristic"
            :disable="currentService === undefined"
            :placeholder="i18n('labels.payload')"
            autogrow
            clearable
            dense
            outlined
            type="text"
          />
        </div>
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
