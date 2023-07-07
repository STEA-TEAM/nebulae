import { i18nInstance } from 'boot/i18n';

const i18n = (relativePath: string) => {
  return i18nInstance.global.t('global.SerialManager.' + relativePath);
};

export class SerialManager {


  async connect(baudRate: number) {
    const port = await navigator.serial.requestPort();
  }
}
