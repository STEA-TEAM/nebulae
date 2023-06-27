<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';

export interface Props {
  services?: BluetoothServiceUUID[];
  serviceData?: BluetoothServiceDataFilter[];
}

const props = defineProps<Props>();

const { dialogRef, onDialogHide } = useDialogPluginComponent();
defineEmits([...useDialogPluginComponent.emits]);

const services = ref(props.services ?? []);
const serviceData = ref(props.serviceData ?? []);
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin hide-scrollbar">
      <q-card-section>
        <q-list>
          <q-item v-for="(service, index) in services" :key="index">

          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
