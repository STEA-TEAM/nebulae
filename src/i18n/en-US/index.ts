export default {
  components: {
    BluetoothDevices: {
      labels: {
        addFilter: 'Add Filter',
        deviceId: 'Device ID: ',
        deviceName: 'Device Name: ',
        editFilters: 'Edit Filters',
        noName: 'No Name',
        search: 'Search Devices',
      },
      notifications: {
        connectSuccess: 'Connected to {name}',
        connectCancel: 'Failed to connect to {name}',
      },
      DeviceFilter: {
        hints: {
          dataFilter: 'Filter by raw advertising data',
          nameFilter: 'Filter by name or MAC',
          namePrefixFilter: 'Filter by name prefix',
        },
        labels: {
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
    DarkModeButton: {
      labels: {
        toggleDarkMode: 'Toggle dark mode',
      },
    },
  },
  global: {
    BluetoothManager: {
      labels: {
        canceled: 'Device search canceled',
        deviceId: 'Device ID: ',
        reconnecting: 'Bluetooth device disconnected, reconnecting...',
        reconnectFailed: 'Bluetooth device reconnect failed, please reconnect manually.',
      }
    },
    SerialManager: {
      labels: {
        canceled: 'Serial port search canceled',
        reconnecting: 'Serial port disconnected, reconnecting...',
        reconnectFailed: 'Serial port reconnect failed, please reconnect manually.',
      }
    }
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
          device: 'Device: ',
          hex: 'Hex',
          noDevice: 'No Device',
          noService: 'No Service',
          payload: 'Payload',
          service: 'Service: ',
          targetDevice: 'Target Device',
          targetService: 'Target Service',
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
    DashboardPage: {
      labels: {
        title: 'NebulaE',
        intro: 'A Hardware Debugging Tool Powered by Quasar',
      },
    },
  },
};
