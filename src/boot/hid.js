import {boot} from 'quasar/wrappers'
import {reactive, ref} from "vue";
import {Notify} from 'quasar'
import {charArrToHex} from "src/scripts/utils";

function messagePacker(id, buffer) {
  let message = {
    index: 0,
    id: id,
  };
  const data = new Uint8Array(buffer);
  for (let index = 0; index < data.length / 8; index++) {
    message[
      `bytes ${((index) * 8 + 1).toString()} ~ ${((index + 1) * 8).toString()}`
      ] = charArrToHex(data.slice(index * 8, (index + 1) * 8), " ").toUpperCase();
  }
  return message;
}

const HidHelper = reactive({
  device: ref(null),
  sentMessage: ref(null),
  receivedMessage: ref(null),

  connect(device) {
    this.device = device;
    this.device["open"]().then(() => {
      Notify.create({
        type: 'positive',
        message: 'Device connected',
        icon: 'link'
      });
      this.device["addEventListener"]("inputreport", (e) => {
        this.receivedMessage = messagePacker(e["reportId"], e.data.buffer);
      });
    }).catch((err) => {
      Notify.create({
        type: 'negative',
        message: err.message,
        icon: 'report_off'
      });
    });
  },

  disconnect() {
    if (this.device) {
      this.device["close"]().then(() => {
        this.device = null;
        Notify.create({
          type: 'info',
          message: 'Device closed',
          icon: 'link_off'
        });
      });
    }
  },

  sendReport(id, data) {
    this.device.sendReport(id, data).then(() => {
      this.sentMessage = messagePacker(id, data);
    }).catch((e) => {
      Notify.create({
        type: 'negative',
        message: e.message,
        icon: 'error'
      });
    });
  },
})

export default boot(({app}) => {
  app.config.globalProperties.$hid = HidHelper;
});
