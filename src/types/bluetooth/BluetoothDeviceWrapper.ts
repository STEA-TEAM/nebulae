import { Notify } from 'quasar';

import { i18nInstance } from 'boot/i18n';
import { sleep } from 'utils/common';

const i18n = (relativePath: string) => {
  return i18nInstance.global.t('global.BluetoothDeviceWrapper.' + relativePath);
};

export class BluetoothDeviceWrapper {
  private device: BluetoothDevice;
  private server: BluetoothRemoteGATTServer;
  private services?: BluetoothServiceUUID[];

  constructor(device: BluetoothDevice, services?: BluetoothServiceUUID[]) {
    this.device = device;
    this.server = await this.connectGattServer(device);
    this.services = services;
  }

  async listServices(): Promise<BluetoothRemoteGATTService[]> {
    return await this.server.getPrimaryServices();
  }

  async listCharacteristics(
    serviceId: string
  ): Promise<BluetoothRemoteGATTCharacteristic[]> {
    const service = await this.server.getPrimaryService(serviceId);
    if (!service) {
      console.warn('Invalid service id');
      return [];
    }
    return await service.getCharacteristics();
  }

  async addNotificationListener(
    serviceId: string,
    characteristicId: string,
    callback: (event: Event) => void
  ): Promise<boolean> {
    const service = await this.server.getPrimaryService(serviceId);
    if (!service) {
      console.warn('Invalid service id');
      return false;
    }
    const characteristic = await service.getCharacteristic(characteristicId);
    if (!characteristic) {
      console.warn('Invalid characteristic id');
      return false;
    }
    (await characteristic.startNotifications()).addEventListener(
      'characteristicvaluechanged',
      callback
    );
    return true;
  }

  async write(
    serviceUuid: string,
    characteristicUuid: string,
    value: string
  ): Promise<boolean> {
    const service = await this.server?.getPrimaryService(serviceUuid);
    if (!service) {
      console.warn('service is null');
      return false;
    }
    const characteristic = await service.getCharacteristic(characteristicUuid);
    if (!characteristic) {
      console.warn('characteristic is null');
      return false;
    }
    await characteristic.writeValue(new TextEncoder().encode(value));
    return true;
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
