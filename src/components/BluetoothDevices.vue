<script setup lang="ts">
import DeviceFilter from 'components/BluetoothDevices/DeviceFilter.vue';

export interface Props {
  mini?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mini: false,
});
</script>

<template>
  <div class="column">
    <device-filter />
    <q-separator />
    <div class="row"></div>
  </div>
</template>

<style scoped></style>
