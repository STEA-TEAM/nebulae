<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

import { broadcastManager } from 'boot/managers';
import DeviceFilter from 'components/BluetoothDevices/DeviceFilter.vue';
import OptionalServices from 'components/BluetoothDevices/OptionalServices.vue';
import RecognizedDevices from 'components/BluetoothDevices/RecognizedDevices.vue';
import { useBluetoothStore } from 'stores/bluetooth';

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

const { currentFilters } = storeToRefs(useBluetoothStore());
const { addFilter, connect, removeFilter } = useBluetoothStore();

const connectDevice = async () => {
  if (await connect()) {
    broadcastManager.postMessage('rightDrawer', {
      action: 'close',
    });
  }
};

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
          @click="connectDevice"
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
    <recognized-devices />
  </div>
</template>

<style scoped></style>
