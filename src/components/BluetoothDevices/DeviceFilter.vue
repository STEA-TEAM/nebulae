<script lang="ts" setup>
import { extend, useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ServiceDialog from 'components/BluetoothDevices/ServiceDialog.vue';
import { buffer2hex } from 'utils/common';

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

const excludeKeys = ref([]);

const filterLabel = computed(() => {
  let filterArray = [];
  if (filter.value.name) {
    filterArray.push(filter.value.name);
  }
  if (filter.value.namePrefix) {
    filterArray.push(filter.value.namePrefix);
  }
  if (filter.value.services) {
    filterArray.push(
      filter.value.services.map((service) => `${String(service)}(*)`).join(', ')
    );
  }
  if (filter.value.serviceData) {
    filterArray.push(
      filter.value.serviceData
        .map(({ service, dataPrefix, mask }) => {
          let dataPrefixList: string[] = [];
          if (dataPrefix) {
            dataPrefixList.push(`${buffer2hex(dataPrefix)}*`);
          }
          if (mask) {
            dataPrefixList.push(`${buffer2hex(mask)}&`);
          }
          return `${String(service)}(${
            dataPrefixList.length ? dataPrefixList.join(', ') : '*'
          })`;
        })
        .join(', ')
    );
  }
  if (filter.value.manufacturerData) {
    filterArray.push(filter.value.manufacturerData.join(', '));
  }
  return filterArray.length === 0
    ? i18n('labels.noFilter')
    : filterArray.join('; ');
});

const editServices = () => {
  dialog({
    component: ServiceDialog,
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

const editManufacturers = () => {
  console.log('editServices');
};
</script>

<template>
  <q-expansion-item group="device-filters" switch-toggle-side>
    <template v-slot:header>
      <q-item-section>
        <q-item-label>
          {{ filterLabel }}
        </q-item-label>
        <q-item-label v-if="excludeKeys.length" caption>
          {{ excludeKeys.join(', ') }}
        </q-item-label>
      </q-item-section>
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
          :label="i18n('labels.editServices')"
          class="col-grow"
          color="amber"
          dense
          icon="mdi-chart-donut-variant"
          no-caps
          outline
          @click="editServices"
        />
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
      </div>
    </div>
  </q-expansion-item>
</template>

<style scoped></style>
