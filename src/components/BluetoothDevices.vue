<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import DeviceFilter from 'components/BluetoothDevices/DeviceFilter.vue';
import { useBluetoothStore } from 'stores/bluetooth';

export interface Props {
  mini?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mini: false,
});

const { currentFilters } = storeToRefs(useBluetoothStore());
const { addFilter, connect, removeFilter } = useBluetoothStore();
</script>

<template>
  <div class="column">
    <div class="row">
      <q-btn
        class="col-grow q-ma-sm"
        color="accent"
        dense
        icon="add"
        label="Add Filter"
        no-caps
        @click="addFilter"
      />
      <q-btn
        class="col-grow q-ma-sm"
        color="primary"
        dense
        label="Search Device"
        no-caps
        @click="connect"
      />
    </div>
    <q-separator v-show="currentFilters.length" />
    <device-filter
      v-for="(currentFilter, index) in currentFilters"
      :key="index"
      :model-value="currentFilter"
      @delete="removeFilter(index)"
      @update:model-value="currentFilters[index] = $event"
    />
    <q-separator />
    <div class="row"></div>
  </div>
</template>

<style scoped></style>
