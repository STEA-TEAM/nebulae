<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { Ref, ref } from 'vue';
import { buffer2hex, falseThen, hex2buffer } from 'utils/common';

interface ManufacturerFilterView {
  companyIdentifier: string;
  dataPrefix: string;
  mask: string;
}

export interface Props {
  manufacturerData?: BluetoothManufacturerDataFilter[];
}

const props = defineProps<Props>();

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
defineEmits([...useDialogPluginComponent.emits]);

const manufacturerFilterViewList: Ref<ManufacturerFilterView[]> = ref([]);

props.manufacturerData?.forEach((manufacturer) => {
  manufacturerFilterViewList.value.push({
    companyIdentifier: manufacturer.companyIdentifier.toString(16).toUpperCase(),
    dataPrefix: currData?.dataPrefix ? buffer2hex(currData.dataPrefix) : '',
    mask: currData?.mask ? buffer2hex(currData.mask) : '',
  });
});

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

const updateServiceId = (index: number, value: string | null) => {
  manufacturerFilterViewList.value[index].service = value ?? '';
};
const updateServiceDataPrefix = (index: number, value: string | null) => {
  manufacturerFilterViewList.value[index].dataPrefix = value
    ? value?.toUpperCase()
    : '';
};
const updateServiceDataMask = (index: number, value: string | null) => {
  manufacturerFilterViewList.value[index].mask = value ? value?.toUpperCase() : '';
};

const onConfirm = () => {
  let services: BluetoothServiceUUID[] = [];
  let serviceData: BluetoothServiceDataFilter[] = [];
  manufacturerFilterViewList.value.forEach((serviceFilterView) => {
    if (serviceFilterView.service.length) {
      services.push(serviceFilterView.service);
      if (
        serviceFilterView.dataPrefix.length ||
        serviceFilterView.mask.length
      ) {
        serviceData.push({
          service: serviceFilterView.service,
          dataPrefix: serviceFilterView.dataPrefix.length
            ? hex2buffer(serviceFilterView.dataPrefix)
            : undefined,
          mask: serviceFilterView.mask.length
            ? hex2buffer(serviceFilterView.mask)
            : undefined,
        });
      }
    }
  });
  onDialogOK({ services, serviceData });
};
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin hide-scrollbar">
      <q-card-section>
        <div class="text-h5">Service Filters</div>
      </q-card-section>
      <q-card-section class="column q-gutter-y-md">
        <q-btn
          icon="add"
          label="Add Service"
          color="accent"
          dense
          no-caps
          @click="
            manufacturerFilterViewList.push({
              service: '',
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
                  :class="
                    falseThen(
                      serviceFilterView.service.length,
                      'text-grey text-italic'
                    )
                  "
                >
                  {{
                    serviceFilterView.service.length === 0
                      ? 'Enter Service ID'
                      : serviceFilterView.service
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
                  @click.prevent.stop="manufacturerFilterViewList.splice(index, 1)"
                />
              </q-item-section>
            </template>
            <div class="column q-gutter-y-sm q-pa-sm">
              <q-input
                :model-value="serviceFilterView.service"
                clearable
                outlined
                label="Service ID (name or UUID)"
                type="text"
                @update:model-value="updateServiceId(index, $event)"
              />
              <q-input
                :model-value="serviceFilterView.dataPrefix"
                clearable
                outlined
                label="Service Data Prefix"
                type="text"
                @keydown="checkHexInput"
                @update:model-value="updateServiceDataPrefix(index, $event)"
              />
              <q-input
                :model-value="serviceFilterView.mask"
                clearable
                outlined
                label="Service Data Mask"
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
          label="Confirm"
          no-caps
          @click="onConfirm"
        />
        <q-btn label="Cancel" no-caps outline @click="onDialogHide" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
