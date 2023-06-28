<script lang="ts" setup>
import { extend, useQuasar } from 'quasar';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import ServiceFilterDialog from 'components/BluetoothDevices/ServiceFilterDialog.vue';
import FilterLabelSection from 'components/BluetoothDevices/FilterLabelSection.vue';

export interface Props {
  modelValue: BluetoothLEScanFilter;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(['delete', 'update:modelValue']);
const filter = computed({
  get: () => props.modelValue,
  set: (e) => emit('update:modelValue', e),
});

const { dialog } = useQuasar();
const { t } = useI18n();
const i18n = (relativePath: string) => {
  return t('components.BluetoothDevices.DeviceFilter.' + relativePath);
};

const editManufacturers = () => {
  console.log('editManufacturers');
};

const editServices = () => {
  dialog({
    component: ServiceFilterDialog,
    componentProps: {
      services: filter.value.services,
      serviceData: filter.value.serviceData,
    },
  }).onOk(
    (data: {
      services: BluetoothServiceUUID[];
      serviceData: BluetoothServiceDataFilter[];
    }) => {
      let currentFilter: {
        services?: BluetoothServiceUUID[];
        serviceData?: BluetoothServiceDataFilter[];
      } = extend({}, filter.value);
      currentFilter.services = data.services;
      currentFilter.serviceData = data.serviceData;
      console.log(currentFilter);
      filter.value = currentFilter;
    }
  );
};
</script>

<template>
  <q-expansion-item group="device-filters" switch-toggle-side>
    <template v-slot:header>
      <filter-label-section v-model="filter" />
      <q-item-section side>
        <q-btn
          color="negative"
          flat
          icon="mdi-delete"
          round
          @click.prevent.stop="emit('delete')"
        />
      </q-item-section>
    </template>
    <div class="column q-pa-sm q-gutter-y-sm">
      <q-input
        v-model="filter['name']"
        :placeholder="i18n('hints.nameFilter')"
        clearable
        dense
      >
        <template v-slot:before>
          <q-icon name="search" />
        </template>
        <template v-slot:after>
          <q-btn dense flat icon="mdi-dots-vertical" round />
        </template>
      </q-input>
      <q-input
        v-model="filter['namePrefix']"
        :placeholder="i18n('hints.namePrefixFilter')"
        clearable
        dense
      >
        <template v-slot:before>
          <q-icon name="mdi-regex" />
        </template>
        <template v-slot:after>
          <q-btn dense flat icon="mdi-dots-vertical" round />
        </template>
      </q-input>
      <div class="row q-gutter-sm">
        <q-btn
          :label="i18n('labels.editManufacturers')"
          class="col-grow"
          color="amber"
          dense
          icon="mdi-factory"
          no-caps
          outline
          @click="editManufacturers"
        />
        <q-btn
          :label="i18n('labels.editServices')"
          class="col-grow"
          color="amber"
          dense
          icon="mdi-chart-donut-variant"
          no-caps
          outline
          @click="editServices"
        />
      </div>
    </div>
  </q-expansion-item>
</template>

<style scoped></style>
