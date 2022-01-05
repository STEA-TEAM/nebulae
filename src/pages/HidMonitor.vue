<template>
  <q-page
    class="flex full-width full-height q-pa-md"
    :class="pageClass">
    <div
      class="col-grow column q-gutter-y-sm">
      <HexView
        class="col-grow"
        color-scheme="green"
        icon="mdi-export"
        :label="i18n('labels.sentArea')"
        v-model="sentMessage"
        @data:history="$refs.control.useHistory($event)"
        style="min-height: 40ch"/>
      <HexView
        class="col-grow"
        color-scheme="blue"
        icon="mdi-import"
        :label="i18n('labels.receivedArea')"
        v-model="receivedMessage"
        @data:history="$refs.control.useHistory($event)"
        style="min-height: 40ch"/>
    </div>
    <div
      class="col-lg-3 col-xl-2"
      :class="functionAreaClass">
      <DevicePanel class="col-12 col-sm-4 col-md-3 col-lg-auto"/>
      <ControlPanel class="col-grow" ref="control"/>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, watch} from 'vue';
import HexView from "components/HexView";
import DevicePanel from "components/DevicePanel";
import ControlPanel from "components/ControlPanel";
import {HidDevice} from "boot/hid";

export default defineComponent({
  name: 'HidMonitor',
  components: {ControlPanel, DevicePanel, HexView},
  data() {
    return {
      sentMessage: null,
      receivedMessage: null,
    }
  },
  created() {
    watch(() => this.$hid.sentMessage, (value) => this.sentMessage = value);
    watch(() => this.$hid.receivedMessage, (value) => this.receivedMessage = value);
    // watch(() => this.$q.screen.name, (value) => console.log(value));
  },
  computed: {
    pageClass() {
      if (this.$q.screen.lt.lg) {
        return ['column', 'q-gutter-y-sm'];
      }
      return ['row', 'q-gutter-x-sm'];
    },
    functionAreaClass() {
      if (this.$q.screen.gt.xs && this.$q.screen.lt.lg) {
        return ['row', 'q-gutter-x-sm'];
      }
      return ['column', 'q-gutter-y-sm'];
    },
  },
  methods: {
    i18n(relativePath) {
      return this.$t('pages.hidMonitor.' + relativePath);
    },
  }
})
</script>

<style scoped>

</style>
