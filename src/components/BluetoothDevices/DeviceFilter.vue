<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { trueThen } from 'utils/common';

const { t } = useI18n();
const i18n = (relativePath: string) => {
  return t('components.BluetoothDevices.DeviceFilter.' + relativePath);
};

const nameFilter = ref('');
const dataFilter = ref('');
const excludeKeys = ref([]);

const filterLabel = computed(() => {
  let filterArray = [];
  if (nameFilter.value) {
    filterArray.push(nameFilter.value);
  }
  if (dataFilter.value) {
    filterArray.push(`0x${dataFilter.value}`);
  }
  return filterArray.length === 0
    ? i18n('labels.noFilter')
    : filterArray.join(', ');
});

const checkDataFilter = (event: KeyboardEvent) => {
  if (/^.$/.test(event.key) && !/^[0-9a-fA-F]$/.test(event.key)) {
    event.preventDefault();
  }
};
const updateDataFilter = (value: string | null) => {
  dataFilter.value = value ? value?.toUpperCase() : '';
};
</script>

<template>
  <q-expansion-item
    :label="filterLabel"
    :caption="trueThen(excludeKeys.length, excludeKeys.join(', '))"
  >
    <div class="column q-pa-sm q-gutter-y-sm">
      <q-input
        clearable
        dense
        :placeholder="i18n('hints.nameFilter')"
        v-model="nameFilter"
      >
        <template v-slot:before>
          <q-icon name="search" />
        </template>
        <template v-slot:after>
          <q-btn dense flat icon="mdi-dots-vertical" round />
        </template>
      </q-input>
      <q-input
        clearable
        dense
        :placeholder="i18n('hints.dataFilter')"
        type="search"
        :model-value="dataFilter"
        @keydown="checkDataFilter"
        @update:modelValue="updateDataFilter"
      >
        <template v-slot:before>
          <q-icon name="mdi-broadcast" />
        </template>
        <template v-slot:prepend>
          <q-icon name="mdi-hexadecimal" />
        </template>
        <template v-slot:after>
          <q-btn dense flat icon="mdi-dots-vertical" round />
        </template>
      </q-input>
    </div>
  </q-expansion-item>
</template>

<style scoped></style>
