<template>
  <q-card>
    <q-card-section class="full-width column q-gutter-y-sm">
      <div class="col-auto row">
        <q-input
          class="col-6 q-pr-md"
          bottom-slots
          dense
          :disable="connectedDevice !== null"
          label="Vendor ID"
          mask="XXXX"
          maxlength="4"
          reverse-fill-mask
          unmasked-value
          :model-value="manualInputDevice.vendorId"
          @update:modelValue="updateVendorId($event)"
          :rules="[hexRule]">
          <template v-slot:hint>
            4-digit Hex
          </template>
        </q-input>
        <q-input
          class="col-6 q-pl-md"
          bottom-slots
          dense
          :disable="connectedDevice !== null"
          label="Product ID"
          mask="XXXX"
          maxlength="4"
          reverse-fill-mask
          unmasked-value
          :model-value="manualInputDevice.productId"
          @update:modelValue="updateProductId($event)"
          :rules="[hexRule]">
          <template v-slot:hint>
            4-digit Hex
          </template>
        </q-input>
      </div>
      <q-select
        clearable
        color="primary"
        dense
        :disable="connectedDevice !== null"
        :display-value="selectedDevice ? `${selectedDevice.productName}` : null"
        dropdown-icon="expand_less"
        label="Select Device"
        menu-anchor="top left"
        menu-self="bottom left"
        options-dense
        options-selected-class="text-primary"
        outlined
        :options="availableDevices"
        :model-value="selectedDevice"
        @update:modelValue="selectedDevice = $event">
        <template v-slot:prepend>
          <q-icon
            name="mdi-information-outline"
            :color="selectedDevice ?`primary`:``"
            @click.stop.prevent="queryDevice(selectedDevice)"/>
        </template>
        <template v-slot:option="item">
          <q-item v-bind="item['itemProps']" dense>
            <q-item-section avatar>
              <q-avatar>
                <img :src="item['opt'].icon" alt="vendorIcon"/>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ item['opt'].productName ? item['opt'].productName : 'Anonymous' }}
              </q-item-label>
              <q-item-label caption>
                VID: {{
                  item['opt'].vendorId ? item['opt'].vendorId["toString"](16).toUpperCase().padStart(4, '0') : 'Unknown'
                }}
                &emsp;
                PID: {{
                  item['opt'].productId ? item['opt'].productId["toString"](16).toUpperCase().padStart(4, '0') : 'Unknown'
                }}
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-item-label caption>
                {{ item['opt']['collections'].length }} collections
              </q-item-label>
              <q-btn
                color="primary"
                dense
                flat
                icon="mdi-information-outline"
                @click.stop.prevent="queryDevice(item['opt'])">
              </q-btn>
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-italic text-grey">
              No device available
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-btn
        class="col-grow"
        v-show="!connectedDevice"
        color="positive"
        icon-right="link"
        label="Connect"
        unelevated
        @click="connectHID"/>
      <q-btn
        class="col-grow"
        v-show="connectedDevice"
        color="red"
        unelevated
        icon-right="link"
        label="Disconnect"
        @click="disconnectHID"/>

      <q-chip
        class="text-center"
        clickable
        color="primary"
        dense
        :disable="connectedDevice !== null"
        icon="help_outline"
        outline
        @click="newHID">
        Device not on the list?
      </q-chip>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent, watch} from 'vue'

import ForestDialog from "components/ForestDialog";

import {HidDevice} from "boot/hid";
import {VendorIcons} from "src/scripts/vendorIcons";
import {sleep} from "src/scripts/utils";

export default defineComponent({
  name: 'DevicePanel',
  data() {
    return {
      scanInterval: null,
      availableDevices: [],
      manualInputDevice: {
        vendorId: '',
        productId: '',
      },
      dialogOpen: false,
      selectedDevice: null,
      connectedDevice: null,
    }
  },
  created() {
    this.refreshDevices();
    this.scanInterval = setInterval(this.refreshDevices, 3000);
    watch(() => HidDevice.device, (value) => this.connectedDevice = value);
  },
  watch: {
    selectedDevice(value) {
      console.log(value);
      if (value) {
        this.manualInputDevice.vendorId = value.vendorId["toString"](16).toUpperCase().padStart(4, '0');
        this.manualInputDevice.productId = value.productId["toString"](16).toUpperCase().padStart(4, '0');
      } else {
        this.manualInputDevice.vendorId = '';
        this.manualInputDevice.productId = '';
      }
    }
  },
  methods: {
    refreshDevices() {
      navigator["hid"]["getDevices"]().then(devices => {
        for (let i = 0; i < devices.length; i++) {
          devices[i].icon = VendorIcons[devices[i].vendorId] ?
            VendorIcons[devices[i].vendorId] :
            'svg/unknown.svg';
          devices[i].id = i;
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
    hexRule(value) {
      if (!value) {
        return;
      }
      if (value.hasOwnProperty("length") &&
        value.search(/[G-Z]+/) === -1) {
        return true;
      }
      return 'Invalid vendor ID';
    },
    updateVendorId(event) {
      this.updateSelectedDevice();
      this.manualInputDevice.vendorId = event;
    },
    updateProductId(event) {
      this.updateSelectedDevice();
      this.manualInputDevice.productId = event;
    },
    updateSelectedDevice() {
      this.availableDevices.forEach(device => {
        if (this.selectedDevice &&
          device.vendorId === parseInt(this.selectedDevice.vendorId, 16) &&
          device.productId === parseInt(this.selectedDevice.productId, 16)) {
          this.selectedDevice = device;
        }
      });
    },
    connectHID() {
      let isValid = false;
      this.availableDevices.forEach(device => {
        if (this.manualInputDevice &&
          device.vendorId === parseInt(this.manualInputDevice.vendorId, 16) &&
          device.productId === parseInt(this.manualInputDevice.productId, 16)) {
          HidDevice.connect(device);
          isValid = true;
        }
      });
      if (!isValid) {
        this.$q.notify({
          type: 'warning',
          message: 'Invalid Device',
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
            HidDevice.connect(devices[0]);
          }
          this.checkResult = null;
        }
      });
    },
    disconnectHID() {
      HidDevice.disconnect();
    },
    i18n(relativePath) {
      return this.$t('components.devicePanel.' + relativePath);
    }
  },
  unmounted() {
    if (this.scanInterval) {
      clearInterval(this.scanInterval);
    }
  }
})
</script>
