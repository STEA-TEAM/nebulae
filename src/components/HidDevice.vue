<template>
  <q-card>
    <q-card-section class="full-width column q-gutter-y-sm">
      <RichSelect
        :disabled="connectedDevice !== null"
        :selectorLabel="i18n('selects.device')"
        :options="availableDevices"
        prepend-icon="mdi-information-outline"
        img-key="icon"
        caption-key="caption"
        cornerKey="corner"
        sideIcon="mdi-information-outline"
        :no-option="i18n('selects.noItem')"
        :model-value="selectedDevice"
        @update:modelValue="selectedDevice = $event"
        @click:prepend="queryDevice($event)"
        @click:side="queryDevice($event)"/>
      <div class="row q-gutter-x-sm">
        <q-btn
          v-if="!$q.platform.is.electron"
          class="col-grow"
          color="accent"
          icon-right="add"
          :label="i18n('buttons.request')"
          unelevated
          @click="newHID"/>
        <q-btn
          class="col-grow"
          :color="connectedDevice?'negative':'positive'"
          unelevated
          :icon-right="connectedDevice?'link_off':'link'"
          :label="connectedDevice?i18n('buttons.disconnect'):i18n('buttons.connect')"
          @click="connectedDevice?disconnectHID:connectHID"/>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent, watch} from 'vue'

import ForestDialog from "components/ForestDialog";

import {VendorIcons} from "src/scripts/vendorIcons";
import {sleep} from "src/scripts/utils";
import RichSelect from "components/RichSelect";

export default defineComponent({
  name: 'HidDevice',
  components: {RichSelect},
  data() {
    return {
      scanInterval: null,
      availableDevices: [],
      dialogOpen: false,
      selectedDevice: null,
      connectedDevice: null,
    }
  },
  created() {
    this.refreshDevices();
    this.scanInterval = setInterval(this.refreshDevices, 3000);
    watch(() => this.$hid.device, (value) => this.connectedDevice = value);
  },
  watch: {
    selectedDevice(value) {
      console.log(value);
    }
  },
  methods: {
    refreshDevices() {
      navigator["hid"]["getDevices"]().then(devices => {
        for (let i = 0; i < devices.length; i++) {
          devices[i].id = i;
          devices[i].icon = VendorIcons[devices[i].vendorId] ?
            VendorIcons[devices[i].vendorId] :
            'svg/unknown.svg';
          devices[i].label = devices[i].productName
            ? devices[i].productName
            : this.i18n('selects.defaultName');
          devices[i].caption = `VID: 0x${
            devices[i].vendorId
              ? devices[i].vendorId["toString"](16).toUpperCase().padStart(4, '0')
              : this.i18n('selects.defaultVID')
          }    PID: 0x${
            devices[i].productId
              ? devices[i].productId["toString"](16).toUpperCase().padStart(4, '0')
              : this.i18n('selects.defaultPID')
          }`;
          devices[i].corner = devices[i]["collections"].length + this.i18n('selects.unit');
        }
        this.availableDevices = devices;
      });
    },
    queryDevice(device) {
      if (device && !this.dialogOpen) {
        this.dialogOpen = true;
        this.$q.dialog({
          component: ForestDialog,
          componentProps: {
            forest: [device],
            title: this.i18n('infoDialog.title'),
            cancelText: this.i18n('infoDialog.cancelText'),
          }
        }).onDismiss(() =>
          this.dialogOpen = false
        );
      }
    },
    connectHID() {
      if (this.selectedDevice) {
        this.$hid.connect(this.selectedDevice);
      } else {
        this.$q.notify({
          type: 'warning',
          message: this.i18n('notifications.invalidDevice'),
          icon: 'device_unknown'
        });
      }
    },
    newHID() {
      navigator["hid"]["requestDevice"]({filters: []}).then(async devices => {
        if (devices.length !== 0) {
          console.log(devices);
          let checkResult = null;
          this.dialogOpen = true;
          this.$q.dialog({
            component: ForestDialog,
            componentProps: {
              forest: devices,

              title: this.i18n('checkDialog.title'),
              confirmText: this.i18n('checkDialog.confirmText'),
              cancelText: this.i18n('checkDialog.cancelText'),

              prompt: true,
              cancelCallback: () => checkResult = false,
              confirmCallback: () => checkResult = true,
            }
          }).onDismiss(() => this.dialogOpen = false);
          while (checkResult === null) {
            await sleep(100);
          }
          if (checkResult) {
            this.$hid.connect(devices[0]);
          }
        }
      });
    },
    disconnectHID() {
      this.$hid.disconnect();
    },
    i18n(relativePath) {
      return this.$t('components.hidDevice.' + relativePath);
    }
  },
  unmounted() {
    if (this.scanInterval) {
      clearInterval(this.scanInterval);
    }
  }
})
</script>
