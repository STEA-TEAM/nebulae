<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

import DeviceFilter from 'components/BluetoothDevices/DeviceFilter.vue';
import { useBluetoothStore } from 'stores/bluetooth';
import OptionalServices from 'components/BluetoothDevices/OptionalServices.vue';

export interface Props {
  mini?: boolean;
}

withDefaults(defineProps<Props>(), {
  mini: false,
});

const { t } = useI18n();
const i18n = (relativePath: string) => {
  return t('components.BluetoothDevices.' + relativePath);
};

const { recognizedDevices, currentFilters } = storeToRefs(useBluetoothStore());
const { removeRecognizedDevice, addFilter, connect, removeFilter } =
  useBluetoothStore();

const openFilterDialog = () => {
  console.log('openFilterDialog');
};
</script>

<template>
  <div class="column">
    <optional-services />
    <q-separator />
    <div class="column q-pa-sm q-gutter-y-sm">
      <div :class="mini ? 'column' : 'row'" class="q-gutter-x-sm">
        <q-btn
          :label="i18n('labels.search')"
          class="col-grow"
          color="positive"
          dense
          icon="mdi-bluetooth-connect"
          no-caps
          @click="connect"
        />
        <q-btn
          :icon="mini ? 'settings' : 'add'"
          :label="i18n(`labels.${mini ? 'editFilters' : 'addFilter'}`)"
          class="col-grow"
          color="accent"
          dense
          no-caps
          @click="mini ? openFilterDialog() : addFilter()"
        />
      </div>
    </div>
    <q-separator v-show="currentFilters.length" />
    <template v-if="!mini">
      <device-filter
        v-for="(currentFilter, index) in currentFilters"
        :key="index"
        :model-value="currentFilter"
        @delete="removeFilter(index)"
        @update:model-value="currentFilters[index] = $event"
      />
    </template>
    <q-separator />
    <q-list>
      <q-item
        v-for="(deviceName, deviceId, index) in recognizedDevices"
        :key="index"
      >
        <q-item-section avatar>
          <q-icon name="mdi-bluetooth" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ i18n('labels.deviceName') }}
            {{ deviceName ?? i18n('labels.noName') }}
          </q-item-label>
          <q-item-label caption>
            {{ i18n('labels.deviceId') }}{{ deviceId }}
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
      </q-item>
    </q-list>
    <div class="row"></div>
  </div>
</template>

<style scoped></style>
