<script lang="ts" setup>
import { ref, watch } from 'vue';

import { bluetoothManager } from 'boot/managers';
import { useI18n } from 'vue-i18n';

import { bus } from 'boot/bus';

const { t } = useI18n();
const i18n = (relativePath: string, payload: string[]) => {
  return t('pages.BluetoothPage.' + relativePath, payload);
};

const currentDeviceId = ref('');

watch(
  bluetoothManager.deviceMap,
  (deviceMap) => {
    if (deviceMap.size) {
      currentDeviceId.value = deviceMap.keys().next().value;
    }
  },
  {
    deep: true,
  },
);
</script>

<template>
  <q-page class="column">
    <q-toolbar class="bg-dark">
      <q-tabs v-model="currentDeviceId" inline-label no-caps>
        <q-tab
          v-if="bluetoothManager.deviceMap.size === 0"
          class="text-grey"
          :label="i18n('labels.noDevice')"
          name=""
          @click="bus.emit('drawer', 'right', 'open')"
        />
        <q-tab
          v-for="[deviceId, deviceWrapper] in bluetoothManager.deviceMap"
          :key="deviceId"
          :label="deviceWrapper.device.name ?? deviceWrapper.device.id"
          :name="deviceId"
        />
      </q-tabs>
    </q-toolbar>
    <q-tab-panels v-model="currentDeviceId">
      <q-tab-panel
        v-for="[deviceId, deviceWrapper] in bluetoothManager.deviceMap"
        :key="deviceId"
        class="q-pa-none"
        :name="deviceId"
      >
        <q-list separator>
          <q-item
            v-for="(message, index) in deviceWrapper.messages"
            :key="index"
            :style="{
              backgroundColor: message.type === 'send' ? '#003300' : '#330000',
            }"
            class="q-px-xs"
            dense
          >
            <q-item-section>
              <div class="row q-gutter-xs items-start">
                <div class="row justify-end" style="width:3.8rem">
                  <q-chip>{{ index}}</q-chip>
                </div>

                <q-icon
                  :color="message.type === 'send' ? 'green' : 'red'"
                  :name="
                    message.type === 'send'
                      ? 'mdi-call-made'
                      : 'mdi-call-received'
                  "
                  size="sm"
                />
                <q-item-label class="text-h6" style="white-space: pre-line">
                  {{message.payload}}
                </q-item-label>
              </div>
            </q-item-section>
            <q-item-section side>
              <q-item-label>
                {{ i18n('labels.serviceId', [message.serviceId]) }}
              </q-item-label>
              <q-item-label>
                {{
                  i18n('labels.characteristicId', [message.characteristicId])
                }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<style scoped></style>
