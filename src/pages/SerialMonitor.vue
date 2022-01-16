<template>
  <q-page
    class="flex full-width full-height q-pa-md"
    :class="pageClass">
    <div
      class="col-grow column q-gutter-y-sm">
      <TextView
        class="col-grow"
        color-scheme="green"
        icon="mdi-export"
        :label="i18n('labels.sentArea')"
        v-model="sentMessage"
        style="min-height: 40ch"/>
      <TextView
        class="col-grow"
        color-scheme="blue"
        icon="mdi-import"
        :label="i18n('labels.receivedArea')"
        v-model="receivedMessage"
        style="min-height: 40ch"/>
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
import TextView from "components/TextView";

export default defineComponent({
  name: "SerialMonitor",
  components: {SerialControl, TextView},
  data() {
    return {
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
