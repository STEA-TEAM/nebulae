<template>
  <q-card class="column">
    <q-toolbar :class="[`bg-${colorScheme}`,`text-white`]">
      <q-toolbar-title>
        {{ label }}
      </q-toolbar-title>
      <div
        class="text-body1 text-weight-light text-italic"
        v-show="!dataList.length">
        {{ noDataLabel }}
      </div>
      <q-space/>
      <q-toggle
        checked-icon="mdi-arrow-collapse-down"
        :color="`${colorScheme}-10`"
        keep-color
        size="lg"
        unchecked-icon="subject"
        :model-value="autoScroll"
        @update:modelValue="autoScroll=$event">
        <q-tooltip :delay="500">
          {{ i18n('tooltips.autoScroll') }}
        </q-tooltip>
      </q-toggle>
      <q-btn
        dense
        flat
        icon-right="delete_sweep"
        size="lg"
        @click="dataList = []">
        <q-tooltip :delay="500">
          {{ i18n('tooltips.clearData') }}
        </q-tooltip>
      </q-btn>
    </q-toolbar>
    <q-scroll-area
      v-show="this.dataList.length"
      class="col-grow"
      ref="scrollArea"
      style="z-index: 2">
      <q-markup-table
        bordered
        dense
        flat
        separator="cell"
        wrap-cells>
        <thead class="text-white">
        <tr :class="`bg-${colorScheme}-7`">
          <th
            v-for="(_,key) in dataList[0]"
            :key="key"
            class="text-center text-no-wrap">
            {{ key }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(dataItem,index) in dataList"
          :key="index"
          :class="(index === dataList.length - 1 ? 'text-green text-weight-bold ' : '') + (index % 2 ? `bg-grey-3` : ``)"
          @click="sendHistory(index)">
          <td
            v-for="(item) in dataItem"
            :key="item"
            class="text-left text-no-wrap">
            {{ item }}
            <q-tooltip :delay="500">
              {{ i18n('tooltips.copyHistory') }}
            </q-tooltip>
          </td>
        </tr>
        </tbody>
      </q-markup-table>
    </q-scroll-area>
  </q-card>
</template>

<script>
import {defineComponent, watch} from 'vue'
import {HidDevice} from "boot/hid";

export default defineComponent({
  name: 'HexView',
  props: {
    modelValue: {
      type: Object,
      default: () => {
      },
    },
    label: {
      type: String,
      default: '',
    },
    noDataLabel: {
      type: String,
      default: () => 'Nothing here'
    },
    colorScheme: {
      type: String,
      default: () => 'primary'
    },
  },
  data() {
    return {
      autoScroll: true,
      scrollInterval: null,
      dataList: [],
      oldDataCount: 0,
    }
  },
  created() {
    this.scrollInterval = setInterval(this.scrollToBottom, 10);
  },
  watch: {
    modelValue(value) {
      value['index'] = this.dataList.length + 1;
      this.dataList.push(value);
    },
  },
  methods: {
    scrollToBottom() {
      if (this.autoScroll && this.oldDataCount !== this.dataList.length) {
        this.oldDataCount = this.dataList.length;
        this.$refs.scrollArea.setScrollPosition(
          'vertical',
          this.$refs.scrollArea.getScroll().verticalSize
        );
      }
    },
    sendHistory(index) {
      this.$emit('data:history', this.dataList[index]);
    },
    i18n(relativePath) {
      return this.$t('components.hexView.' + relativePath);
    }
  },
  unmounted() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  }
})
</script>

<style lang="sass" scoped>
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1

  thead tr:first-child th
    top: 0

  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
