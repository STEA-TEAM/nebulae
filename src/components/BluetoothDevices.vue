<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import DeviceFilter from 'components/BluetoothDevices/DeviceFilter.vue';
import { useBluetoothStore } from 'stores/bluetooth';

export interface Props {
  mini?: boolean;
}

withDefaults(defineProps<Props>(), {
  mini: false,
});

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
        color="primary"
        dense
        label="Search Device"
        no-caps
        @click="connect"
      />
      <q-btn
        :icon="mini ? 'settings' : 'add'"
        :label="mini ? 'Edit Filters' : 'Add Filter'"
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
