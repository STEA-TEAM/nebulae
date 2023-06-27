import { defineStore } from 'pinia';
import { reactive, Ref, ref } from 'vue';
import { bluetoothManager } from 'boot/managers';

export const useBluetoothStore = defineStore('bluetooth', () => {
  const recognizedDevices: Record<string, string[]> = reactive({});
  const currentOptionalServices: Ref<string[]> = ref([]);
  const currentFilters: Ref<BluetoothLEScanFilter[]> = ref([]);

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
    const deviceId = await bluetoothManager.connect(options);
    if (deviceId) {
      recognizedDevices[deviceId] = currentOptionalServices.value;
    }
  };

  return {
    recognizedDevices,
    currentOptionalServices,
    currentFilters,
    addFilter,
    removeFilter,
    connect,
  };
});
