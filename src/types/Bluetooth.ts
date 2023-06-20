export class Bluetooth {
  device: BluetoothDevice | null = null;
  server: BluetoothRemoteGATTServer | null = null;

  async connect(optionalServices: string[]): Promise<boolean> {
    this.device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: optionalServices,
    });
    if (!this.device?.gatt) {
      console.warn('GATT is null');
      return false;
    }
    this.server = await this.device.gatt.connect();
    if (!this.server) {
      console.warn('server is null');
      return false;
    }
    return true;
  }

  async addListener(
    serviceUuid: string,
    characteristicUuid: string,
    callback: (event: Event) => void
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
