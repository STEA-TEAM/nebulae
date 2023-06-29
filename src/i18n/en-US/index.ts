export default {
  components: {
    BluetoothDevices: {
      labels: {
        addFilter: 'Add Filter',
        editFilters: 'Edit Filters',
        search: 'Search Devices',
      },
      DeviceFilter: {
        hints: {
          dataFilter: 'Filter by raw advertising data',
          nameFilter: 'Filter by name or MAC',
          namePrefixFilter: 'Filter by name prefix',
        },
        labels: {
          editManufacturers: 'Edit manufacturers',
          editServices: 'Edit services',
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
