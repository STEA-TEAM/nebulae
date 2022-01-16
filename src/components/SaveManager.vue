<template>
  <q-input
    clearable
    dense
    :disable="disable"
    :label="i18n('inputs.label')"
    :maxlength="32"
    outlined
    :model-value="saveName"
    @update:modelValue="saveName=$event">
    <template v-slot:before>
      <q-btn
        color="accent"
        :disable="disable"
        icon="book"
        :outline="!dialog"
        :unelevated="dialog!==null"
        padding="sm"
        @click="toggleDialog">
        <q-tooltip :delay="300">
          {{ i18n('tooltips.openSaves') }}
        </q-tooltip>
      </q-btn>
    </template>
    <template v-slot:after>
      <q-btn
        color="primary"
        :disable="disable"
        icon="save"
        outline
        padding="sm"
        @click="saveReport">
        <q-tooltip :delay="300">
          {{ i18n('tooltips.saveReport') }}
        </q-tooltip>
      </q-btn>
    </template>
  </q-input>
</template>

<script>
import {defineComponent} from 'vue'
import ListDialog from "components/ListDialog";

export default defineComponent({
  name: "SaveManager",
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    savePath: {
      type: String,
      default: 'data.default',
      required: true,
    },
    saveWrapper: {
      type: Function,
      default: (label) => {
        return {
          label: label,
          caption: "default save",
          tooltip: "This is a default save",
        };
      },
      required: true,
    },
    loadWrapper: {
      type: Function,
      default: (loaded) => {
        console.log(loaded);
        return true;
      },
      required: true,
    }
  },
  data() {
    return {
      dialog: null,
      saveName: null,
      savedReports: [],
    }
  },
  created() {
    let savedReports = this.$q.localStorage.getItem(this.savePath);
    if (savedReports) {
      this.savedReports = savedReports;
    }
  },
  methods: {
    toggleDialog() {
      if (!this.dialog) {
        this.dialog = this.$q.dialog({
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
          this.dialog = null;
        });
      } else {
        this.dialog.hide();
      }
    },
    saveReport() {
      let saved = this.saveWrapper(this.saveName);
      this.savedReports.push(saved);
      this.$q.localStorage.set(
        `${this.savePath}`,
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
        `${this.savePath}`,
        this.savedReports
      );
      this.$q.notify({
        type: 'info',
        message: this.i18n('notifications.deleteSuccess'),
        icon: 'mdi-archive-minus-outline'
      });
    },
    loadReport(report) {
      if (this.loadWrapper(report)) {
        this.$q.notify({
          type: 'positive',
          message: this.i18n('notifications.loadSuccess'),
          icon: 'mdi-archive-arrow-up-outline'
        });
      } else {
        this.$q.notify({
          type: 'warning',
          message: this.i18n('notifications.loadFailed'),
          icon: 'mdi-archive-remove-outline'
        });
      }
    },
    i18n(relativePath) {
      return this.$t('components.saveManager.' + relativePath);
    }
  },
});
</script>

<style scoped>

</style>
