<template>
  <q-card
    :class="collapsed?'col-shrink':''"
    :style="{minHeight:collapsed?0:'40ch'}"
    class="column">
    <q-toolbar :class="[`bg-${toolbar.colorScheme}`,`text-white`]">
      <q-icon v-if="toolbar.icon" :name="toolbar.icon" size="md"/>
      <q-toolbar-title v-if="toolbar.label" class="gt-xs">
        {{ toolbar.label }}
      </q-toolbar-title>
      <q-space/>
      <q-toggle
        :color="`${toolbar.colorScheme}-10`"
        :model-value="collapsed"
        checked-icon="mdi-eye-off"
        keep-color
        size="lg"
        unchecked-icon="mdi-eye"
        @update:modelValue="collapsed=$event">
        <q-tooltip :delay="500">
          {{ i18n('tooltips.collapsed') }}
        </q-tooltip>
      </q-toggle>
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
      v-if="!collapsed"
      class="col-grow"
      :limits="[0, 100]"
      after-class="overflow-hidden"
      before-class="overflow-hidden"
      :model-value="splitterRatio"
      @update:modelValue="splitterRatio=$event">
      <template v-slot:before>
        <q-virtual-scroll
          v-if="splitterRatio > 0"
          :items="this.tableData"
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
        <LineChart
          v-if="splitterRatio < 100"
          ref="chart"
          :height="chartHeight"
          :option="chartOptions"/>
      </template>
    </q-splitter>
    <q-resize-observer @resize="onResize"/>
  </q-card>
</template>

<script>
import {defineComponent, ref} from "vue";

import {LineChart} from "ve-charts";

export default defineComponent({
  name: "DataVisualizer",
  components: {LineChart},
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
    hide: {
      type: Boolean,
      default: false,
    },
    displayType: {
      type: String,
      default: "both",
    },
    separator: {
      type: Object,
      default: () => ({
        row: "\n",
        column: ",",
      }),
    },
  },
  setup(props) {
    const rawBuffer = ref("");
    const rawBufferSize = ref(1000);
    const recordBuffer = ref([]);
    const recordBufferSize = ref(1000);

    const chartData = ref([]);
    const chartDataSize = ref(10000);
    const tableData = ref([]);
    const tableDataSize = ref(100000);

    const collapsed = ref(false);
    if (props.hide) {
      collapsed.value = true;
    }
    const splitterRatio = ref(50);
    if (props.displayType === "table") {
      splitterRatio.value = 100;
    } else if (props.displayType === "chart") {
      splitterRatio.value = 0;
    }

    const recordCounter = ref(0);
    const chartHeight = ref(1);
    const chartOptions = ref({
      animation: false,
      tooltip: {},
      xAxis: {
        boundaryGap: false,
        min: null,
      },
      yAxis: {},
      dataZoom: [
        {
          type: "slider",
          filterMode: "filter",
          xAxisIndex: [0],
        },
      ],
      series: chartData
    });

    return {
      rawBuffer,
      rawBufferSize,
      recordBuffer,
      recordBufferSize,

      chartData,
      chartDataSize,
      tableData,
      tableDataSize,

      collapsed,
      splitterRatio,

      recordCounter,
      chartHeight,
      chartOptions,
    };
  },
  watch: {
    modelValue(value) {
      this.rawBuffer += value;
      if (this.rawBuffer.includes(this.separator.row)) {
        const split = this.rawBuffer.split(this.separator.row);
        this.rawBuffer = split.pop();
        this.addRecordsToRecordBuffer(split);
      } else if (this.rawBuffer.length > this.rawBufferSize) {
        this.$q.notify({
          type: 'warning',
          message: this.i18n('notifications.rowNotFound'),
          icon: 'mdi-table-row-remove',
        });
        this.rawBuffer = "";
      }
    },
  },
  methods: {
    onResize(size) {
      // TODO: replace the magic number
      this.chartHeight = size.height - 80;
    },
    clearData() {
      this.chartData = [];
      this.tableData = [];
    },
    trimData() {
      if (this.tableData.length > this.tableDataSize) {
        this.tableData.splice(
          0,
          this.tableData.length - this.tableDataSize
        );
      }
      this.chartData.forEach((series) => {
        if (series['data'].length > this.chartDataSize) {
          series['data'].splice(
            0,
            series['data'].length - this.chartDataSize
          );
        }
      });
      this.chartOptions.xAxis.min = this.recordCounter > this.chartDataSize
        ? this.recordCounter - this.chartDataSize
        : null;
    },
    addRecordsToRecordBuffer(rawRecords) {
      this.recordBuffer.push(...rawRecords);
      if (this.recordBuffer.length > this.recordBufferSize) {
        this.flushRecordBuffer(this.recordBuffer);
        this.recordBuffer = [];
      }
    },
    flushRecordBuffer(records) {
      records.forEach((record) => {
        let row = record.split(this.separator.column);
        for (const index in row) {
          if (this.chartData[index] === undefined) {
            this.chartData[index] = {
              type: 'line',
              name: `series_${index}`,
              data: [
                [this.recordCounter, row[index]]
              ],
              itemStyle: {
                opacity: 0,
              }
            };
          } else {
            this.chartData[index].data.push(
              [this.recordCounter, row[index]]
            );
          }
        }
        this.tableData.push(row);
        this.updateRecordCounter();
      });
    },
    updateRecordCounter() {
      if (this.recordCounter++ % Math.min(
        this.chartDataSize, this.tableDataSize
      ) === 0) {
        this.trimData();
      }
    },
    i18n(relativePath) {
      return this.$t('components.dataVisualizer.' + relativePath);
    }
  },
})
</script>

<style scoped>

</style>
