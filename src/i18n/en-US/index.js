// This is just an example,
// so you can safely delete all default props below

export default {
  components: {
    controlPanel: {
      notifications: {
        clearData: 'Successfully cleared data packs',
        invalidHistory: 'Invalid history report: No matching report ID',
        validHistory: 'Successfully copied history',
        saveSuccess: 'Successfully saved report',
        loadFailed: 'Invalid report save: No matching report ID',
        loadSuccess: 'Successfully loaded save',
        deleteSuccess: 'Successfully deleted save',
      }
    },
    devicePanel: {
      tooltips: {
        deviceInfo: 'Show device info',
      }
    },
    hexView: {
      tooltips: {
        autoScroll: 'Scroll table automatically',
        clearData: 'Clear all data',
        copyHistory: 'Click to copy report as input'
      }
    },
    hidDeviceTree: {}
  },
  layouts: {
    drawers: {
      main: {
        menuLabels: {
          dashboard: 'Dashboard',
          serial: 'Serial Monitor',
          usb: 'USB Monitor',
          hid: 'HID Monitor',
        }
      }
    },
    headers: {
      main: {}
    },
    footers: {
      main: {}
    }
  },
}
