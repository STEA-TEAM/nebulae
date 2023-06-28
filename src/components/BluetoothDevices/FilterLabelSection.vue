<script setup lang="ts">
import { computed } from 'vue';

import { buffer2hex } from 'utils/common';
import { useI18n } from 'vue-i18n';

export interface Props {
  modelValue: BluetoothLEScanFilter;
}

const props = withDefaults(defineProps<Props>(), {});

const { t } = useI18n();
const i18n = (relativePath: string) => {
  return t('components.BluetoothDevices.FilterLabelSection.' + relativePath);
};

const filterLabel = computed(() => {
  let filterArray = [];
  if (props.modelValue.name) {
    filterArray.push(props.modelValue.name);
  }
  if (props.modelValue.namePrefix) {
    filterArray.push(props.modelValue.namePrefix);
  }
  return filterArray.length === 0
    ? i18n('labels.noFilter')
    : filterArray.join('; ');
});

const filterCaption = computed(() => {
  let filterArray = [];
  let serviceWithoutFilters: BluetoothServiceUUID[] = [
    ...(props.modelValue.services ?? []),
  ];
  if (props.modelValue.serviceData && props.modelValue.serviceData.length) {
    filterArray.push(
      props.modelValue.serviceData
        .map(({ service, dataPrefix, mask }) => {
          serviceWithoutFilters.splice(
            serviceWithoutFilters.indexOf(service),
            1
          );
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
  if (serviceWithoutFilters.length) {
    filterArray.push(
      serviceWithoutFilters.map((service) => `${String(service)}(*)`).join(', ')
    );
  }
  if (props.modelValue.manufacturerData) {
    filterArray.push(props.modelValue.manufacturerData.join(', '));
  }
  return filterArray.length === 0
    ? i18n('labels.noFilter')
    : filterArray.join('; ');
});
</script>

<template>
  <q-item-section>
    <q-item-label>
      {{ filterLabel }}
    </q-item-label>
    <q-item-label v-if="filterCaption" caption>
      {{ filterCaption }}
    </q-item-label>
  </q-item-section>
</template>

<style scoped></style>
