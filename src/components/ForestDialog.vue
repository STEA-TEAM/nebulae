<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    style="min-width: 50vw">
    <q-card class="q-dialog-plugin hide-scrollbar full-width">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>
      <HidDeviceForest :devices="forest"/>
      <q-card-actions align="right">
        <q-btn
          flat
          :label="cancelText"
          @click="cancel"/>
        <q-btn
          v-if="prompt"
          flat
          :label="confirmText"
          color="primary"
          @click="confirm"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {defineComponent} from "vue";
import {useDialogPluginComponent} from 'quasar'

import HidDeviceForest from "components/HidDeviceForest";

export default defineComponent({
  name: "ForestDialog",
  components: {HidDeviceForest},
  emits: [...useDialogPluginComponent.emits],
  props: {
    forest: {type: Array, default: () => [], required: true,},

    title: {type: String, default: "Forest",},
    confirmText: {type: String, default: "Confirm",},
    cancelText: {type: String, default: "Cancel",},

    prompt: {type: Boolean, default: false,},

    cancelCallback: {type: Function, default: () => {},},
    confirmCallback: {type: Function, default: () => {},},
  },
  setup() {
    const {dialogRef, onDialogHide} = useDialogPluginComponent();
    return {
      dialogRef,
      onDialogHide,
    }
  },
  methods: {
    cancel() {
      this.cancelCallback();
      this.hide();
    },
    confirm() {
      this.confirmCallback();
      this.hide();
    },
  },
});
</script>

<style scoped>

</style>
