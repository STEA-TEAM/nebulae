<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import { bus } from 'boot/bus';
import DeviceFilters from 'components/BluetoothDeviceComponents/DeviceFilters.vue';
import OptionalServices from 'components/BluetoothDeviceComponents/OptionalServices.vue';
import RecognizedDevices from 'components/BluetoothDeviceComponents/RecognizedDevices.vue';
import { useBluetoothStore } from 'stores/bluetooth';
import { createI18n } from 'utils/common.ts';

withDefaults(
  defineProps<{
    mini?: boolean;
  }>(),
  {
    mini: false,
  },
);

const { connect } = useBluetoothStore();

const i18n = createI18n(useI18n(), 'components.BluetoothDevices.');

const connectDevice = async () => {
  if (await connect()) {
    bus.emit('drawer', 'close', 'right');
  }
};
</script>

<template>
  <div class="column q-pa-sm q-gutter-sm">
    <q-card bordered class="q-pa-sm q-gutter-y-sm" flat>
      <div>
        <div class="row justify-between">
          <div class="text-h5">
            {{ i18n('labels.deviceFinder') }}
          </div>
          <q-btn
            :label="i18n('labels.search')"
            color="positive"
            icon="mdi-bluetooth-connect"
            no-caps
            @click="connectDevice"
          />
        </div>
      </div>
      <div>
        <optional-services />
      </div>
      <div>
        <device-filters :mini="mini" />
      </div>
    </q-card>
    <recognized-devices />
  </div>
</template>

<style scoped></style>
