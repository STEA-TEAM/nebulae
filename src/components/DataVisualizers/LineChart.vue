<script setup lang="ts">
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { ComposeOption } from 'echarts/core';
import type { LineSeriesOption } from 'echarts/charts';
import type {
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  GridComponentOption,
} from 'echarts/components';
import { useQuasar } from 'quasar';
import VChart from 'vue-echarts';
import { computed } from 'vue';

type EChartsOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | GridComponentOption
  | LineSeriesOption
>;

export type LineData = {
  name: string;
  data: {
    x: number;
    y: number;
  }[];
};

const { dark } = useQuasar();

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
]);

const props = defineProps<{
  modelValue: LineData[];
}>();

const option = computed<EChartsOption>(() => ({
  title: {
    text: 'Sensor Data',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: props.modelValue.map((line) => line.name),
  },
  xAxis: {
    type: 'time',
  },
  yAxis: {
    type: 'value',
  },
  series: props.modelValue.map((line) => ({
    name: line.name,
    type: 'line',
    smooth: true,
    showSymbol: false,
    data: line.data.map((point) => [point.x, point.y]),
  })),
}));
</script>

<template>
  <v-chart
    :option="option"
    autoresize
    :theme="dark.isActive ? 'dark' : 'light'"
  />
</template>

<style scoped></style>
