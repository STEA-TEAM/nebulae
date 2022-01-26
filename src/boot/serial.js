import {boot} from 'quasar/wrappers'
import {reactive, ref} from "vue";
import {Notify} from 'quasar'

const SerialHelper = reactive({
  port: ref(null),

  readInterval: ref(null),
  reader: ref(null),

  sentMessage: ref(null),
  receivedMessage: ref(null),

  /**
   *  a,b,c,d,e,f,g,h,x,x,x,x
   */

  async connect(port, baudRate) {
    try {
      await port["open"]({baudRate: baudRate});
      this.port = port;
      Notify.create({
        type: 'positive',
        message: 'Device connected',
        icon: 'link'
      });
      this.readInterval = setInterval(async () => {
        if ((this.reader === null || !this.port.readable.locked) && this.port) {
          console.log("Try get reader");
          if (this.port.readable) {
            this.reader = this.port.readable.getReader();
            try {
              while (true) {
                const {value, done} = await this.reader.read();
                if (done) {
                  break;
                }
                this.receivedMessage = String.fromCharCode.apply(
                  null, new Uint8Array(value)
                );
              }
            } catch (readError) {
              console.log(readError);
            } finally {
              console.log("Release reader");
              this.reader.releaseLock();
              this.reader = null;
            }
          }
        }
      });
    } catch (openError) {
      Notify.create({
        type: 'negative',
        message: openError,
        icon: 'report_off'
      });
    }
  },

  async disconnect() {
    if (this.port && this.reader) {
      this.reader.cancel().then(() => {
        this.port["close"]().then(() => {
          this.port = null;
          Notify.create({
            type: 'info',
            message: 'Port closed',
            icon: 'link_off'
          });
        });
      });
    }
  },
});

export default boot(({app}) => {
  app.config.globalProperties.$serial = SerialHelper;
});
