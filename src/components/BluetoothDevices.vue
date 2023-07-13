<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import { bus } from 'boot/bus';
import DeviceFilters from 'components/BluetoothDevices/DeviceFilters.vue';
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

const { connect } = useBluetoothStore();

const connectDevice = async () => {
  if (await connect()) {
    bus.emit('drawer', 'right', 'close');
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
