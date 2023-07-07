import { Notify } from 'quasar';
import { reactive } from 'vue';

import { i18nInstance } from 'boot/i18n';
import { BluetoothServerWrapper } from 'types/bluetooth/BluetoothServerWrapper';
import { sleep } from 'utils/common';

const i18n = (relativePath: string) => {
  return i18nInstance.global.t('global.BluetoothManager.' + relativePath);
};

export interface BluetoothDeviceWrapper {
  device: BluetoothDevice;
  server: BluetoothServerWrapper;
  services?: BluetoothServiceUUID[];
}

export class BluetoothManager {
  deviceMap = reactive(new Map<string, BluetoothDeviceWrapper>());

  async connect(
    options: RequestDeviceOptions,
  ): Promise<BluetoothDevice | undefined> {
    try {
      const device = await navigator.bluetooth.requestDevice(options);
      const server = await this.connectGattServer(device);
      this.deviceMap.set(device.id, {
        device: device,
        server: new BluetoothServerWrapper(server),
        services: options.optionalServices,
      });
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

  private async connectGattServer(
    device: BluetoothDevice,
  ): Promise<BluetoothRemoteGATTServer> {
    if (!device?.gatt) {
      throw new Error('GATT is null');
    }
    const server = await device.gatt.connect();
    if (!server) {
      throw new Error('server is null');
    }
    return server;
  }

  private initDisconnectHandler(device: BluetoothDevice) {
    device.addEventListener('gattserverdisconnected', async () => {
      const retryLimit = 3;
      const currentDeviceWrapper = this.deviceMap.get(device.id);
      if (!currentDeviceWrapper) {
        return;
      }
      for (let retryCount = 1; retryCount <= retryLimit; retryCount++) {
        Notify.create({
          type: 'warning',
          message:
            i18n('labels.reconnecting') + ` (${retryCount}/${retryLimit})`,
          caption: i18n('labels.deviceId') + device.id,
        });
        try {
          const server = await this.connectGattServer(device);
          currentDeviceWrapper.server = new BluetoothServerWrapper(server);
          this.deviceMap.set(device.id, currentDeviceWrapper);
          return;
        } catch (_) {}
        await sleep(3000);
      }
      Notify.create({
        type: 'negative',
        message: i18n('labels.reconnectFailed'),
        caption: i18n('labels.deviceId') + device.id,
      });
      this.deviceMap.delete(device.id);
    });
  }
}
