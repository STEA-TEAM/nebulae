<template>
  <q-page class="flex fullscreen q-pt-xl" style="z-index: 0">
    <div class="full-width justify-between column q-pa-lg q-gutter-y-sm">
      <div class="col-grow column q-gutter-y-sm">
        <HexView
          class="col-grow"
          v-model="sentMessage"
          label="Sent Data"
          no-data-label="No send data"
          color-scheme="green"
          @data:history="$refs.control.useHistory($event)"/>
        <HexView
          class="col-grow"
          v-model="receivedMessage"
          label="Received Data"
          no-data-label="No receive data"
          color-scheme="blue"
          @data:history="$refs.control.useHistory($event)"/>
      </div>
      <div class="col-auto row justify-between q-gutter-x-sm">
        <DevicePanel class="col-2"/>
        <ControlPanel ref="control" class="col-grow"/>
      </div>
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
    watch(() => HidDevice.sentMessage, (value) => this.sentMessage = value);
    watch(() => HidDevice.receivedMessage, (value) => this.receivedMessage = value);
  },
  methods: {}
})
</script>

<style scoped>

</style>
