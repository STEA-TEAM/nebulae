<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

import DeviceFilter from 'components/BluetoothDevices/DeviceFilter.vue';
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

const openFilterDialog = () => {
  console.log('openFilterDialog');
};
</script>

<template>
  <div class="column">
    <div :class="mini ? 'column' : 'row'" class="q-pa-sm q-gutter-sm">
      <q-btn
        class="col-grow"
        color="positive"
        dense
        :label="i18n('labels.search')"
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
    <div class="row"></div>
  </div>
</template>

<style scoped></style>
