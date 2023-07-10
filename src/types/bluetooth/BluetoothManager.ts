import { Notify } from 'quasar';
import { reactive } from 'vue';

import { i18nInstance } from 'boot/i18n';
import { BluetoothDeviceWrapper } from 'types/bluetooth/BluetoothDeviceWrapper';

const i18n = (relativePath: string, params: string[] = []) => {
  return i18nInstance.global.t(
    'global.BluetoothManager.' + relativePath,
    params,
  );
};

export class BluetoothManager {
  deviceMap = reactive(new Map<string, BluetoothDeviceWrapper>());

  async connect(
    options: RequestDeviceOptions,
  ): Promise<BluetoothDevice | undefined> {
    try {
      const device = await navigator.bluetooth.requestDevice(options);
      this.deviceMap.set(device.id, new BluetoothDeviceWrapper(device));
      console.log(this.deviceMap);
      return device;
    } catch (error) {
      Notify.create({
        type: 'warning',
        message: i18n('notifications.canceled'),
      });
    }
  }

  getDeviceWrapper(deviceId: string): BluetoothDeviceWrapper | undefined {
    return this.deviceMap.get(deviceId);
  }

  removeDeviceWrapper(deviceId: string) {
    this.deviceMap.delete(deviceId);
  }
}
