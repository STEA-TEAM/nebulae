export default {
  components: {
    DarkModeButton: {
      labels: {
        toggleDarkMode: 'Toggle dark mode',
      },
    },
  },
  layouts: {
    drawers: {
      LeftMainDrawer: {
        labels: {
          dashboard: 'Dashboard',
          serial: 'Serial',
          usb: 'USB',
          hid: 'HID',
          bluetooth: 'Bluetooth',
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
