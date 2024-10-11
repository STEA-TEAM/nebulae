export default {
  components: {
    BluetoothDevices: {
      labels: {
        deviceFinder: 'Device Finder',
        editFilters: 'Edit Filters',
        search: 'Search Devices',
      },
    },
    BluetoothDeviceComponents:{
      DeviceFilters: {
        hints: {
          dataFilter: 'Filter by raw advertising data',
          nameFilter: 'Filter by name or MAC',
          namePrefixFilter: 'Filter by name prefix',
        },
        labels: {
          addFilter: 'Add Filter',
          deviceFilters: 'Device Filters',
          editManufacturers: 'Edit manufacturer filters',
          editServices: 'Edit service filters',
        },
      },
      FilterLabelSection: {
        labels: {
          manufacturers: 'Manufacturers: ',
          noFilter: 'No filter',
          services: 'Services: ',
        },
      },
      ManufacturerFilterDialog: {
        labels: {
          addFilter: 'Add Manufacturer Filter',
          cancel: 'Cancel',
          confirm: 'Confirm',
          id: 'Manufacturer ID (UUID)',
          mask: 'Manufacturer Data Mask',
          noId: 'Enter Manufacturer ID',
          prefix: 'Manufacturer Data Prefix',
          title: 'Edit Manufacturer Filters',
        },
      },
      OptionalServices: {
        labels: {
          addService: 'Add Service',
          saveAndLoad: 'Save & Load',
          serviceId: 'Service ID (name or UUID)',
          title: 'Optional Services',
        },
      },
      RecognizedDevices: {
        labels: {
          deviceId: 'Device ID: ',
          deviceName: 'Device Name: ',
          noName: 'No Name',
          recognizedDevices: 'Recognized Devices',
        },
      },
      ServiceFilterDialog: {
        labels: {
          addFilter: 'Add Service Filter',
          cancel: 'Cancel',
          confirm: 'Confirm',
          id: 'Service ID (name or UUID)',
          mask: 'Service Data Mask',
          noId: 'Enter Service ID',
          prefix: 'Service Data Prefix',
          title: 'Edit Service Filters',
        },
      },
    },
    BluetoothSelectors: {
      labels: {
        characteristic: 'Characteristic: ',
        device: 'Device: ',
        service: 'Service: ',
        noCharacteristic: 'No Characteristic',
        noDevice: 'No Device',
        noService: 'No Service',
        targetCharacteristic: 'Target Characteristic',
        targetDevice: 'Target Device',
        targetService: 'Target Service',
      },
    },
    DarkModeButton: {
      labels: {
        toggleDarkMode: 'Toggle dark mode',
      },
    },
  },
  layouts: {
    drawers: {
      LeftMainDrawer: {
        labels: {},
        navigations: {
          dashboard: 'Dashboard',
          serial: 'Serial',
          usb: 'USB',
          hid: 'HID',
          bluetooth: 'Bluetooth',
        },
      },
      RightMainDrawer: {
        labels: {
          dashboard: 'Dashboard',
          serial: 'Serial',
          usb: 'USB',
          hid: 'HID',
          bluetooth: 'Bluetooth',
        },
        tabs: {
          devices: 'Devices',
          messages: 'Messages',
        },
      },
    },
    footers: {
      BluetoothFooter: {
        labels: {
          hex: 'Hex',
          payload: 'Payload',
        },
      },
    },
    headers: {
      MainHeader: {
        labels: {
          title: 'NebulaE',
        },
      },
    },
  },
  pages: {
    BluetoothPage: {
      labels: {
        characteristicId: 'Characteristic ID: {characteristicId}',
        devices: 'Devices',
        noDevice: 'Add New Device In Right Drawer',
        serviceId: 'Service ID: {serviceId}',
      },
    },
    DashboardPage: {
      labels: {
        title: 'NebulaE',
        intro: 'A Hardware Debugging Tool Powered by Quasar',
      },
    },
  },
  types: {
    BluetoothManager: {
      labels: {
        deviceId: 'Device ID: {deviceId}',
      },
      notifications: {
        canceled: 'Device search canceled',
        connecting: 'Connecting to device...',
        reconnecting: 'Bluetooth device disconnected, reconnecting...',
      },
    },
    BluetoothDeviceWrapper: {
      labels: {
        deviceId: 'Device ID: {deviceId}',
        serviceId: 'Service ID: {serviceId}',
      },
      notifications: {
        connectFailed: 'Failed to connect to device',
        connectSuccess: 'Connected to device',
        disconnected: 'Bluetooth device disconnected',
        invalidCharacteristicId:
          'Invalid characteristic ID: {characteristicId}',
        invalidServiceId: 'Invalid service ID: {serviceId}',
        noValidGattServer: 'No valid GATT server',
        sendFailed: 'Failed to send data. Reason: {message}',
      },
    },
    SerialManager: {
      labels: {},
      notifications: {
        canceled: 'Serial port connection canceled',
      },
    },
    SerialPortWrapper: {
      labels: {},
      notifications: {
        connectCanceled: 'Serial port connection canceled',
        readDone: 'Done reading serial data',
        readError: 'Error reading serial data',
      },
    },
  },
};
