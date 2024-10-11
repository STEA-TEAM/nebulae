<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { buffer2hex, hex2buffer } from 'utils/data';
import { createI18n } from 'utils/common.ts';

interface ManufacturerFilterView {
  companyIdentifier: string;
  dataPrefix: string;
  mask: string;
}

const props = defineProps<{
  manufacturerData?: BluetoothManufacturerDataFilter[];
}>();

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

defineEmits([...useDialogPluginComponent.emits]);

const manufacturerFilterViewList = ref<ManufacturerFilterView[]>([]);

props.manufacturerData?.forEach((manufacturer) => {
  manufacturerFilterViewList.value.push({
    companyIdentifier: manufacturer.companyIdentifier
      .toString(16)
      .toUpperCase(),
    dataPrefix: manufacturer?.dataPrefix
      ? buffer2hex(manufacturer.dataPrefix)
      : '',
    mask: manufacturer?.mask ? buffer2hex(manufacturer.mask) : '',
  });
});

const i18n = createI18n(
  useI18n(),
  'components.BluetoothDeviceComponents.ManufacturerFilterDialog.',
);

const dataFilterLabel = (index: number) => {
  let resultArray = [];
  const currentServiceFilterView = manufacturerFilterViewList.value[index];
  if (currentServiceFilterView?.dataPrefix) {
    resultArray.push(currentServiceFilterView.dataPrefix);
  }
  if (currentServiceFilterView?.mask) {
    resultArray.push(currentServiceFilterView.mask);
  }
  return resultArray.join('; ');
};

const checkHexInput = (event: KeyboardEvent) => {
  if (/^.$/.test(event.key) && !/^[0-9a-fA-F]$/.test(event.key)) {
    event.preventDefault();
  }
};

const updateServiceId = (index: number, value: string | number | null) => {
  manufacturerFilterViewList.value[index].companyIdentifier = value
    ? value?.toString().toUpperCase()
    : '';
};
const updateServiceDataPrefix = (
  index: number,
  value: string | number | null,
) => {
  manufacturerFilterViewList.value[index].dataPrefix = value
    ? value?.toString().toUpperCase()
    : '';
};
const updateServiceDataMask = (
  index: number,
  value: string | number | null,
) => {
  manufacturerFilterViewList.value[index].mask = value
    ? value?.toString().toUpperCase()
    : '';
};

const onConfirm = () => {
  let manufacturerData: BluetoothManufacturerDataFilter[] = [];
  manufacturerFilterViewList.value.forEach((manufacturerFilterView) => {
    if (manufacturerFilterView.companyIdentifier.length) {
      manufacturerData.push({
        companyIdentifier: Number(
          '0x' + manufacturerFilterView.companyIdentifier,
        ),
        dataPrefix: manufacturerFilterView.dataPrefix.length
          ? hex2buffer(manufacturerFilterView.dataPrefix)
          : undefined,
        mask: manufacturerFilterView.mask.length
          ? hex2buffer(manufacturerFilterView.mask)
          : undefined,
      });
    }
  });
  onDialogOK(manufacturerData);
};
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin hide-scrollbar">
      <q-card-section>
        <div class="text-h5">{{ i18n('labels.title') }}</div>
      </q-card-section>
      <q-card-section class="column q-gutter-y-md">
        <q-btn
          icon="add"
          :label="i18n('labels.addFilter')"
          color="accent"
          dense
          no-caps
          @click="
            manufacturerFilterViewList.push({
              companyIdentifier: '',
              dataPrefix: '',
              mask: '',
            })
          "
        />
        <q-list v-if="manufacturerFilterViewList.length" bordered separator>
          <q-expansion-item
            v-for="(serviceFilterView, index) in manufacturerFilterViewList"
            :key="index"
            :default-opened="index === manufacturerFilterViewList.length - 1"
            group="service-filter-view-list"
            switch-toggle-side
          >
            <template v-slot:header>
              <q-item-section>
                <q-item-label
                  :class="{
                    'text-grey text-italic':
                      !serviceFilterView.companyIdentifier.length,
                  }"
                >
                  {{
                    serviceFilterView.companyIdentifier.length === 0
                      ? i18n('labels.noId')
                      : serviceFilterView.companyIdentifier
                  }}
                </q-item-label>
                <q-item-label v-if="dataFilterLabel(index)" caption>
                  {{ dataFilterLabel(index) }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  color="negative"
                  flat
                  icon="mdi-delete"
                  round
                  @click.prevent.stop="
                    manufacturerFilterViewList.splice(index, 1)
                  "
                />
              </q-item-section>
            </template>
            <div class="column q-gutter-y-sm q-pa-sm">
              <q-input
                :model-value="serviceFilterView.companyIdentifier"
                clearable
                outlined
                :label="i18n('labels.id')"
                type="text"
                @keydown="checkHexInput"
                @update:model-value="updateServiceId(index, $event)"
              />
              <q-input
                :model-value="serviceFilterView.dataPrefix"
                clearable
                outlined
                :label="i18n('labels.prefix')"
                type="text"
                @keydown="checkHexInput"
                @update:model-value="updateServiceDataPrefix(index, $event)"
              />
              <q-input
                :model-value="serviceFilterView.mask"
                clearable
                outlined
                :label="i18n('labels.mask')"
                type="text"
                @keydown="checkHexInput"
                @update:model-value="updateServiceDataMask(index, $event)"
              />
            </div>
          </q-expansion-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          color="primary"
          flat
          :label="i18n('labels.confirm')"
          no-caps
          @click="onConfirm"
        />
        <q-btn
          :label="i18n('labels.cancel')"
          no-caps
          outline
          @click="onDialogHide"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
