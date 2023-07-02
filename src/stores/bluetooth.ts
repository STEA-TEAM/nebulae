import { defineStore } from 'pinia';
import { reactive, Ref, ref } from 'vue';
import { bluetoothManager } from 'boot/managers';

export const useBluetoothStore = defineStore('bluetooth', () => {
  const recognizedDevices: Record<string, string | null> = reactive({});
  const currentOptionalServices: Ref<string[]> = ref(['']);
  const currentFilters: Ref<BluetoothLEScanFilter[]> = ref([]);

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
      recognizedDevices[device.id] = device.name ?? null;
      console.log(device.id, device.name);
    }
  };

  return {
    recognizedDevices,
    currentOptionalServices,
    currentFilters,
    removeRecognizedDevice,
    addOptionalService,
    removeOptionalService,
    addFilter,
    removeFilter,
    connect,
  };
});
