<template>
  <q-card>
    <q-card-section
      class="full-width"
      :class="actionSectionClass">
      <div :class="actionPairClass">
        <q-select
          class="col-grow"
          clearable
          color="primary"
          dense
          :disable="enablePanel"
          dropdown-icon="expand_less"
          :label="$q.screen.gt.xs?i18n('selects.label'):i18n('selects.labelShort')"
          :menu-anchor="vertical?'top left':'bottom left'"
          :menu-self="vertical?'bottom left':'top left'"
          options-dense
          options-selected-class="text-primary"
          outlined
          :options="baudList"
          :model-value="selectedBaud"
          @update:modelValue="selectedBaud = $event"
          :style="{minWidth: $q.screen.gt.xs?'20ch':'10ch'}"/>
      </div>
      <div :class="actionPairClass">
        <q-btn
          class="col-grow"
          :color="connectedPort?'negative':'positive'"
          dense
          :icon-right="connectedPort?'link_off':'link'"
          :label="connectedPort?i18n('buttons.disconnect'):i18n('buttons.connect')"
          unelevated
          @click="connectedPort?disconnectSerial():newSerial()"/>
        <q-btn
          color="primary"
          dense
          :disable="!enablePanel || !selectedBaud"
          unelevated
          icon-right="send"
          :label="$q.screen.gt.xs?i18n('buttons.send'):i18n('buttons.sendShort')"
          @click="sendReport"/>
      </div>
      <q-space/>
      <div>
        <SaveManager
          :disable="!enablePanel || !selectedBaud"
          :save-path="`data.savedReports.${selectedBaud}`"
          :save-wrapper="saveWrapper"
          :load-wrapper="loadWrapper"/>
      </div>
      <div/>
    </q-card-section>
    <q-card-section class="full-width row items-start justify-between">
      <q-input
        class="col-grow"
        bottom-slots
        clearable
        counter
        dense
        outlined
        type="textarea"
        :model-value="rawData"
        @update:modelValue="rawData=$event"
        :rules="[dataRule]"/>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent, watch} from 'vue'
import {hexToBuffer} from "src/scripts/utils";

import SaveManager from "components/SaveManager";

export default defineComponent({
  name: 'SerialControl',
  components: {SaveManager},
  setup() {
    const baudList = [
      'custom',
      110,
      300,
      600,
      1200,
      2400,
      4800,
      9600,
      14400,
      19200,
      38400,
      43000,
      57600,
      76800,
      115200,
      128000,
      230400,
      256000,
      460800,
      921600,
      1000000,
      2000000,
      3000000,
    ];
    return {
      baudList,
    }
  },
  data() {
    return {
      connectedPort: null,
      enablePanel: false,
      selectedBaud: 9600,
      rawData: null,
      dialog: null,
    }
  },
  created() {
    watch(() => this.$serial.port, (value) => {
      this.connectedPort = value;
      if (value) {
        this.enablePanel = true;
      } else {
        this.selectedBaud = null;
        this.enablePanel = false;
        this.dialog = null;
      }
    });
  },
  computed: {
    vertical() {
      return this.$q.screen.gt.sm && this.$q.screen.lt.lg;
    },
    actionSectionClass() {
      if (this.$q.screen.gt.sm && this.$q.screen.lt.lg) {
        return ['row', 'items-center', 'q-gutter-x-sm'];
      }
      return ['column', 'justify-end', 'q-gutter-y-sm'];
    },
    actionPairClass() {
      if (this.$q.screen.gt.sm && this.$q.screen.lt.lg) {
        return ['column', 'justify-between', 'q-gutter-y-sm'];
      }
      return ['row', 'items-center', 'justify-end', 'q-gutter-x-sm'];
    }
  },
  methods: {
    dataRule(value) {
      if (!value) {
        return;
      }
      if (value.hasOwnProperty("length") &&
        value.search(/[G-Z]+/) === -1) {
        return true;
      }
      return 'Invalid report data';
    },
    newSerial() {
      navigator.serial['requestPort']({filters: []}).then(port => {
        this.$serial.connect(port, this.selectedBaud);
      }).catch(err => {
        this.$q.notify({
          type: 'warning',
          message: err.message,
          icon: 'mdi-message-alert-outline'
        });
      });
    },
    disconnectSerial() {
      this.$serial.disconnect();
    },
    sendReport() {
      this.$serial.sendReport(this.selectedBaud.id, hexToBuffer(this.dataPacks.join('')));
    },
    useHistory(history) {
      let found = false;
      this.baudList.forEach(baud => {
        if (baud === history['baud']) {
          this.selectedBaud = baud;
          // TODO: Set input area
          found = true;
        }
      });
      if (!found) {
        this.$q.notify({
          type: 'warning',
          message: this.i18n('notifications.invalidHistory'),
          icon: 'mdi-message-alert-outline'
        });
      } else {
        this.$q.notify({
          type: 'positive',
          message: this.i18n('notifications.validHistory'),
          icon: 'mdi-comment-check-outline'
        });
      }
    },
    saveWrapper(label) {
      return {
        label: label,
        caption: `Baud: 0x${
          this.$hid.device.vendorId.toString(16).toUpperCase().padStart(4, '0')
        }`,
        tooltip: this.rawData.toString(),
        baud: this.selectedBaud,
        data: this.rawData.toString(),
      }
    },
    loadWrapper(loaded) {
      this.baudList.forEach(baud => {
        if (baud === loaded.baud) {
          this.selectedBaud = baud;
          this.rawData = loaded.data.toString();
          return true;
        }
      });
      return false;
    },
    i18n(relativePath) {
      return this.$t('components.serialControl.' + relativePath);
    }
  }
})
</script>
