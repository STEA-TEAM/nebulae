import { Notify, uid } from 'quasar';
import { reactive } from 'vue';

import { i18nInstance } from 'boot/i18n';
import { SerialPortWrapper } from 'types/serial/SerialPortWrapper';

const i18n = (relativePath: string) => {
  return i18nInstance.global.t('global.SerialManager.' + relativePath);
};

export class SerialManager {
  portMap = reactive(new Map<string, SerialPortWrapper>());

  async connect(baudRate: number) {
    try {
      const port: SerialPort = await navigator.serial.requestPort({
        filters: [],
      });
      await port.open({ baudRate: baudRate });
      const info = port.getInfo();
      const key = [
        info.usbVendorId ?? 0xffff,
        info.usbProductId ?? 0xffff,
        uid(),
      ].join('_');
      const portWrapper = new SerialPortWrapper(port);
      this.portMap.set(key, portWrapper);
      return portWrapper;
    } catch (error) {
      Notify.create({
        type: 'warning',
        message: i18n('labels.canceled'),
        caption: (<Error>error).message,
      });
    }
  }
}
