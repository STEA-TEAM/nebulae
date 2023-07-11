import { Notify } from 'quasar';

import { i18nInstance } from 'boot/i18n';

const i18n = (relativePath: string, params: string[] = []) => {
  return i18nInstance.global.t(
    'types.BluetoothDeviceWrapper.' + relativePath,
    params,
  );
};

export class BluetoothDeviceWrapper {
  device: BluetoothDevice;

  constructor(device: BluetoothDevice) {
    this.device = device;
  }

  async connectGattServer(): Promise<boolean> {
    if (this.device.gatt?.connected || (await this.device.gatt?.connect()) !== undefined) {
      Notify.create({
        type: 'positive',
        message: i18n('notifications.connectSuccess'),
        caption: i18n('labels.deviceId', [this.device.id]),
      });
      return true;
    }
    Notify.create({
      type: 'warning',
      message: i18n('notifications.connectFailed'),
      caption: i18n('labels.deviceId', [this.device.id]),
    });
    return false;
  }

  async disconnectGattServer(): Promise<void> {
    if (this.device.gatt?.connected) {
      await this.device.gatt?.disconnect();
      Notify.create({
        type: 'secondary',
        message: i18n('notifications.disconnected'),
        caption: i18n('labels.deviceId', [this.device.id]),
      });
    }
  }

  async listPrimaryServices(): Promise<BluetoothRemoteGATTService[]> {
    return (await this.getGattServer())?.getPrimaryServices() ?? [];
  }

  async getPrimaryService(
    serviceId: string,
  ): Promise<BluetoothRemoteGATTService | undefined> {
    try {
      return await (await this.getGattServer())?.getPrimaryService(serviceId);
    } catch (_) {
      Notify.create({
        type: 'warning',
        message: i18n('notifications.invalidServiceId', [serviceId]),
        caption: i18n('labels.deviceId', [this.device.id]),
      });
    }
  }

  async listCharacteristics(
    serviceId: string,
  ): Promise<BluetoothRemoteGATTCharacteristic[]> {
    return (
      (await this.getPrimaryService(serviceId))?.getCharacteristics() ?? []
    );
  }

  async getCharacteristic(
    serviceId: string,
    characteristicId: string,
  ): Promise<BluetoothRemoteGATTCharacteristic | undefined> {
    try {
      const service = await this.getPrimaryService(serviceId);
      return await service?.getCharacteristic(characteristicId);
    } catch (_) {
      Notify.create({
        type: 'warning',
        message: i18n('notifications.invalidCharacteristicId', [
          characteristicId,
        ]),
        caption:
          i18n('labels.deviceId', [this.device.id]) +
          '\n' +
          i18n('labels.serviceId', [serviceId]),
      });
    }
  }

  async addNotificationListener(
    serviceId: string,
    characteristicId: string,
    callback: (event: Event) => void,
  ): Promise<boolean> {
    const characteristic = await this.getCharacteristic(
      serviceId,
      characteristicId,
    );
    if (!characteristic) {
      return false;
    }
    (await characteristic.startNotifications()).addEventListener(
      'characteristicvaluechanged',
      callback,
    );
    return true;
  }

  async write(
    serviceUuid: string,
    characteristicUuid: string,
    value: string,
  ): Promise<boolean> {
    const characteristic = await this.getCharacteristic(
      serviceUuid,
      characteristicUuid,
    );
    if (!characteristic) {
      return false;
    }
    try {
      await characteristic.writeValue(new TextEncoder().encode(value));
    } catch (e) {
      console.warn(e);
      Notify.create({
        type: 'warning',
        message: i18n('notifications.sendFailed', [(<Error>e).message]),
        caption: i18n('labels.deviceId', [this.device.id]),
      });
      return false;
    }
    return true;
  }

  private async getGattServer(): Promise<
    BluetoothRemoteGATTServer | undefined
  > {
    if (await this.connectGattServer()) {
      return this.device.gatt;
    } else {
      Notify.create({
        type: 'warning',
        message: i18n('notifications.noValidGattServer'),
        caption: i18n('labels.deviceId', [this.device.id]),
      });
    }
  }
}
