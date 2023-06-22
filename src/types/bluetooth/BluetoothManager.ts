import { Notify } from 'quasar';

import { BluetoothServerWrapper } from 'types/bluetooth/BluetoothServerWrapper';
import { sleep } from 'utils/common';

export class BluetoothManager {
  serverMap: Map<string, BluetoothServerWrapper> = new Map();

  async connect(options: RequestDeviceOptions): Promise<string | undefined> {
    const device = await navigator.bluetooth.requestDevice(options);
    device.addEventListener('gattserverdisconnected', async () => {
      for (let retryCount = 3; retryCount > 0; retryCount--) {
        Notify.create({
          type: 'warning',
          message: `Bluetooth device disconnected, reconnecting... (${
            4 - retryCount
          }/3)`,
          caption: 'Device ID: ' + device.id,
        });
        if (await this.connectGattServer(device)) {
          return;
        }
        await sleep(3000);
      }
      this.serverMap.delete(device.id);
    });
    await this.connectGattServer(device);
    return device.id;
  }

  private async connectGattServer(device: BluetoothDevice): Promise<boolean> {
    if (!device?.gatt) {
      console.warn('GATT is null');
      return false;
    }
    const server = await device.gatt.connect();
    if (!server) {
      console.warn('server is null');
      return false;
    }
    this.serverMap.set(device.id, new BluetoothServerWrapper(server));
    return true;
  }
}
