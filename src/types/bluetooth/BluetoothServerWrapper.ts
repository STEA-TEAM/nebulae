export class BluetoothServerWrapper {
  private server: BluetoothRemoteGATTServer;

  constructor(server: BluetoothRemoteGATTServer) {
    this.server = server;
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
}
