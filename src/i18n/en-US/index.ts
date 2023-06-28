export default {
  components: {
    BluetoothDevices: {
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
      FilterLabelSection:{
        labels: {
          noFilter: 'No filter',
        },
      }
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
