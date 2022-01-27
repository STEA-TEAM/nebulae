<template>
  <q-page
    class="flex full-width full-height q-pa-md"
    :class="pageClass">
    <div
      class="col-grow column q-gutter-y-sm">
      <DataVisualizer
        class="col-grow"
        v-model="sentMessage"
        :toolbar="sendToolbar"
        display-type="table"
        hide/>
      <DataVisualizer
        class="col-grow"
        :toolbar="receiveToolbar"
        v-model="receivedMessage"/>
    </div>
    <div
      class="col-lg-3 col-xl-2"
      :class="functionAreaClass">
      <SerialControl class="col-grow" ref="control"/>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, watch} from "vue";
import SerialControl from "components/SerialControl";
import DataVisualizer from "components/DataVisualizer";

export default defineComponent({
  name: "SerialMonitor",
  components: {DataVisualizer, SerialControl},
  data() {
    return {
      sendToolbar: {
        icon: "mdi-import",
        label: this.i18n("labels.sentArea"),
        colorScheme: "green"
      },
      receiveToolbar: {
        icon: "mdi-import",
        label: this.i18n("labels.receivedArea"),
        colorScheme: "blue"
      },
      sentMessage: null,
      receivedMessage: null,
    }
  },
  created() {
    watch(() => this.$serial.sentMessage, (value) => this.sentMessage = value);
    watch(() => this.$serial.receivedMessage, (value) => this.receivedMessage = value);
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
});
</script>

<style scoped>

</style>
