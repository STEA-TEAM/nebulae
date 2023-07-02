<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useBluetoothStore } from 'stores/bluetooth';
import { storeToRefs } from 'pinia';

const { t } = useI18n();
const i18n = (relativePath: string) => {
  return t('components.BluetoothDevices.OptionalServices.' + relativePath);
};

const { currentOptionalServices } = storeToRefs(useBluetoothStore());
const { addOptionalService, removeOptionalService } = useBluetoothStore();

const saveAndLoad = () => {
  console.log('saveAndLoad');
};

const updateServiceId = (index: number, value: string | null) => {
  currentOptionalServices.value[index] = value ?? '';
};
</script>

<template>
  <div class="column q-pa-sm q-gutter-y-sm">
    <div class="text-h6">
      {{ i18n('labels.title') }}
    </div>
    <div class="row q-gutter-sm">
      <q-btn
        :label="i18n('labels.addService')"
        class="col-grow"
        color="primary"
        dense
        icon="mdi-chart-donut"
        no-caps
        @click="addOptionalService"
      />
      <q-btn
        :label="i18n('labels.saveAndLoad')"
        class="col-grow"
        color="accent"
        dense
        icon="mdi-book-sync-outline"
        no-caps
        @click="saveAndLoad"
      />
    </div>
    <q-input
      v-for="(currentOptionalService, index) in currentOptionalServices"
      :key="index"
      :model-value="currentOptionalService"
      :placeholder="i18n('labels.serviceId')"
      clearable
      dense
      outlined
      type="text"
      @update:model-value="updateServiceId(index, $event)"
    >
      <template v-slot:after>
        <q-btn
          color="negative"
          flat
          icon="mdi-delete"
          round
          @click.prevent.stop="removeOptionalService(index)"
        />
      </template>
    </q-input>
  </div>
</template>

<style scoped></style>
