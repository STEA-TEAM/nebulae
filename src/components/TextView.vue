<template>
  <q-card class="column">
    <q-toolbar :class="[`bg-${colorScheme}`,`text-white`]">
      <q-icon :name="icon" size="md"/>
      <q-toolbar-title class="gt-xs">
        {{ label }}
      </q-toolbar-title>
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
        @click="dataString=''">
        <q-tooltip :delay="500">
          {{ i18n('tooltips.clearData') }}
        </q-tooltip>
      </q-btn>
    </q-toolbar>
    <q-scroll-area
      v-show="!this.dataString.empty"
      class="col-grow"
      ref="scrollArea"
      style="z-index: 2">
      <div style="white-space: pre;">
        {{ this.dataString }}
      </div>
    </q-scroll-area>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'TextView',
  props: {
    modelValue: {
      type: String,
      default: () => '',
    },
    icon: {
      type: String,
      default: 'subject',
    },
    label: {
      type: String,
      default: '',
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
      dataString: '',
      oldDataCount: 0,
    }
  },
  created() {
    this.scrollInterval = setInterval(this.scrollToBottom, 10);
  },
  watch: {
    modelValue(value) {
      if (value) {
        this.dataString += value;
      }
    },
  },
  methods: {
    scrollToBottom() {
      if (this.autoScroll && this.oldDataCount !== this.dataString.length) {
        this.oldDataCount = this.dataString.length;
        this.$refs.scrollArea.setScrollPosition(
          'vertical',
          this.$refs.scrollArea.getScroll().verticalSize
        );
      }
    },
    i18n(relativePath) {
      return this.$t('components.textView.' + relativePath);
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
