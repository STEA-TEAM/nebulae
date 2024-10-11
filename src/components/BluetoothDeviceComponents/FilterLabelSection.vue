<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { createI18n } from 'utils/common.ts';
import { buffer2hex } from 'utils/data';

const props = withDefaults(
  defineProps<{
    modelValue: BluetoothLEScanFilter;
  }>(),
  {},
);

const i18n = createI18n(
  useI18n(),
  'components.BluetoothDeviceComponents.FilterLabelSection.',
);

const filterLabel = computed(() => {
  let filterArray = [];
  if (props.modelValue.name) {
    filterArray.push(props.modelValue.name);
  }
  if (props.modelValue.namePrefix) {
    filterArray.push(props.modelValue.namePrefix + '*');
  }
  return filterArray.length === 0
    ? i18n('labels.noFilter')
    : filterArray.join('; ');
});

const serviceFilterCaption = computed(() => {
  let filterArray = [];
  let serviceWithoutFilters: BluetoothServiceUUID[] = [
    ...(props.modelValue.services ?? []),
  ];
  if (props.modelValue.serviceData && props.modelValue.serviceData.length) {
    filterArray.push(
      ...props.modelValue.serviceData.map(({ service, dataPrefix, mask }) => {
        serviceWithoutFilters.splice(serviceWithoutFilters.indexOf(service), 1);
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
      }),
    );
  }
  if (serviceWithoutFilters.length) {
    filterArray.push(
      ...serviceWithoutFilters.map((service) => `${String(service)}(*)`),
    );
  }
  return filterArray.length === 0
    ? i18n('labels.noFilter')
    : filterArray.join(', ');
});

const manufacturerFilterCaption = computed(() => {
  if (
    props.modelValue.manufacturerData &&
    props.modelValue.manufacturerData.length
  ) {
    return props.modelValue.manufacturerData
      .map(({ companyIdentifier, dataPrefix, mask }) => {
        let dataPrefixList: string[] = [];
        if (dataPrefix) {
          dataPrefixList.push(`${buffer2hex(dataPrefix)}*`);
        }
        if (mask) {
          dataPrefixList.push(`${buffer2hex(mask)}&`);
        }
        return `0x${companyIdentifier}(${
          dataPrefixList.length ? dataPrefixList.join(', ') : '*'
        })`;
      })
      .join(', ');
  }
  return i18n('labels.noFilter');
});
</script>

<template>
  <q-item-section>
    <q-item-label>
      {{ filterLabel }}
    </q-item-label>
    <q-item-label v-if="manufacturerFilterCaption" caption>
      {{ i18n('labels.manufacturers') }}{{ manufacturerFilterCaption }}
    </q-item-label>
    <q-item-label v-if="serviceFilterCaption" caption>
      {{ i18n('labels.services') }}{{ serviceFilterCaption }}
    </q-item-label>
  </q-item-section>
</template>

<style scoped></style>
