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

export const useBluetoothStore = defineStore(
  'bluetooth',
  () => {
    const currentFilters = ref<BluetoothLEScanFilter[]>([]);
    const currentOptionalServices = ref(['']);
    const messages = reactive<Record<string, Message[]>>({});
    const recognizedDevices = reactive<Record<string, RecognizedDevice>>({});

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

    const connect = async (recognizedDeviceId?: string) => {
      let options: RequestDeviceOptions;
      if (recognizedDeviceId) {
        options = recognizedDevices[recognizedDeviceId]?.options;
      } else if (currentFilters.value.length === 0) {
        options = {
          acceptAllDevices: true,
          optionalServices: currentOptionalServices.value,
        };
      } else {
        options = {
          filters: currentFilters.value,
          optionalServices: currentOptionalServices.value,
        };
      }
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
      if (await device.write(serviceId, characteristicId, payload)) {
        messages[deviceId] ??= [];
        messages[deviceId].push({
          type: 'send',
          data: payload,
        });
        return true;
      }
      return false;
    };

    return {
      currentFilters,
      currentOptionalServices,
      messages,
      recognizedDevices,
      removeRecognizedDevice,
      addOptionalService,
      removeOptionalService,
      addFilter,
      removeFilter,
      connect,
      sendMessage,
    };
  },
  {
    persist: {
      pick: ['currentFilters', 'currentOptionalServices', 'recognizedDevices'],
    },
  },
);
