import { Notify } from 'quasar';
import { reactive } from 'vue';

import { BluetoothDeviceWrapper } from 'types/bluetooth/BluetoothDeviceWrapper';


export class BluetoothManager {
  deviceMap = reactive(new Map<string, BluetoothDeviceWrapper>());

  async connect(
    options: RequestDeviceOptions,
  ): Promise<BluetoothDevice | undefined> {
    try {
      const device = await navigator.bluetooth.requestDevice(options);
      this.deviceMap.set(device.id, new BluetoothDeviceWrapper(device));
      this.initDisconnectHandler(device);
      console.log(this.deviceMap);
      return device;
    } catch (error) {
      Notify.create({
        type: 'warning',
        message: i18n('labels.canceled'),
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
