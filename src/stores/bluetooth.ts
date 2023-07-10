import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { bluetoothManager } from 'boot/managers';

interface RecognizedDevice {
  id: string;
  name?: string;
  options: RequestDeviceOptions;
}

interface Message {
  type: 'send' | 'receive';
  data: string;
}

export const useBluetoothStore = defineStore('bluetooth', () => {
  const recognizedDevices = reactive<Record<string, RecognizedDevice>>({});
  const currentOptionalServices = ref(['']);
  const currentFilters = ref<BluetoothLEScanFilter[]>([]);
  const messages = reactive<Record<string, Message[]>>({});

  const removeRecognizedDevice = (id: string) => {
    delete recognizedDevices[id];
  };

  const addOptionalService = () => {
    currentOptionalServices.value.push('');
  };

  const removeOptionalService = (index: number) => {
    currentOptionalServices.value.splice(index, 1);
  };

  const addFilter = () => {
    currentFilters.value.push({});
  };

  const removeFilter = (index: number) => {
    currentFilters.value.splice(index, 1);
  };

  const connect = async () => {
    const options: RequestDeviceOptions =
      currentFilters.value.length === 0
        ? {
            acceptAllDevices: true,
            optionalServices: currentOptionalServices.value,
          }
        : {
            filters: currentFilters.value,
            optionalServices: currentOptionalServices.value,
          };
    const device = await bluetoothManager.connect(options);
    if (device) {
      recognizedDevices[device.id] = {
        id: device.id,
        name: device.name,
        options: options,
      };
      return true;
    }
    return false;
  };

  const sendMessage = async (
    deviceId: string,
    serviceId: string,
    characteristicId: string,
    payload: string,
  ) => {
    const device = bluetoothManager.deviceMap.get(deviceId);
    if (!device) {
      return false;
    }
    await device.write(serviceId, characteristicId, payload);
    messages[deviceId] ??= [];
    messages[deviceId].push({
      type: 'send',
      data: payload,
    });
  };

  return {
    recognizedDevices,
    currentOptionalServices,
    currentFilters,
    messages,
    removeRecognizedDevice,
    addOptionalService,
    removeOptionalService,
    addFilter,
    removeFilter,
    connect,
    sendMessage,
  };
});
