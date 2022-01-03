<template>
  <q-card>
    <q-card-section
      class="full-width"
      :class="actionSectionClass">
      <div :class="actionPairClass">
        <q-chip
          :dense="$q.screen.lt.sm"
          :disable="!enablePanel || !selectedReport">
          <q-avatar color="primary" text-color="white">
            {{ selectedReport ? selectedReport.bytes : '?' }}
          </q-avatar>
          Bytes
        </q-chip>
        <q-select
          class="col-grow"
          clearable
          color="primary"
          dense
          :disable="!enablePanel"
          :display-value="selectedReport ? `${selectedReport.id}` : null"
          dropdown-icon="expand_less"
          :label="$q.screen.gt.xs
                    ?i18n('selects.report')
                    :i18n('selects.reportShort')"
          :menu-anchor="vertical?'top left':''"
          :menu-self="vertical?'bottom left':''"
          options-dense
          options-selected-class="text-primary"
          outlined
          :options="reportList"
          :model-value="selectedReport"
          @update:modelValue="selectedReport = $event"
          :style="{minWidth: $q.screen.gt.xs?'20ch':'10ch'}">
          <template v-slot:option="item">
            <q-item v-bind="item['itemProps']" dense>
              <q-item-section>
                <q-item-label>
                  {{ item['opt'].id }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label caption>
                  {{ item['opt'].bytes }} Bytes
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-italic text-grey">
                No output report available
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div :class="actionPairClass">
        <q-btn
          color="primary"
          dense
          :disable="!enablePanel || !selectedReport"
          unelevated
          icon-right="send"
          :label="$q.screen.gt.xs
                    ?i18n('buttons.send')
                    :i18n('buttons.sendShort')"
          @click="sendReport"/>
        <q-btn
          color="negative"
          dense
          :disable="!enablePanel || !selectedReport"
          icon-right="delete_sweep"
          :label="$q.screen.gt.xs
                    ?i18n('buttons.clear')
                    :i18n('buttons.clearShort')"
          unelevated
          @click="clearDataPacks"/>
      </div>
      <q-space/>
      <div :class="actionPairClass">
        <q-input
          class="col-grow"
          clearable
          dense
          :disable="!enablePanel || !selectedReport"
          label="Save this report"
          :maxlength="32"
          outlined
          :model-value="saveName"
          @update:modelValue="saveName=$event">
          <template v-slot:before>
            <q-btn
              color="accent"
              :disable="!enablePanel || !selectedReport"
              icon="book"
              outline
              padding="sm"
              @click="openDialog"/>
          </template>
          <template v-slot:after>
            <q-btn
              color="primary"
              :disable="!enablePanel || !selectedReport"
              icon="save"
              outline
              padding="sm"
              @click="saveReport"/>
          </template>
        </q-input>
      </div>
      <div/>
    </q-card-section>
    <q-card-section class="full-width row items-start justify-between">
      <HexInput
        v-for="index in Math.ceil(selectedReport ? selectedReport.bytes / 8 : 0)"
        :key="index"
        :ref="`hexInput${index}`"
        class="col-3 q-gutter-x-sm"
        :index="index"
        :previous-focus="previousFocusedIndex"
        :bytes="dataPacks[index-1].length / 2"
        v-model="dataPacks[index - 1]"
        @event:focus="previousFocusedIndex = index"
        @event:previous="previousInput(index)"
        @event:next="nextInput(index)"/>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent, watch} from 'vue'
import {HidDevice} from "boot/hid";
import {hexToBuffer} from "src/scripts/utils";

import HexInput from "components/HexInput";
import ListDialog from "components/ListDialog";

