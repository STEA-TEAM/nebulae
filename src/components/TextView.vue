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
        @click="displayData=[]">
        <q-tooltip :delay="500">
          {{ i18n('tooltips.clearData') }}
        </q-tooltip>
      </q-btn>
    </q-toolbar>
    <q-tab-panels
      class="col-grow column"
      animated
      v-model="displayType">
      <q-tab-panel class="col-grow" name="list">
        <q-virtual-scroll
          :items="this.displayData"
          ref="scrollArea"
          style="max-height: 300px;">
          <template v-slot="{item, index}">
            <q-item
              :key="index"
              dense>
              <q-item-section>
                <q-item-label>
                  {{ item }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-virtual-scroll>
      </q-tab-panel>
      <q-tab-panel name="table">
      </q-tab-panel>
      <q-tab-panel name="graph">
      </q-tab-panel>
    </q-tab-panels>

  </q-card>
</template>

<script>
import {computed, defineComponent} from 'vue'

export default defineComponent({
  name: 'TextView',
  props: {
    modelValue: {
      type: String,
      default: () => 'list',
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
    data: {
      type: String,
      default: () => '',
    },
  },
  setup(props, {emit}) {
    const displayType = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });
    return {displayType}
  },
  data() {
    return {
      autoScroll: true,
      scrollInterval: null,
      displayData: [],
      oldDataCount: 0,
    }
  },
  created() {
    this.scrollInterval = setInterval(this.scrollToBottom, 10);
  },
  watch: {
    data(value) {
      if (value) {
        this.displayData = this.displayData.concat(
          (this.displayData.pop() + value).split('\n')
        );
      }
    },
  },
  methods: {
    scrollToBottom() {
      if (this.autoScroll && this.oldDataCount !== this.displayData.length) {
        this.oldDataCount = this.displayData.length;
        this.$refs.scrollArea.scrollTo(
          this.oldDataCount,
          'end-force'
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
