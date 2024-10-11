import { Notify } from 'quasar';
import { reactive } from 'vue';

import { i18nInstance } from 'boot/i18n';
import { BluetoothDeviceWrapper } from 'types/bluetooth/BluetoothDeviceWrapper';
import { createI18n } from 'utils/common.ts';

const i18n = createI18n(i18nInstance.global, 'types.BluetoothManager.');

export class BluetoothManager {
  deviceMap = reactive(new Map<string, BluetoothDeviceWrapper>());

  async connect(
    options: RequestDeviceOptions,
  ): Promise<BluetoothDevice | undefined> {
    try {
      const device = await navigator.bluetooth.requestDevice(options);
      Notify.create({
        type: 'info',
        message: i18n('notifications.connecting'),
        caption: i18n('labels.deviceId', { deviceId: device.id }),
      });
      const deviceWrapper = new BluetoothDeviceWrapper(device);
      if (await deviceWrapper.connectGattServer()) {
        this.deviceMap.set(device.id, deviceWrapper);
        return device;
      }
    } catch (error) {
      console.warn(error);
      Notify.create({
        type: 'warning',
        message: i18n('notifications.canceled'),
      });
    }
  }

  async disconnect(deviceId: string) {
    const deviceWrapper = this.deviceMap.get(deviceId);
    if (deviceWrapper) {
      await deviceWrapper.disconnectGattServer();
      this.deviceMap.delete(deviceId);
    }
  }
}
