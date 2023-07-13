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

const updateServiceId = (index: number, value: string | number | null) => {
  currentOptionalServices.value[index] = (value ?? '').toString();
};
</script>

<template>
  <q-card bordered flat>
    <q-card-section>
      <div class="row justify-between items-center">
        <div class="text-h6">
          {{ i18n('labels.title') }}
        </div>
        <q-btn
          :label="i18n('labels.saveAndLoad')"
          color="accent"
          dense
          icon="mdi-book-sync-outline"
          no-caps
          @click="saveAndLoad"
        />
        <q-btn
          :label="i18n('labels.addService')"
          color="primary"
          dense
          icon="mdi-chart-donut"
          no-caps
          @click="addOptionalService"
        />
      </div>
    </q-card-section>
    <q-separator v-show="currentOptionalServices.length" inset />
    <q-card-section class="q-gutter-y-sm">
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
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
