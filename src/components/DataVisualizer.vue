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
    const bufferSize = ref(1000);
    const chartData = ref([]);
    const chartDataRange = ref([]);
    const chartDataSize = ref(10 ** 3);
    const displayData = ref([]);
    const displayDataSize = ref(10 ** 5);

    const rowSeparator = ref("\n");
    const columnSeparator = ref(",");
    const splitterRatio = ref(50);
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
    };
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
                if (this.chartData[index].data.length > this.chartDataSize) {
                  this.chartData[index].data.shift();
                }
              }
            }
            this.displayData.push(row);
            if (this.displayData.length > this.displayDataSize) {
              this.displayData.shift();
            }
          });
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
  computed: {
    chartOptions() {
      return {
        stroke: {
          curve: "straight",
          lineCap: "round",
          width: 1.5,
        },
        xaxis: {
          type: "numeric",
          range: this.displayData.length - 1 < 100 ? this.displayData.length - 1 : 100,
        },
      }
    },
  },
  methods: {
    clearData() {
      this.chartData = [];
      this.displayData = [];
    },
    i18n(relativePath) {
      return this.$t('components.dataVisualizer.' + relativePath);
    }
  },
})
</script>

<style scoped>

</style>
