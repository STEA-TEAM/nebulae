import { Notify } from 'quasar';
import { reactive } from 'vue';

import { i18nInstance } from 'boot/i18n';
import { createI18n, sleep } from 'utils/common';

const i18n = createI18n(i18nInstance.global, 'types.BluetoothDeviceWrapper.');

export interface BluetoothMessage {
  type: 'send' | 'receive';
  serviceId: string;
  characteristicId: string;
  payload: string;
}

export class BluetoothDeviceWrapper {
  private isTerminated = false;
  device: BluetoothDevice;
  messages = reactive<BluetoothMessage[]>([]);

  constructor(device: BluetoothDevice) {
    this.device = device;
  }

  async connectGattServer(): Promise<boolean> {
    if (this.device.gatt?.connected) {
      return true;
    }
    if ((await this.device.gatt?.connect()) !== undefined) {
      this.addDisconnectHandler();
      for (const service of await this.listPrimaryServices()) {
        for (const characteristic of await this.listCharacteristics(
          service.uuid,
        )) {
          if (characteristic.properties.notify) {
            await this.receiveNotification(service.uuid, characteristic.uuid);
          }
        }
      }
      Notify.create({
        type: 'positive',
        message: i18n('notifications.connectSuccess'),
        caption: i18n('labels.deviceId', { deviceId: this.device.id }),
      });
      return true;
    }
    Notify.create({
      type: 'warning',
      message: i18n('notifications.connectFailed'),
      caption: i18n('labels.deviceId', { deviceId: this.device.id }),
    });
    return false;
  }

  async disconnectGattServer(): Promise<void> {
    this.isTerminated = true;
    if (this.device.gatt?.connected) {
      this.device.gatt?.disconnect();
      Notify.create({
        type: 'info',
        message: i18n('notifications.disconnected'),
        caption: i18n('labels.deviceId', { deviceId: this.device.id }),
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
        message: i18n('notifications.invalidServiceId', { serviceId }),
        caption: i18n('labels.deviceId', { deviceId: this.device.id }),
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
        message: i18n('notifications.invalidCharacteristicId', {
          characteristicId,
        }),
        caption:
          i18n('labels.deviceId', { deviceId: this.device.id }) +
          '\n' +
          i18n('labels.serviceId', { serviceId }),
      });
    }
  }

  async receiveNotification(
    serviceId: string,
    characteristicId: string,
  ): Promise<boolean> {
    const characteristic = await this.getCharacteristic(
      serviceId,
      characteristicId,
    );
    if (!characteristic) {
      return false;
    }

    let isRegistered = false;
    while (!isRegistered) {
      try {
        (await characteristic.startNotifications()).addEventListener(
          'characteristicvaluechanged',
          (event: Event) => {
            const value = (<BluetoothRemoteGATTCharacteristic>event.target)
              .value;
            if (value) {
              const payload = new TextDecoder().decode(value);
              console.log(payload);
              this.messages.push({
                type: 'receive',
                serviceId: serviceId,
                characteristicId: characteristicId,
                payload: payload,
              });
            }
          },
        );
        isRegistered = true;
      } catch (e) {
        console.log(e);
      }
      await sleep(10);
    }
    return true;
  }

  async write(
    serviceId: string,
    characteristicId: string,
    payload: string,
  ): Promise<boolean> {
    const characteristic = await this.getCharacteristic(
      serviceId,
      characteristicId,
    );
    if (!characteristic) {
      return false;
    }
    try {
      characteristic.writeValue(new TextEncoder().encode(payload));
      this.messages.push({
        type: 'send',
        serviceId: serviceId,
        characteristicId: characteristicId,
        payload: payload,
      });
    } catch (e) {
      console.warn(e);
      Notify.create({
        type: 'warning',
        message: i18n('notifications.sendFailed', {
          message: (<Error>e).message,
        }),
        caption: i18n('labels.deviceId', { deviceId: this.device.id }),
      });
      return false;
    }
    return true;
  }

  private addDisconnectHandler() {
    this.device.addEventListener('gattserverdisconnected', async () => {
      while (!this.isTerminated) {
        Notify.create({
          type: 'warning',
          message: i18n('notifications.reconnecting'),
          caption: i18n('labels.deviceId', { deviceId: this.device.id }),
        });
        if (await this.connectGattServer()) {
          return;
        }
        await sleep(3000);
      }
    });
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
        caption: i18n('labels.deviceId', { deviceId: this.device.id }),
      });
    }
  }
}
