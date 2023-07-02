import { Notify } from 'quasar';
import { reactive } from 'vue';

import { BluetoothServerWrapper } from 'types/bluetooth/BluetoothServerWrapper';
import { sleep } from 'utils/common';

export interface BluetoothDeviceWrapper {
  device: BluetoothDevice;
  server: BluetoothServerWrapper;
  services?: BluetoothServiceUUID[];
}

export class BluetoothManager {
  deviceMap: Map<string, BluetoothDeviceWrapper> = reactive(new Map());

  async connect(
    options: RequestDeviceOptions
  ): Promise<BluetoothDevice | undefined> {
    try {
      const device = await navigator.bluetooth.requestDevice(options);
      const server = await this.connectGattServer(device);
      this.deviceMap.set(device.id, {
        device: device,
        server: new BluetoothServerWrapper(server),
        services: options.optionalServices,
      });
      // device.addEventListener('gattserverdisconnected', async () => {
      //   for (let retryCount = 3; retryCount > 0; retryCount--) {
      //     Notify.create({
      //       type: 'warning',
      //       message: `Bluetooth device disconnected, reconnecting... (${
      //         4 - retryCount
      //       }/3)`,
      //       caption: 'Device ID: ' + device.id,
      //     });
      //     if (await this.connectGattServer(device)) {
      //       return;
      //     }
      //     await sleep(3000);
      //   }
      //   this.deviceMap.delete(device.id);
      // });
      console.log(this.deviceMap);
      return device;
    } catch (error) {
      console.warn(error);
      return;
    }
  }

  private async connectGattServer(
    device: BluetoothDevice
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
}
