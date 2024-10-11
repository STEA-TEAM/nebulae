<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { buffer2hex, hex2buffer } from 'utils/data';
import { createI18n } from 'utils/common.ts';

interface ServiceFilterView {
  service: string;
  dataPrefix: string;
  mask: string;
}

const props = defineProps<{
  services?: BluetoothServiceUUID[];
  serviceData?: BluetoothServiceDataFilter[];
}>();

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

defineEmits([...useDialogPluginComponent.emits]);

const serviceFilterViewList = ref<ServiceFilterView[]>([]);

props.services?.forEach((service, index) => {
  const currData = props.serviceData?.[index];
  serviceFilterViewList.value.push({
    service: String(service),
    dataPrefix: currData?.dataPrefix ? buffer2hex(currData.dataPrefix) : '',
    mask: currData?.mask ? buffer2hex(currData.mask) : '',
  });
});

const i18n = createI18n(
  useI18n(),
  'components.BluetoothDeviceComponents.ServiceFilterDialog.',
);

const dataFilterLabel = (index: number) => {
  let resultArray = [];
  const currentServiceFilterView = serviceFilterViewList.value[index];
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
  serviceFilterViewList.value[index].service = (value ?? '').toString();
};
const updateServiceDataPrefix = (
  index: number,
  value: string | number | null,
) => {
  serviceFilterViewList.value[index].dataPrefix = value
    ? value?.toString().toUpperCase()
    : '';
};
const updateServiceDataMask = (
  index: number,
  value: string | number | null,
) => {
  serviceFilterViewList.value[index].mask = value
    ? value?.toString().toUpperCase()
    : '';
};

const onConfirm = () => {
  let services: BluetoothServiceUUID[] = [];
  let serviceData: BluetoothServiceDataFilter[] = [];
  serviceFilterViewList.value.forEach((serviceFilterView) => {
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
        <div class="text-h5">{{ i18n('labels.title') }}</div>
      </q-card-section>
      <q-card-section class="column q-gutter-y-md">
        <q-btn
          icon="add"
          :label="i18n('labels.addFilter')"
          color="primary"
          dense
          no-caps
          @click="
            serviceFilterViewList.push({
              service: '',
              dataPrefix: '',
              mask: '',
            })
          "
        />
        <q-list v-if="serviceFilterViewList.length" bordered separator>
          <q-expansion-item
            v-for="(serviceFilterView, index) in serviceFilterViewList"
            :key="index"
            :default-opened="index === serviceFilterViewList.length - 1"
            group="service-filter-view-list"
            switch-toggle-side
          >
            <template v-slot:header>
              <q-item-section>
                <q-item-label
                  :class="{
                    'text-grey text-italic': !serviceFilterView.service.length,
                  }"
                >
                  {{
                    serviceFilterView.service.length === 0
                      ? i18n('labels.noId')
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
                  @click.prevent.stop="serviceFilterViewList.splice(index, 1)"
                />
              </q-item-section>
            </template>
            <div class="column q-gutter-y-sm q-pa-sm">
              <q-input
                :model-value="serviceFilterView.service"
                clearable
                outlined
                :label="i18n('labels.id')"
                type="text"
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
