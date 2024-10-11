<script lang="ts" setup>
import { extend, useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

import FilterLabelSection from 'components/BluetoothDeviceComponents/FilterLabelSection.vue';
import ManufacturerFilterDialog from 'components/BluetoothDeviceComponents/ManufacturerFilterDialog.vue';
import ServiceFilterDialog from 'components/BluetoothDeviceComponents/ServiceFilterDialog.vue';
import { useBluetoothStore } from 'stores/bluetooth';
import { storeToRefs } from 'pinia';
import { createI18n } from 'utils/common.ts';

export interface Props {
  mini?: boolean;
}

withDefaults(defineProps<Props>(), {
  mini: false,
});

const { dialog } = useQuasar();
const { currentFilters } = storeToRefs(useBluetoothStore());
const { addFilter, removeFilter } = useBluetoothStore();

const i18n = createI18n(
  useI18n(),
  'components.BluetoothDeviceComponents.DeviceFilters.',
);

const openFilterDialog = () => {
  console.log('openFilterDialog');
};

const updateName = (index: number, name: string | number | null) => {
  let currentFilter: { name?: string } = extend(
    {},
    currentFilters.value[index],
  );
  currentFilter.name = name?.toString() ?? undefined;
  currentFilters.value[index] = currentFilter;
};

const updateNamePrefix = (
  index: number,
  namePrefix: string | number | null,
) => {
  let currentFilter: { namePrefix?: string } = extend(
    {},
    currentFilters.value[index],
  );
  currentFilter.namePrefix = namePrefix?.toString() ?? undefined;
  currentFilters.value[index] = currentFilter;
};

const editManufacturers = (index: number) => {
  dialog({
    component: ManufacturerFilterDialog,
    componentProps: {
      manufacturerData: currentFilters.value[index].manufacturerData,
    },
  }).onOk((manufacturerData: BluetoothManufacturerDataFilter[]) => {
    let currentFilter: {
      manufacturerData?: BluetoothManufacturerDataFilter[];
    } = extend({}, currentFilters.value[index]);
    currentFilter.manufacturerData = manufacturerData;
    console.log(currentFilter);
    currentFilters.value[index] = currentFilter;
  });
};

const editServices = (index: number) => {
  dialog({
    component: ServiceFilterDialog,
    componentProps: {
      services: currentFilters.value[index].services,
      serviceData: currentFilters.value[index].serviceData,
    },
  }).onOk(
    (data: {
      services: BluetoothServiceUUID[];
      serviceData: BluetoothServiceDataFilter[];
    }) => {
      let currentFilter: {
        services?: BluetoothServiceUUID[];
        serviceData?: BluetoothServiceDataFilter[];
      } = extend({}, currentFilters.value[index]);
      currentFilter.services = data.services;
      currentFilter.serviceData = data.serviceData;
      currentFilters.value[index] = currentFilter;
    },
  );
};
</script>

<template>
  <q-card bordered flat>
    <q-card-section>
      <div class="row justify-between">
        <div class="text-h6">
          {{ i18n('labels.deviceFilters') }}
        </div>
        <q-btn
          :icon="mini ? 'settings' : 'add'"
          :label="i18n(`labels.${mini ? 'editFilters' : 'addFilter'}`)"
          color="accent"
          no-caps
          @click="mini ? openFilterDialog() : addFilter()"
        />
      </div>
    </q-card-section>
    <q-separator v-show="currentFilters.length" inset />
    <div v-if="!mini" class="column q-mx-md">
      <q-expansion-item
        v-for="(currentFilter, index) in currentFilters"
        :key="index"
        group="device-filters"
        switch-toggle-side
      >
        <template v-slot:header>
          <filter-label-section :model-value="currentFilter" />
          <q-item-section side>
            <q-btn
              color="negative"
              flat
              icon="mdi-delete"
              round
              @click.prevent.stop="removeFilter(index)"
            />
          </q-item-section>
        </template>
        <div class="column q-pa-sm q-gutter-y-sm">
          <q-input
            :model-value="currentFilter['name']"
            :placeholder="i18n('hints.nameFilter')"
            clearable
            dense
            @update:model-value="updateName(index, $event)"
          >
            <template v-slot:before>
              <q-icon name="search" />
            </template>
            <template v-slot:after>
              <q-btn dense flat icon="mdi-dots-vertical" round />
            </template>
          </q-input>
          <q-input
            :model-value="currentFilter['namePrefix']"
            :placeholder="i18n('hints.namePrefixFilter')"
            clearable
            dense
            @update:model-value="updateNamePrefix(index, $event)"
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
              @click="editManufacturers(index)"
            />
            <q-btn
              :label="i18n('labels.editServices')"
              class="col-grow"
              color="amber"
              dense
              icon="mdi-chart-donut-variant"
              no-caps
              outline
              @click="editServices(index)"
            />
          </div>
        </div>
      </q-expansion-item>
    </div>
  </q-card>
</template>

<style scoped></style>
