<template>
  <q-card class="column">
    <q-toolbar :class="[`bg-${toolbar.colorScheme}`,`text-white`]">
      <q-icon v-if="toolbar.icon" :name="toolbar.icon" size="md"/>
      <q-toolbar-title v-if="toolbar.label" class="gt-xs">
        {{ toolbar.label }}
      </q-toolbar-title>
      <q-space/>
      <q-btn
        dense
        flat
        icon-right="delete_sweep"
        size="lg"
        @click="clearData">
        <q-tooltip :delay="500">
          {{ i18n('tooltips.clearData') }}
        </q-tooltip>
      </q-btn>
    </q-toolbar>
    <q-splitter
      class="col-grow"
      :model-value="splitterRatio"
      @update:modelValue="splitterRatio=$event">
      <template v-slot:before>
        <q-virtual-scroll
          :items="this.displayData"
          ref="scrollArea"
          type="table"
          style="max-height: 30vh;">
          <template v-slot="{item: row, index: rowIndex}">
            <tr :key="rowIndex">
              <td>#{{ rowIndex }}</td>
              <td v-for="(cell, cellIndex) in row" :key="`${rowIndex}-${cellIndex}`">
                {{ cell }}
              </td>
            </tr>
          </template>
        </q-virtual-scroll>
      </template>
      <template v-slot:after>
        <apexchart
          class="col-grow"
          type="line"
          :options="chartOptions"
          :series="chartData"/>
      </template>
    </q-splitter>
  </q-card>
</template>

<script>
import {defineComponent, reactive, ref} from "vue";

import VueApexCharts from "vue3-apexcharts";
import {tableConstructor} from "src/scripts/utils";
import serial from "boot/serial";

export default defineComponent({
  name: "DataVisualizer",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    toolbar: {
      type: Object,
      default: () => ({
        icon: "",
        label: "",
        colorScheme: "primary",
      }),
    },
  },
  setup() {
    const buffer = ref("");
    const bufferSize = ref(4000);
    const chartData = ref([]);
    const chartDataRange = ref([]);
    const chartDataSize = ref(1000);
    const displayData = ref([]);
    const displayDataSize = ref(100000);

    const rowSeparator = ref("\n");
    const columnSeparator = ref(",");
    const splitterRatio = ref(50);
    const chartRange = ref(200);
    return {
      buffer,
      bufferSize,
      chartData,
      chartDataRange,
      chartDataSize,
      displayData,
      displayDataSize,

      rowSeparator,
      columnSeparator,
      splitterRatio,
      chartRange,
    };
  },
  data() {
    return {
      dataPushCount: 0,
      chartOptions: {
        chart: {
          animations: {
            enabled: false,
          }
        },
        stroke: {
          curve: "straight",
          lineCap: "round",
          width: 1.5,
        },
        xaxis: {
          type: "numeric",
          range: this.chartRange,
        },
      }
    }
  },
  watch: {
    modelValue(value) {
      this.buffer += value;
      if (this.buffer.length > this.bufferSize) {
        try {
          let [table, remains] = tableConstructor(this.buffer, this.rowSeparator, this.columnSeparator);
          this.buffer = remains;
          table.forEach((row) => {
            for (const index in row) {
              if (this.chartData[index] === undefined) {
                this.chartData[index] = {data: [row[index]]};
              } else {
                this.chartData[index].data.push(row[index]);
              }
            }
            this.displayData.push(row);
            this.dataPushCount++;
          });
          if (this.dataPushCount > this.chartRange) {
            this.trimData();
            this.dataPushCount = 0;
          }
        } catch (err) {
          if (err.message === "NoRowException") {
            this.$q.notify({
              type: 'warning',
              message: this.i18n('notifications.rowNotFound'),
              icon: 'mdi-table-row-remove',
            });
            this.buffer = "";
          } else {
            console.error(err);
          }
        }
      }
    },
  },
  methods: {
    clearData() {
      this.chartData = [];
      this.displayData = [];
    },
    trimData() {
      if (this.displayData.length > this.displayDataSize) {
        this.displayData.splice(
          0,
          this.displayData.length - this.displayDataSize
        );
      }
      this.chartData.forEach(series => {
        if (series['data'].length > this.chartDataSize) {
          series['data'].splice(
            0,
            series['data'].length - this.chartDataSize
          );
        }
      });
    },
    i18n(relativePath) {
      return this.$t('components.dataVisualizer.' + relativePath);
    }
  },
})
</script>

<style scoped>

</style>
