<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export interface Props {
  modelValue: BluetoothLEScanFilter;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(['delete', 'update:modelValue']);
const filter = computed({
  get: () => props.modelValue,
  set: (e) => emit('update:modelValue', e),
});

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
  if (filter.value.manufacturerData) {
    filterArray.push(filter.value.manufacturerData.join(', '));
  }
  return filterArray.length === 0
    ? i18n('labels.noFilter')
    : filterArray.join('; ');
});

// const checkDataFilter = (event: KeyboardEvent) => {
//   if (/^.$/.test(event.key) && !/^[0-9a-fA-F]$/.test(event.key)) {
//     event.preventDefault();
//   }
// };
// const updateDataFilter = (value: string | null) => {
//   dataFilter.value = value ? value?.toUpperCase() : '';
// };
</script>

<template>
  <q-expansion-item switch-toggle-side>
    <template v-slot:header>
      <q-item-section>
        <q-item-label>
          {{ filterLabel }}
        </q-item-label>
        <q-item-label v-if="excludeKeys.length" caption>
          {{ excludeKeys.join(', ') }}
        </q-item-label>
      </q-item-section>
      <q-item-section avatar side>
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
      <!--      <q-input-->
      <!--        :model-value="dataFilter"-->
      <!--        :placeholder="i18n('hints.dataFilter')"-->
      <!--        clearable-->
      <!--        dense-->
      <!--        type="search"-->
      <!--        @keydown="checkDataFilter"-->
      <!--        @update:modelValue="updateDataFilter"-->
      <!--      >-->
      <!--        <template v-slot:before>-->
      <!--          <q-icon name="mdi-broadcast" />-->
      <!--        </template>-->
      <!--        <template v-slot:prepend>-->
      <!--          <q-icon name="mdi-hexadecimal" />-->
      <!--        </template>-->
      <!--        <template v-slot:after>-->
      <!--          <q-btn dense flat icon="mdi-dots-vertical" round />-->
      <!--        </template>-->
      <!--      </q-input>-->
    </div>
  </q-expansion-item>
</template>

<style scoped></style>