export default defineComponent({
  name: 'ControlPanel',
  components: {HexInput},
  data() {
    return {
      enablePanel: false,
      previousFocusedIndex: -1,
      selectedReport: null,
      reportList: [],
      dataPacks: new Array(8).fill(new Uint8Array(16).join('')),
      saveName: null,
      savedReports: [],
      dialogOpen: false,
    }
  },
  created() {
    watch(() => HidDevice.device, (value) => {
      if (value) {
        this.enablePanel = true;
        let reportList = [];
        value["collections"].forEach(collection => {
          if (collection["outputReports"]) {
            collection["outputReports"].forEach(report => {
              reportList.push({
                id: report["reportId"],
                bytes: report.items[0]["reportCount"],
                usages: report.items[0]["usages"],
              });
            })
          }
        });
        this.reportList = reportList;
        if (reportList[0]) {
          this.selectedReport = reportList[0];
        }

        let savedReports = this.$q.localStorage.getItem(
          `data.savedReports.${value['vendorId']}_${value['productId']}`
        );
        if (savedReports) {
          this.savedReports = savedReports;
        }
      } else {
        this.selectedReport = null;
        this.enablePanel = false;
        this.dialogOpen = false;
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
  watch: {
    selectedReport(value) {
      if (!value) {
        return;
      }
      let bytes = value.bytes;
      let packs = Math.ceil(bytes / 8);
      let remains = ((bytes % 8 === 0) ? 8 : bytes % 8) * 2;
      if (packs > this.dataPacks.length) {
        this.dataPacks.push.apply(
          this.dataPacks,
          new Array(packs - this.dataPacks.length).fill(
            new Uint8Array(16).join('')
          )
        );
      } else if (packs < this.dataPacks.length) {
        this.dataPacks = this.dataPacks.slice(0, packs);
      }
      if (remains > this.dataPacks[packs - 1].length) {
        this.dataPacks[packs - 1] = this.dataPacks[packs - 1] + new Array(
          remains - this.dataPacks[packs - 1].length
        ).fill(0).join('');
      } else if (remains < this.dataPacks[packs - 1].length) {
        this.dataPacks[packs - 1] = this.dataPacks[packs - 1].slice(0, remains);
      }
    }
  },
  methods: {
    previousInput(index) {
      if (this.$refs[`hexInput${index - 1}`]) {
        this.$refs[`hexInput${index - 1}`][0].focus();
      }
    },
    nextInput(index) {
      if (this.$refs[`hexInput${index + 1}`]) {
        this.$refs[`hexInput${index + 1}`][0].focus();
      }
    },
    sendReport() {
      HidDevice.sendReport(this.selectedReport.id, hexToBuffer(this.dataPacks.join('')));
    },
    clearDataPacks() {
      let newPacks = new Array(this.dataPacks.length);
      for (let index = 0; index < this.dataPacks.length; index++) {
        newPacks[index] = new Array(this.dataPacks[index].length).fill('0').join('');
      }
      this.dataPacks = newPacks;
      this.$q.notify({
        type: 'info',
        message: this.i18n('notifications.clearData'),
        icon: 'mdi-numeric-0-box-multiple-outline'
      });
    },
    useHistory(history) {
      let found = false;
      this.reportList.forEach(report => {
        if (report.id === history.id) {
          this.selectedReport = report;
          let index = 0;
          for (let key in history) {
            if (key !== 'index' && key !== 'id') {
              this.dataPacks[index] = history[key].split(' ').join('');
              index++;
            }
          }
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
    openDialog() {
      if (!this.dialogOpen) {
        this.dialogOpen = true;
        this.$q.dialog({
          component: ListDialog,
          componentProps: {
            list: this.savedReports,
            position: this.$q.screen.lt.lg ? "right" : "top",

            title: this.i18n('dialog.title'),
            noItemText: this.i18n('dialog.noItemText'),
            dismissText: this.i18n('dialog.dismissText'),
            chipText: this.i18n('dialog.chipText'),
            tooltipTitle: this.i18n('dialog.tooltipTitle'),

            tooltipWidth: "19ch",

            chipNumberKey: "reportId",

            selectCallback: this.loadReport,
            removeCallback: this.deleteReport,
          }
        }).onDismiss(() => {
          this.dialogOpen = false;
        });
      }
    },
    saveReport() {
      let saved = {
        label: this.saveName,
        caption: `VID: 0x${
          HidDevice.device['vendorId'].toString(16).toUpperCase().padStart(4, '0')
        } PID: 0x${
          HidDevice.device['productId'].toString(16).toUpperCase().padStart(4, '0')
        }`,
        tooltip: this.dataPacks.join('\n'),

        reportId: this.selectedReport.id,
        data: this.dataPacks.join(' ').split(' '),
      };
      this.savedReports.push(saved);
      this.$q.localStorage.set(
        `data.savedReports.${HidDevice.device['vendorId']}_${HidDevice.device['productId']}`,
        this.savedReports
      );
      this.$q.notify({
        type: 'positive',
        message: this.i18n('notifications.saveSuccess'),
        icon: 'mdi-archive-arrow-down-outline'
      });
    },
    deleteReport(index) {
      this.savedReports.splice(index, 1);
      this.$q.localStorage.set(
        `data.savedReports.${HidDevice.device['vendorId']}_${HidDevice.device['productId']}`,
        this.savedReports
      );
      this.$q.notify({
        type: 'info',
        message: this.i18n('notifications.deleteSuccess'),
        icon: 'mdi-archive-minus-outline'
      });
    },
    loadReport(loaded) {
      let found = false;
      this.reportList.forEach(report => {
        if (report.id === loaded.reportId) {
          this.selectedReport = report;
          this.dataPacks = loaded.data.join(' ').split(' ');
          found = true;
        }
      });
      if (!found) {
        this.$q.notify({
          type: 'warning',
          message: this.i18n('notifications.loadFailed'),
          icon: 'mdi-archive-remove-outline'
        });
      } else {
        this.$q.notify({
          type: 'positive',
          message: this.i18n('notifications.loadSuccess'),
          icon: 'mdi-archive-arrow-up-outline'
        });
      }
    },
    i18n(relativePath) {
      return this.$t('components.controlPanel.' + relativePath);
    }
  }
})
</script>
