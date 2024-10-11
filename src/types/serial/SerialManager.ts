import { Notify, uid } from 'quasar';
import { reactive } from 'vue';

import { i18nInstance } from 'boot/i18n';
import { SerialPortWrapper } from 'types/serial/SerialPortWrapper';
import { createI18n } from 'utils/common.ts';

const i18n = createI18n(i18nInstance.global, 'types.SerialManager.');

export class SerialManager {
  portMap = reactive(new Map<string, SerialPortWrapper>());

  async connect(baudRate: number) {
    try {
      const port: SerialPort = await navigator.serial.requestPort({
        filters: [],
      });
      await port.open({ baudRate: baudRate });
      const info = port.getInfo();
      const id = [
        info.usbVendorId ?? 0xffff,
        info.usbProductId ?? 0xffff,
        uid(),
      ].join('_');
      const portWrapper = new SerialPortWrapper(id, port);
      this.portMap.set(id, portWrapper);
      return portWrapper;
    } catch (error) {
      Notify.create({
        type: 'warning',
        message: i18n('notifications.connectCanceled'),
        caption: (<Error>error).message,
      });
    }
  }

  async disconnect(id: string) {
    const portWrapper = this.portMap.get(id);
    if (portWrapper) {
      await portWrapper.disconnect();
      this.portMap.delete(id);
    }
  }
}
