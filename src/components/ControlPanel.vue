<template>
  <q-card>
    <q-dialog
      v-model="savedReportsOpen"
      position="right"
      seamless
      style="min-width: 50vw">
      <q-card class="hide-scrollbar full-width">
        <q-card-section>
          <div class="text-h6">Saved Reports</div>
        </q-card-section>
        <q-separator/>
        <q-list separator>
          <q-item v-if="!savedReports.length">
            <q-item-section>
              <q-item-label class="text-italic text-grey">
                No saved reports
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-for="(report,index) in savedReports"
            :key="index"
            clickable
            @click="loadReport(report)">
            <q-item-section avatar>
              <q-btn
                color="negative"
                dense
                flat
                icon="delete"
                @click.stop.prevent="deleteReport(index)">
              </q-btn>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ report.name ? report.name : 'Nameless Report' }}
              </q-item-label>
              <q-item-label caption>
                VID: {{
                  report.vendorId ? report.vendorId["toString"](16).toUpperCase().padStart(4, '0') : 'Unknown'
                }}
                &emsp;
                PID: {{
                  report.productId ? report.productId["toString"](16).toUpperCase().padStart(4, '0') : 'Unknown'
                }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-chip>
                <q-avatar color="primary" text-color="white">
                  {{ report.reportId }}
                </q-avatar>
                reportID
              </q-chip>
              <q-item-label>
              </q-item-label>
            </q-item-section>
            <q-tooltip
              :delay="250"
              anchor="center left"
              max-width="19ch"
              self="center right"
              transition-hide="jump-right"
              transition-show="jump-left">
              <div class="text-weight-bold">
                {{ `Data pack:` }}
              </div>
              <div>
                {{ report.data.join('\n') }}
              </div>
            </q-tooltip>
          </q-item>
        </q-list>
        <q-separator/>
        <q-card-actions align="stretch">
          <q-btn class="full-width" flat icon-right="last_page" v-close-popup>
            Dismiss
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card-section class="full-width row q-gutter-x-md">
      <q-chip
        :disable="!enablePanel">
        <q-avatar color="primary" text-color="white">
          {{ selectedReport ? selectedReport.bytes : '?' }}
        </q-avatar>
        Report Bytes
      </q-chip>
      <q-select
        clearable
        color="primary"
        dense
        :disable="!enablePanel"
        :display-value="selectedReport ? `${selectedReport.id}` : null"
        dropdown-icon="expand_less"
        label="Select Report ID"
        menu-anchor="top left"
        menu-self="bottom left"
        options-dense
        options-selected-class="text-primary"
        outlined
        :options="reportList"
        :model-value="selectedReport"
        @update:modelValue="selectedReport = $event"
        style="min-width: 180px">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-italic text-grey">
              No output report available
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-btn
        color="primary"
        dense
        :disable="!enablePanel || !selectedReport"
        unelevated
        icon-right="send"
        label="Send Report"
        @click="sendReport"/>
      <q-btn
        color="negative"
        dense
        icon-right="delete_sweep"
        label="Clear Report"
        unelevated
        @click="clearDataPacks"/>
      <q-space/>
      <q-input
        clearable
        dense
        :disable="!enablePanel || !selectedReport"
        label="Save this report"
        :maxlength="32"
        outlined
        :model-value="saveName"
        @update:modelValue="saveName=$event">
        <template v-slot:after>
          <q-btn
            dense
            :disable="!enablePanel || !selectedReport"
            flat
            icon="mdi-content-save"
            round
            @click="saveReport"/>
        </template>
      </q-input>
      <q-btn
        color="accent"
        dense
        :disable="!enablePanel || !selectedReport"
        unelevated
        icon-right="mdi-book-alphabet"
        label="Saved reports"
        @click="savedReportsOpen=!savedReportsOpen"/>
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
      savedReportsOpen: false,
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
          `savedReports_${value['vendorId']}_${value['productId']}`
        );
        if (savedReports) {
          this.savedReports = savedReports;
        }
      } else {
        this.selectedReport = null;
        this.enablePanel = false;
      }
    });
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
      this.dataPacks = new Array(this.dataPacks.length).fill(new Uint8Array(16).join(''));
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
    saveReport() {
      let saved = {
        name: this.saveName,
        deviceName: HidDevice.device['productName'],
        vendorId: HidDevice.device['vendorId'],
        productId: HidDevice.device['productId'],
        reportId: this.selectedReport.id,
        reportUsages: this.selectedReport.usages,
        data: this.dataPacks,
      };
      this.savedReports.push(saved);
      this.$q.localStorage.set(
        `savedReports_${HidDevice.device['vendorId']}_${HidDevice.device['productId']}`,
        this.savedReports
      );
    },
    loadReport(loaded) {
      let found = false;
      this.reportList.forEach(report => {
        if (report.id === loaded.reportId) {
          this.selectedReport = report;
          this.dataPacks = loaded.data;
          found = true;
        }
      });
      if (!found) {
        this.$q.notify({
          type: 'warning',
          message: this.i18n('notifications.invalidSave'),
          icon: 'mdi-message-alert-outline'
        });
      } else {
        this.$q.notify({
          type: 'positive',
          message: this.i18n('notifications.validSave'),
          icon: 'mdi-comment-check-outline'
        });
      }
    },
    deleteReport(index) {
      this.savedReports.splice(index, 1);
      this.$q.localStorage.set(
        `savedReports_${HidDevice.device['vendorId']}_${HidDevice.device['productId']}`,
        this.savedReports
      );
    },
    i18n(relativePath) {
      return this.$t('components.controlPanel.' + relativePath);
    }
  }
})
</script>
